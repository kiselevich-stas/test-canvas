/**
 * Возвращает основной цвет узла по его типу.
 *
 * @param {string} type - Тип узла.
 * @returns {string} HEX-цвет узла.
 */
function getNodeColor(type) {
  switch (type) {
    case 'hub':
      return '#8b5cf6'
    case 'processor':
      return '#35c2dc'
    case 'merchant':
      return '#3b82f6'
    default:
      return '#9ca3af'
  }
}

/**
 * Возвращает цвет статусной точки.
 *
 * @param {string} status - Статус узла.
 * @returns {string} HEX-цвет статуса.
 */
function getStatusColor(status) {
  switch (status) {
    case 'active':
      return '#28a745'
    case 'warning':
      return '#f97316'
    case 'danger':
      return '#ef4444'
    default:
      return '#d1d5db'
  }
}

/**
 * Кодирует SVG в data URI для Cytoscape.
 *
 * @param {string} svg - SVG-строка.
 * @returns {string} Data URI.
 */
function toDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

/**
 * Строит SVG-спрайт узла:
 * - основной круг нужного цвета
 * - мягкая внутренняя подсветка
 * - легкая тень
 * - статусная точка в правом верхнем углу
 *
 * Это возвращает визуал, максимально близкий к старому.
 *
 * @param {{ type: string, status: string, size: number }} options
 * @param {string} options.type - Тип узла.
 * @param {string} options.status - Статус узла.
 * @param {number} options.size - Размер узла.
 * @returns {string} Data URI со спрайтом.
 */
export function buildNodeSprite({ type, status, size }) {
  const nodeColor = getNodeColor(type)
  const statusColor = getStatusColor(status)

  const safeSize = Number(size) || 64
  const canvasSize = Math.max(safeSize + 18, 72)

  const center = canvasSize / 2
  const radius = safeSize / 2 - 3

  const highlightRadius = Math.max(radius * 0.58, 10)
  const highlightCx = center - radius * 0.22
  const highlightCy = center - radius * 0.18

  const shadowOffsetY = Math.max(radius * 0.12, 4)
  const shadowBlur = Math.max(radius * 0.2, 6)

  const statusRadius = Math.max(radius * 0.2, 7)
  const statusCx = center + radius * 0.72
  const statusCy = center - radius * 0.72

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
      <defs>
        <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="${shadowOffsetY}" stdDeviation="${shadowBlur}" flood-color="#000000" flood-opacity="0.14"/>
        </filter>
      </defs>

      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="${nodeColor}"
        filter="url(#shadow)"
      />


      <circle
        cx="${statusCx}"
        cy="${statusCy}"
        r="${statusRadius}"
        fill="${statusColor}"
        stroke="#ffffff"
        stroke-width="${Math.max(statusRadius * 0.28, 3)}"
      />
    </svg>
  `

  return toDataUri(svg)
}