export function Footer({ content }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner panel">
        <strong>{content.title}</strong>
        <p>{content.text}</p>
      </div>
    </footer>
  )
}
