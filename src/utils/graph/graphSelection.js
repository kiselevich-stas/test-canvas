export function ensureSelectionIsVisible(selectedNodeId, filteredGraph) {
    if (!selectedNodeId) return true

    const visibleIds = new Set(filteredGraph.nodes.map((n) => n.id))
    return visibleIds.has(selectedNodeId)
}