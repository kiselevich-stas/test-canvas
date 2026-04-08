import { buildNodeSprite } from './nodeSprite'

export function graphToElements(graph) {
  const nodes = graph.nodes.map((node) => ({
    group: 'nodes',
    data: {
      ...node,
      sprite: buildNodeSprite(node),
    },
    position: {
      x: node.x,
      y: node.y,
    },
    selectable: true,
    grabbable: true,
  }))

  const edges = graph.edges.map((edge) => ({
    group: 'edges',
    data: {
      ...edge,
    },
    selectable: true,
  }))

  return [...nodes, ...edges]
}

export function filterGraph(graph, filters) {
  const allowedNodes = graph.nodes.filter((node) => {
    const typeOk = filters.types.includes(node.type)
    const statusOk = filters.statuses.includes(node.status)
    const query = filters.search.trim().toLowerCase()
    const textOk = !query || node.label.toLowerCase().includes(query)
    return typeOk && statusOk && textOk
  })

  const allowedIds = new Set(allowedNodes.map((node) => node.id))

  const allowedEdges = graph.edges.filter((edge) => {
    if (!filters.edgeTypes.includes(edge.edgeType)) return false
    return allowedIds.has(edge.source) && allowedIds.has(edge.target)
  })

  const connectedIds = new Set()

  allowedEdges.forEach((edge) => {
    connectedIds.add(edge.source)
    connectedIds.add(edge.target)
  })

  const finalNodes = allowedNodes.filter((node) => {
    if (node.type === 'hub') return true
    if (!filters.hideIsolated) return true
    return connectedIds.has(node.id)
  })

  const finalIds = new Set(finalNodes.map((node) => node.id))
  const finalEdges = allowedEdges.filter(
    (edge) => finalIds.has(edge.source) && finalIds.has(edge.target),
  )

  return {
    nodes: finalNodes,
    edges: finalEdges,
  }
}
