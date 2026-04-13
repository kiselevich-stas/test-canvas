export const ALL_TYPES = ['hub', 'processor', 'merchant']
export const ALL_STATUSES = ['active', 'warning', 'danger', 'unknown']
export const ALL_EDGE_TYPES = ['hub', 'direct', 'dashed']

export const DEFAULT_FILTERS = Object.freeze({
    search: '',
    types: [...ALL_TYPES],
    statuses: [...ALL_STATUSES],
    edgeTypes: [...ALL_EDGE_TYPES],
    hideIsolated: false,
})