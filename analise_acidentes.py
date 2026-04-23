from pathlib import Path
import pandas as pd
import numpy as np
import unicodedata
import re
import warnings

warnings.filterwarnings("ignore")

# =========================================================
# CONFIG
# =========================================================
PASTA_BASE = Path(r"C:\Users\Matheus Mendes\estudo-acidente")
PADRAO_ARQUIVOS = "acidentes20*_todas_causas_tipos*.csv"

TOP_N = 10
MIN_ACIDENTES_TAXA = 300
MIN_ACIDENTES_TAXA_BR = 200

# =========================================================
# FUNÇÕES AUXILIARES
# =========================================================
def detectar_separador(path: Path) -> str:
    with open(path, "r", encoding="latin1", errors="ignore") as f:
        header = f.readline()
    return ";" if header.count(";") >= header.count(",") else ","


def extrair_ano_arquivo(nome_arquivo: str) -> int:
    m = re.search(r"(20\d{2})", nome_arquivo)
    if not m:
        raise ValueError(f"Não consegui extrair o ano do arquivo: {nome_arquivo}")
    return int(m.group(1))


def ler_csv_prf(caminho: Path) -> pd.DataFrame:
    print(f"Lendo: {caminho.name}")
    sep = detectar_separador(caminho)

    ultimo_erro = None
    for enc in ["utf-8-sig", "latin1", "cp1252"]:
        try:
            df = pd.read_csv(
                caminho,
                sep=sep,
                encoding=enc,
                low_memory=False
            )
            df["arquivo_origem"] = caminho.name
            df["ano_arquivo"] = extrair_ano_arquivo(caminho.name)
            return df
        except Exception as e:
            ultimo_erro = e

    raise ultimo_erro


def normalizar_texto_rapido(series: pd.Series) -> pd.Series:
    s = series.astype("string").str.strip()
    s = s.replace({
        "NA": pd.NA,
        "NAN": pd.NA,
        "nan": pd.NA,
        "None": pd.NA,
        "": pd.NA,
        "<NA>": pd.NA,
        "Não Informado": pd.NA,
        "Nao Informado": pd.NA,
        "Ignorado": pd.NA
    })
    return s


def to_num(series: pd.Series) -> pd.Series:
    s = series.astype("string").str.strip()
    s = s.replace({
        "NA": pd.NA,
        "NAN": pd.NA,
        "nan": pd.NA,
        "None": pd.NA,
        "": pd.NA,
        "<NA>": pd.NA
    })
    s = s.str.replace(",", ".", regex=False)
    return pd.to_numeric(s, errors="coerce")


def sem_acento(valor) -> str:
    if pd.isna(valor):
        return ""
    valor = str(valor).strip().lower()
    valor = unicodedata.normalize("NFKD", valor)
    valor = "".join(c for c in valor if not unicodedata.combining(c))
    valor = re.sub(r"\s+", " ", valor)
    return valor


def print_titulo(txt: str):
    print("\n" + "=" * 90)
    print(txt)
    print("=" * 90)


def print_df(df: pd.DataFrame, n: int = 10):
    if df is None or df.empty:
        print("Sem dados.")
    else:
        print(df.head(n).to_string(index=False))


def pct(parte, total):
    if total == 0 or pd.isna(total):
        return 0.0
    return round((parte / total) * 100, 2)


# =========================================================
# 1) LEITURA
# =========================================================
arquivos = sorted(PASTA_BASE.glob(PADRAO_ARQUIVOS))
if not arquivos:
    raise FileNotFoundError(f"Nenhum arquivo encontrado em {PASTA_BASE} com padrão {PADRAO_ARQUIVOS}")

print_titulo("[1/6] LENDO ARQUIVOS")
for arq in arquivos:
    print(f" - {arq.name}")

lista_dfs = [ler_csv_prf(arq) for arq in arquivos]
df = pd.concat(lista_dfs, ignore_index=True)

print(f"\nLinhas lidas: {len(df):,}".replace(",", "."))

# =========================================================
# 2) LIMPEZA
# =========================================================
print_titulo("[2/6] LIMPANDO E PADRONIZANDO")

df.columns = [c.strip().lower() for c in df.columns]

if "condicao_metereologica" in df.columns:
    df = df.rename(columns={"condicao_metereologica": "condicao_meteorologica"})

colunas_texto = [
    "data_inversa", "dia_semana", "horario", "uf", "municipio",
    "causa_principal", "causa_acidente", "tipo_acidente",
    "classificacao_acidente", "fase_dia", "sentido_via",
    "condicao_meteorologica", "tipo_pista", "tracado_via", "uso_solo",
    "tipo_veiculo", "marca", "tipo_envolvido", "estado_fisico",
    "sexo", "regional", "delegacia", "uop", "arquivo_origem"
]
colunas_texto = [c for c in colunas_texto if c in df.columns]

for col in colunas_texto:
    df[col] = normalizar_texto_rapido(df[col])

colunas_numericas = [
    "id", "pesid", "br", "km", "id_veiculo", "ano_fabricacao_veiculo",
    "idade", "ilesos", "feridos_leves", "feridos_graves", "mortos",
    "latitude", "longitude", "ordem_tipo_acidente"
]
colunas_numericas = [c for c in colunas_numericas if c in df.columns]

for col in colunas_numericas:
    df[col] = to_num(df[col])

df["ano_arquivo"] = df["ano_arquivo"].astype("Int64")

df["data_inversa"] = pd.to_datetime(df["data_inversa"], dayfirst=True, errors="coerce")
df["ano"] = df["ano_arquivo"]
df["mes"] = df["data_inversa"].dt.month.astype("Int64")
df["dia"] = df["data_inversa"].dt.day.astype("Int64")

df["ano_mes"] = np.where(
    df["mes"].notna(),
    df["ano"].astype(str) + "-" + df["mes"].astype(str).str.zfill(2),
    df["ano"].astype(str) + "-00"
)

df["hora"] = pd.to_datetime(df["horario"], format="%H:%M:%S", errors="coerce").dt.hour

df["estado_fisico_norm"] = df["estado_fisico"].apply(sem_acento) if "estado_fisico" in df.columns else ""
df["causa_principal_norm"] = df["causa_principal"].apply(sem_acento) if "causa_principal" in df.columns else ""

# faixa horária
df["faixa_horaria"] = pd.cut(
    df["hora"],
    bins=[-1, 5, 11, 17, 23],
    labels=["Madrugada", "Manhã", "Tarde", "Noite"]
)

# =========================================================
# 3) BASE PESSOA
# =========================================================
print_titulo("[3/6] MONTANDO BASE DE PESSOA DEDUPLICADA")

chaves_pessoa = ["ano", "id", "pesid"]
for c in chaves_pessoa:
    if c not in df.columns:
        raise ValueError(f"Coluna obrigatória ausente: {c}")

base_pessoa = (
    df.sort_values(chaves_pessoa)
      .drop_duplicates(subset=chaves_pessoa, keep="first")
      .copy()
)

base_pessoa["flag_morto"] = (
    (base_pessoa["estado_fisico_norm"] == "obito") |
    (base_pessoa["mortos"].fillna(0) > 0)
).astype(int)

base_pessoa["flag_ferido_leve"] = (
    (base_pessoa["estado_fisico_norm"] == "lesoes leves") |
    (base_pessoa["feridos_leves"].fillna(0) > 0)
).astype(int)

base_pessoa["flag_ferido_grave"] = (
    (base_pessoa["estado_fisico_norm"] == "lesoes graves") |
    (base_pessoa["feridos_graves"].fillna(0) > 0)
).astype(int)

base_pessoa["flag_ileso"] = (
    (base_pessoa["estado_fisico_norm"] == "ileso") |
    (base_pessoa["ilesos"].fillna(0) > 0)
).astype(int)

base_pessoa["faixa_idade"] = pd.cut(
    base_pessoa["idade"],
    bins=[0, 17, 24, 34, 44, 59, 200],
    labels=["0-17", "18-24", "25-34", "35-44", "45-59", "60+"],
    include_lowest=True
)

print(f"Pessoas distintas: {len(base_pessoa):,}".replace(",", "."))

# =========================================================
# 4) BASE ACIDENTE
# =========================================================
print_titulo("[4/6] MONTANDO BASE DE ACIDENTE")

chaves_acidente = ["ano", "id"]

colunas_info_acidente = [
    "ano", "id", "data_inversa", "dia_semana", "horario", "hora", "mes", "dia",
    "ano_mes", "faixa_horaria", "uf", "br", "km", "municipio",
    "classificacao_acidente", "fase_dia", "sentido_via", "condicao_meteorologica",
    "tipo_pista", "tracado_via", "uso_solo", "latitude", "longitude",
    "regional", "delegacia", "uop"
]
colunas_info_acidente = [c for c in colunas_info_acidente if c in df.columns]

base_meta = (
    df.sort_values(chaves_acidente)
      .drop_duplicates(subset=chaves_acidente, keep="first")[colunas_info_acidente]
      .copy()
)

base_causa = (
    df[df["causa_principal_norm"] == "sim"]
    .sort_values(chaves_acidente)
    .drop_duplicates(subset=chaves_acidente, keep="first")[chaves_acidente + ["causa_acidente"]]
    .copy()
    if "causa_acidente" in df.columns else
    pd.DataFrame(columns=chaves_acidente + ["causa_acidente"])
)

base_tipo = (
    df.sort_values(chaves_acidente + ["ordem_tipo_acidente"], na_position="last")
      .drop_duplicates(subset=chaves_acidente, keep="first")[chaves_acidente + ["tipo_acidente"]]
      .rename(columns={"tipo_acidente": "tipo_acidente_principal"})
      .copy()
    if "tipo_acidente" in df.columns and "ordem_tipo_acidente" in df.columns else
    pd.DataFrame(columns=chaves_acidente + ["tipo_acidente_principal"])
)

base_acidente = (
    base_meta
    .merge(base_causa, on=chaves_acidente, how="left")
    .merge(base_tipo, on=chaves_acidente, how="left")
)

agg_pessoas = (
    base_pessoa.groupby(chaves_acidente, dropna=False)
    .agg(
        pessoas_envolvidas=("pesid", "nunique"),
        vitimas_fatais=("flag_morto", "sum"),
        vitimas_feridas_leves=("flag_ferido_leve", "sum"),
        vitimas_feridas_graves=("flag_ferido_grave", "sum"),
        pessoas_ilesas=("flag_ileso", "sum")
    )
    .reset_index()
)

base_acidente = base_acidente.merge(agg_pessoas, on=chaves_acidente, how="left")

for col in ["pessoas_envolvidas", "vitimas_fatais", "vitimas_feridas_leves", "vitimas_feridas_graves", "pessoas_ilesas"]:
    base_acidente[col] = base_acidente[col].fillna(0).astype("int64")

base_acidente["flag_acidente_fatal"] = np.where(
    (base_acidente["classificacao_acidente"].fillna("") == "Com Vítimas Fatais") |
    (base_acidente["vitimas_fatais"].fillna(0) > 0),
    1,
    0
)
print(f"Acidentes distintos: {base_acidente['id'].nunique():,}".replace(",", "."))

# =========================================================
# 5) ANÁLISES
# =========================================================
print_titulo("[5/6] ANÁLISES PARA DASHBOARD")

# ---------------------------------------------------------
# KPI GERAL
# ---------------------------------------------------------
acidentes_totais = int(base_acidente["id"].nunique())
acidentes_fatais = int(base_acidente["flag_acidente_fatal"].sum())
vitimas_fatais = int(base_pessoa["flag_morto"].sum())
feridos_leves = int(base_pessoa["flag_ferido_leve"].sum())
feridos_graves = int(base_pessoa["flag_ferido_grave"].sum())
pessoas_env = int(len(base_pessoa))

print_titulo("KPI GERAL")
print(f"Acidentes totais: {acidentes_totais:,}".replace(",", "."))
print(f"Acidentes fatais: {acidentes_fatais:,}".replace(",", "."))
print(f"Vítimas fatais: {vitimas_fatais:,}".replace(",", "."))
print(f"Feridos leves: {feridos_leves:,}".replace(",", "."))
print(f"Feridos graves: {feridos_graves:,}".replace(",", "."))
print(f"Pessoas envolvidas: {pessoas_env:,}".replace(",", "."))
print(f"% de acidentes fatais: {pct(acidentes_fatais, acidentes_totais)}%")
print(f"Média de vítimas fatais por acidente fatal: {round(vitimas_fatais / acidentes_fatais, 2) if acidentes_fatais else 0}")

# ---------------------------------------------------------
# POR ANO
# ---------------------------------------------------------
acidentes_por_ano = (
    base_acidente.groupby("ano", dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum"),
        vitimas_feridas_leves=("vitimas_feridas_leves", "sum"),
        vitimas_feridas_graves=("vitimas_feridas_graves", "sum")
    )
    .reset_index()
    .sort_values("ano")
)

acidentes_por_ano["taxa_acidente_fatal_pct"] = (
    acidentes_por_ano["acidentes_fatais"] / acidentes_por_ano["acidentes"] * 100
).round(2)

acidentes_por_ano["var_acidentes_pct"] = acidentes_por_ano["acidentes"].pct_change().mul(100).round(2)
acidentes_por_ano["var_acidentes_fatais_pct"] = acidentes_por_ano["acidentes_fatais"].pct_change().mul(100).round(2)
acidentes_por_ano["var_vitimas_fatais_pct"] = acidentes_por_ano["vitimas_fatais"].pct_change().mul(100).round(2)

print_titulo("ACIDENTES POR ANO")
print(acidentes_por_ano.to_string(index=False))

# ---------------------------------------------------------
# CAUSAS
# ---------------------------------------------------------
causas_geral = (
    base_acidente["causa_acidente"]
    .fillna("Não Informado")
    .value_counts()
    .rename_axis("causa_acidente")
    .reset_index(name="acidentes")
)

causas_fatais = (
    base_acidente[base_acidente["flag_acidente_fatal"] == 1]["causa_acidente"]
    .fillna("Não Informado")
    .value_counts()
    .rename_axis("causa_acidente")
    .reset_index(name="acidentes_fatais")
)

causas_taxa = causas_geral.merge(causas_fatais, on="causa_acidente", how="left")
causas_taxa["acidentes_fatais"] = causas_taxa["acidentes_fatais"].fillna(0).astype(int)
causas_taxa["taxa_fatal_pct"] = (causas_taxa["acidentes_fatais"] / causas_taxa["acidentes"] * 100).round(2)

print_titulo("TOP CAUSAS GERAIS")
print_df(causas_taxa.sort_values("acidentes", ascending=False), TOP_N)

print_titulo("CAUSAS MAIS LETAIS (mínimo de 300 acidentes)")
print_df(
    causas_taxa[causas_taxa["acidentes"] >= MIN_ACIDENTES_TAXA]
    .sort_values(["taxa_fatal_pct", "acidentes_fatais"], ascending=False),
    TOP_N
)

# ---------------------------------------------------------
# TIPOS
# ---------------------------------------------------------
tipos_geral = (
    base_acidente["tipo_acidente_principal"]
    .fillna("Não Informado")
    .value_counts()
    .rename_axis("tipo_acidente")
    .reset_index(name="acidentes")
)

tipos_fatais = (
    base_acidente[base_acidente["flag_acidente_fatal"] == 1]["tipo_acidente_principal"]
    .fillna("Não Informado")
    .value_counts()
    .rename_axis("tipo_acidente")
    .reset_index(name="acidentes_fatais")
)

tipos_taxa = tipos_geral.merge(tipos_fatais, on="tipo_acidente", how="left")
tipos_taxa["acidentes_fatais"] = tipos_taxa["acidentes_fatais"].fillna(0).astype(int)
tipos_taxa["taxa_fatal_pct"] = (tipos_taxa["acidentes_fatais"] / tipos_taxa["acidentes"] * 100).round(2)

print_titulo("TOP TIPOS GERAIS")
print_df(tipos_taxa.sort_values("acidentes", ascending=False), TOP_N)

print_titulo("TIPOS MAIS LETAIS (mínimo de 300 acidentes)")
print_df(
    tipos_taxa[tipos_taxa["acidentes"] >= MIN_ACIDENTES_TAXA]
    .sort_values(["taxa_fatal_pct", "acidentes_fatais"], ascending=False),
    TOP_N
)

# ---------------------------------------------------------
# UFs
# ---------------------------------------------------------
uf_resumo = (
    base_acidente.groupby("uf", dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
)

uf_resumo["taxa_acidente_fatal_pct"] = (uf_resumo["acidentes_fatais"] / uf_resumo["acidentes"] * 100).round(2)
uf_resumo["vitimas_fatais_por_100_acidentes"] = (uf_resumo["vitimas_fatais"] / uf_resumo["acidentes"] * 100).round(2)

print_titulo("TOP UFs POR ACIDENTES")
print_df(uf_resumo.sort_values("acidentes", ascending=False), TOP_N)

print_titulo("TOP UFs POR VÍTIMAS FATAIS")
print_df(uf_resumo.sort_values("vitimas_fatais", ascending=False), TOP_N)

print_titulo("UFs MAIS LETAIS (mínimo de 1.000 acidentes)")
print_df(
    uf_resumo[uf_resumo["acidentes"] >= 1000]
    .sort_values(["taxa_acidente_fatal_pct", "vitimas_fatais"], ascending=False),
    TOP_N
)

# ---------------------------------------------------------
# BRs
# ---------------------------------------------------------
br_resumo = (
    base_acidente.groupby("br", dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
)

br_resumo["taxa_acidente_fatal_pct"] = (br_resumo["acidentes_fatais"] / br_resumo["acidentes"] * 100).round(2)

print_titulo("TOP BRs POR ACIDENTES")
print_df(br_resumo.sort_values("acidentes", ascending=False), TOP_N)

print_titulo("TOP BRs POR VÍTIMAS FATAIS")
print_df(br_resumo.sort_values("vitimas_fatais", ascending=False), TOP_N)

print_titulo("BRs MAIS LETAIS (mínimo de 200 acidentes)")
print_df(
    br_resumo[br_resumo["acidentes"] >= MIN_ACIDENTES_TAXA_BR]
    .sort_values(["taxa_acidente_fatal_pct", "vitimas_fatais"], ascending=False),
    TOP_N
)

# ---------------------------------------------------------
# MUNICÍPIOS
# ---------------------------------------------------------
mun_resumo = (
    base_acidente.groupby(["uf", "municipio"], dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
    .sort_values(["vitimas_fatais", "acidentes"], ascending=False)
)

print_titulo("TOP MUNICÍPIOS POR VÍTIMAS FATAIS")
print_df(mun_resumo, TOP_N)

# ---------------------------------------------------------
# TEMPO
# ---------------------------------------------------------
dia_semana = (
    base_acidente.groupby("dia_semana", dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
)

ordem_dia = {
    "segunda-feira": 1, "terça-feira": 2, "quarta-feira": 3,
    "quinta-feira": 4, "sexta-feira": 5, "sábado": 6, "domingo": 7
}
dia_semana["ordem"] = dia_semana["dia_semana"].map(ordem_dia).fillna(99)
dia_semana["taxa_acidente_fatal_pct"] = (dia_semana["acidentes_fatais"] / dia_semana["acidentes"] * 100).round(2)
dia_semana = dia_semana.sort_values("ordem").drop(columns="ordem")

hora = (
    base_acidente.groupby("hora", dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
    .sort_values("hora")
)
hora["taxa_acidente_fatal_pct"] = (hora["acidentes_fatais"] / hora["acidentes"] * 100).round(2)

faixa_horaria = (
    base_acidente.groupby("faixa_horaria", dropna=False)
    .agg(
        acidentes=("id", "nunique"),
        acidentes_fatais=("flag_acidente_fatal", "sum"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
)
faixa_horaria["taxa_acidente_fatal_pct"] = (faixa_horaria["acidentes_fatais"] / faixa_horaria["acidentes"] * 100).round(2)

print_titulo("DIA DA SEMANA")
print(dia_semana.to_string(index=False))

print_titulo("HORÁRIOS MAIS CRÍTICOS POR VÍTIMAS FATAIS")
print_df(hora.sort_values("vitimas_fatais", ascending=False), TOP_N)

print_titulo("FAIXA HORÁRIA")
print_df(faixa_horaria.sort_values("vitimas_fatais", ascending=False), 10)

# ---------------------------------------------------------
# CONTEXTO DA VIA
# ---------------------------------------------------------
def resumo_categoria(coluna):
    tmp = (
        base_acidente.groupby(coluna, dropna=False)
        .agg(
            acidentes=("id", "nunique"),
            acidentes_fatais=("flag_acidente_fatal", "sum"),
            vitimas_fatais=("vitimas_fatais", "sum")
        )
        .reset_index()
    )
    tmp["taxa_acidente_fatal_pct"] = (tmp["acidentes_fatais"] / tmp["acidentes"] * 100).round(2)
    return tmp.sort_values(["vitimas_fatais", "acidentes_fatais"], ascending=False)

print_titulo("TIPO DE PISTA")
print_df(resumo_categoria("tipo_pista"), TOP_N)

print_titulo("TRAÇADO DA VIA")
print_df(resumo_categoria("tracado_via"), TOP_N)

print_titulo("CONDIÇÃO METEOROLÓGICA")
print_df(resumo_categoria("condicao_meteorologica"), TOP_N)

print_titulo("FASE DO DIA")
print_df(resumo_categoria("fase_dia"), TOP_N)

# ---------------------------------------------------------
# PERFIL DAS VÍTIMAS
# ---------------------------------------------------------
tipo_veiculo_mortes = (
    base_pessoa[base_pessoa["flag_morto"] == 1]
    .groupby("tipo_veiculo", dropna=False)
    .agg(vitimas_fatais=("flag_morto", "sum"))
    .reset_index()
    .sort_values("vitimas_fatais", ascending=False)
)

tipo_envolvido_mortes = (
    base_pessoa[base_pessoa["flag_morto"] == 1]
    .groupby("tipo_envolvido", dropna=False)
    .agg(vitimas_fatais=("flag_morto", "sum"))
    .reset_index()
    .sort_values("vitimas_fatais", ascending=False)
)

sexo_mortes = (
    base_pessoa[base_pessoa["flag_morto"] == 1]
    .groupby("sexo", dropna=False)
    .agg(vitimas_fatais=("flag_morto", "sum"))
    .reset_index()
    .sort_values("vitimas_fatais", ascending=False)
)
sexo_mortes["pct"] = (sexo_mortes["vitimas_fatais"] / sexo_mortes["vitimas_fatais"].sum() * 100).round(2)

faixa_idade_mortes = (
    base_pessoa[base_pessoa["flag_morto"] == 1]
    .groupby("faixa_idade", observed=False, dropna=False)
    .agg(vitimas_fatais=("flag_morto", "sum"))
    .reset_index()
)

print_titulo("TIPO DE VEÍCULO ENTRE VÍTIMAS FATAIS")
print_df(tipo_veiculo_mortes, TOP_N)

print_titulo("TIPO DE ENVOLVIDO ENTRE VÍTIMAS FATAIS")
print_df(tipo_envolvido_mortes, TOP_N)

print_titulo("SEXO ENTRE VÍTIMAS FATAIS")
print_df(sexo_mortes, TOP_N)

print_titulo("FAIXA ETÁRIA ENTRE VÍTIMAS FATAIS")
print_df(faixa_idade_mortes, 10)

# ---------------------------------------------------------
# HOTSPOTS
# ---------------------------------------------------------
hotspots = (
    base_acidente[base_acidente["flag_acidente_fatal"] == 1]
    .dropna(subset=["latitude", "longitude"])
    .assign(
        lat_round=lambda x: x["latitude"].round(2),
        lon_round=lambda x: x["longitude"].round(2)
    )
    .groupby(["lat_round", "lon_round"], dropna=False)
    .agg(
        acidentes_fatais=("id", "nunique"),
        vitimas_fatais=("vitimas_fatais", "sum")
    )
    .reset_index()
    .sort_values(["vitimas_fatais", "acidentes_fatais"], ascending=False)
)

print_titulo("HOTSPOTS FATAIS")
print_df(hotspots, TOP_N)

# ---------------------------------------------------------
# INSIGHTS AUTOMÁTICOS
# ---------------------------------------------------------
print_titulo("INSIGHTS RÁPIDOS PARA O DASHBOARD")

causa_top = causas_taxa.sort_values("acidentes", ascending=False).iloc[0]
causa_letal = causas_taxa[causas_taxa["acidentes"] >= MIN_ACIDENTES_TAXA].sort_values("taxa_fatal_pct", ascending=False).iloc[0]

tipo_top = tipos_taxa.sort_values("acidentes", ascending=False).iloc[0]
tipo_letal = tipos_taxa[tipos_taxa["acidentes"] >= MIN_ACIDENTES_TAXA].sort_values("taxa_fatal_pct", ascending=False).iloc[0]

uf_top = uf_resumo.sort_values("vitimas_fatais", ascending=False).iloc[0]
br_top = br_resumo.sort_values("vitimas_fatais", ascending=False).iloc[0]
hora_top = hora.sort_values("vitimas_fatais", ascending=False).iloc[0]
dia_top = dia_semana.sort_values("vitimas_fatais", ascending=False).iloc[0]
veic_top = tipo_veiculo_mortes.iloc[0] if not tipo_veiculo_mortes.empty else None
sexo_top = sexo_mortes.iloc[0] if not sexo_mortes.empty else None
faixa_top = faixa_idade_mortes.sort_values("vitimas_fatais", ascending=False).iloc[0] if not faixa_idade_mortes.empty else None

print(f"• A causa mais frequente é '{causa_top['causa_acidente']}' com {int(causa_top['acidentes']):,} acidentes.".replace(",", "."))
print(f"• A causa com maior taxa de fatalidade é '{causa_letal['causa_acidente']}' com {causa_letal['taxa_fatal_pct']}% dos acidentes resultando em fatalidade.".replace(",", "."))
print(f"• O tipo de acidente mais comum é '{tipo_top['tipo_acidente']}' com {int(tipo_top['acidentes']):,} ocorrências.".replace(",", "."))
print(f"• O tipo com maior taxa de fatalidade é '{tipo_letal['tipo_acidente']}' com {tipo_letal['taxa_fatal_pct']}%.".replace(",", "."))
print(f"• A UF com mais vítimas fatais é {uf_top['uf']} com {int(uf_top['vitimas_fatais']):,} vítimas.".replace(",", "."))
print(f"• A BR com mais vítimas fatais é a BR-{int(br_top['br']) if pd.notna(br_top['br']) else 'N/A'} com {int(br_top['vitimas_fatais']):,} vítimas.".replace(",", "."))
print(f"• O horário mais crítico é {int(hora_top['hora']) if pd.notna(hora_top['hora']) else 'N/A'}h, com {int(hora_top['vitimas_fatais']):,} vítimas fatais.".replace(",", "."))
print(f"• O dia mais crítico é {dia_top['dia_semana']} com {int(dia_top['vitimas_fatais']):,} vítimas fatais.".replace(",", "."))
if veic_top is not None:
    print(f"• O tipo de veículo mais presente entre vítimas fatais é '{veic_top['tipo_veiculo']}' com {int(veic_top['vitimas_fatais']):,} vítimas.".replace(",", "."))
if sexo_top is not None:
    print(f"• O sexo mais presente entre vítimas fatais é '{sexo_top['sexo']}' com {sexo_top['pct']}% do total.".replace(",", "."))
if faixa_top is not None:
    print(f"• A faixa etária com mais vítimas fatais é '{faixa_top['faixa_idade']}' com {int(faixa_top['vitimas_fatais']):,} vítimas.".replace(",", "."))

print_titulo("[6/6] FINALIZADO")
print("Tudo foi calculado só no terminal, sem exportar arquivos.")