export function calculateStats(graph) {
    const nodes = graph.nodes
    const edges = graph.edges

    return {
        nodes: nodes.length,
        edges: edges.length,
        active: nodes.filter((n) => n.status === 'active').length,
        warning: nodes.filter((n) => n.status === 'warning').length,
        danger: nodes.filter((n) => n.status === 'danger').length,
    }
}

export function buildTabs(node) {
    const relations = node?.meta?.relations?.length || 0
    const alerts = node?.meta?.alerts?.length || 0

    return [
        { id: 'info', label: 'Инфо', count: null },
        { id: 'connections', label: 'Связи', count: relations || null },
        { id: 'alerts', label: 'Алерты', count: alerts || null },
    ]
}