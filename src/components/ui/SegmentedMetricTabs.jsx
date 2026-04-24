export function SegmentedMetricTabs({ items, activeId, onChange, ariaLabel }) {
  return (
    <div
      className="segmented-tabs"
      role="tablist"
      aria-label={ariaLabel}
      style={{ '--segments-count': items.length }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === activeId ? 'active' : ''}
          onClick={() => onChange(item.id)}
          aria-selected={item.id === activeId}
          role="tab"
        >
          <span>{item.tabLabel ?? item.label}</span>
        </button>
      ))}
    </div>
  )
}
