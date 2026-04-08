const NODE_COLORS = {
  hub: '#8b5cf6',
  processor: '#2dd4bf',
  merchant: '#3b82f6',
}

const STATUS_COLORS = {
  active: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  unknown: '#94a3b8',
}

function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function buildNodeSprite(node) {
  const size = Number(node.size || 72)
  const mainColor = NODE_COLORS[node.type] || NODE_COLORS.merchant
  const statusColor = STATUS_COLORS[node.status] || STATUS_COLORS.unknown
  const outline = node.type === 'hub' ? '#d8b4fe' : '#dbeafe'
  const haloOpacity = node.type === 'hub' ? 0.34 : 0.18
  const centerRadius = node.type === 'hub' ? 34 : node.type === 'processor' ? 26 : 18

  const viewBox = 100
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${viewBox} ${viewBox}">
      <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,0.05)" />
      <circle cx="50" cy="50" r="41" fill="${mainColor}" fill-opacity="${haloOpacity}" />
      <circle cx="50" cy="50" r="${centerRadius}" fill="${mainColor}" stroke="${outline}" stroke-width="4" />
      <circle cx="77" cy="23" r="11" fill="${statusColor}" stroke="#06101f" stroke-width="5" />
    </svg>
  `

  return svgToDataUri(svg)
}
