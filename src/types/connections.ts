export type ConnectionTab = 'all' | 'pending' | 'active'
export type ConnectionStatus = 'confirmed' | 'waiting'
export type ConnectionChannel = 'twix' | 'direct'

export type ConnectionParty = {
    name: string
    shortName: string
    roleLabel: string
    roleKey: 'hub' | 'processor' | 'merchant'
}

export type ConnectionItem = {
    id: number
    left: ConnectionParty
    right: ConnectionParty
    status: ConnectionStatus
    channel: ConnectionChannel
    amountLabel: string
    dateLabel: string
}

export type ConnectionsResponse = {
    items: ConnectionItem[]
}