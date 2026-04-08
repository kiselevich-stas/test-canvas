const NODE_COLORS = {
  hub: '#8b5cf6',
  processor: '#36c2da',
  merchant: '#3b82f6',
}

const STATUS_COLORS = {
  active: '#16a34a',
  warning: '#f97316',
  danger: '#ef4444',
  unknown: '#9ca3af',
}

function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function buildNodeSprite(node) {
  const size = Number(node.size || 72)
  const mainColor = NODE_COLORS[node.type] || NODE_COLORS.merchant
  const statusColor = STATUS_COLORS[node.status] || STATUS_COLORS.unknown

  const isHub = node.type === 'hub'
  const circleRadius = isHub ? 44 : size >= 80 ? 36 : 28
  const statusRadius = isHub ? 10 : 8
  const statusCx = isHub ? 78 : 72
  const statusCy = isHub ? 22 : 18

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.14)"/>
        </filter>
      </defs>

      <circle cx="50" cy="50" r="${circleRadius}" fill="${mainColor}" filter="url(#shadow)" />
      <circle cx="${statusCx}" cy="${statusCy}" r="${statusRadius + 2}" fill="white" />
      <circle cx="${statusCx}" cy="${statusCy}" r="${statusRadius}" fill="${statusColor}" />
    </svg>
  `

  return svgToDataUri(svg)
}