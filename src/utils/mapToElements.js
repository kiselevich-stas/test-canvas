import { buildNodeSprite } from './nodeSprite'

/**
 * Преобразует доменную модель графа в массив элементов Cytoscape.
 * Для узлов используется sprite, чтобы сохранить старый внешний вид:
 * круг основного типа + цветная статусная точка.
 *
 * @param {{ nodes: Array<object>, edges: Array<object> }} graph - Граф в прикладном формате.
 * @returns {Array<object>} Элементы Cytoscape для инициализации канваса.
 */
export function graphToElements(graph) {
  const nodeElements = graph.nodes.map((node) => ({
    data: {
      id: node.id,
      label: node.label,
      size: node.size,
      sprite: buildNodeSprite({
        type: node.type,
        status: node.status,
        size: node.size,
      }),
      type: node.type,
      status: node.status,
      meta: node.meta,
    },
    position: {
      x: node.x,
      y: node.y,
    },
  }))

  const edgeElements = graph.edges.map((edge) => ({
    data: {
      id: edge.id || `${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      edgeType: edge.edgeType,
    },
  }))

  return [...nodeElements, ...edgeElements]
}

/**
 * Фильтрует граф по строке поиска, типам, статусам, типам связей
 * и опционально скрывает изолированные узлы.
 *
 * @param {{ nodes: Array<object>, edges: Array<object> }} graph - Исходный граф.
 * @param {{ search: string, types: string[], statuses: string[], edgeTypes: string[], hideIsolated: boolean }} filters - Текущие фильтры.
 * @returns {{ nodes: Array<object>, edges: Array<object> }} Новый отфильтрованный граф.
 */
export function filterGraph(graph, filters) {
  const normalizedSearch = String(filters.search || '').trim().toLowerCase()

  let nodes = graph.nodes.filter((node) => {
    const byType = filters.types.includes(node.type)
    const byStatus = filters.statuses.includes(node.status)

    const haystack = [
      node.label,
      node.id,
      node.meta?.shortName,
      node.meta?.typeLabel,
      ...(node.meta?.contacts || []),
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

    const bySearch = !normalizedSearch || haystack.includes(normalizedSearch)

    return byType && byStatus && bySearch
  })

  const allowedNodeIds = new Set(nodes.map((node) => node.id))

  let edges = graph.edges.filter((edge) => {
    return filters.edgeTypes.includes(edge.edgeType)
        && allowedNodeIds.has(edge.source)
        && allowedNodeIds.has(edge.target)
  })

  if (filters.hideIsolated) {
    const connectedNodeIds = new Set(edges.flatMap((edge) => [edge.source, edge.target]))
    nodes = nodes.filter((node) => connectedNodeIds.has(node.id))

    const visibleIds = new Set(nodes.map((node) => node.id))
    edges = edges.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target))
  }

  return { nodes, edges }
}