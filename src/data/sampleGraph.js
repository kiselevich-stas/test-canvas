export const sampleGraph = {
  nodes: [
    { id: 'core', label: 'Twix.im', type: 'hub', status: 'active', size: 120, x: 0, y: 0, meta: { country: 'Global', group: 'Core route' } },
    { id: 'alpha', label: 'Alpha Route', type: 'processor', status: 'active', size: 86, x: -270, y: -140, meta: { country: 'Estonia', group: 'Processor' } },
    { id: 'beta', label: 'BetaPay', type: 'processor', status: 'warning', size: 86, x: 270, y: -110, meta: { country: 'Cyprus', group: 'Processor' } },
    { id: 'gamma', label: 'Gamma Link', type: 'processor', status: 'active', size: 86, x: -310, y: 170, meta: { country: 'Latvia', group: 'Processor' } },
    { id: 'delta', label: 'Delta Cash', type: 'processor', status: 'danger', size: 86, x: 320, y: 175, meta: { country: 'Poland', group: 'Processor' } },

    { id: 'm1', label: 'NovaMart', type: 'merchant', status: 'active', size: 58, x: -500, y: -250, meta: { country: 'Lithuania', group: 'Merchant' } },
    { id: 'm2', label: 'SkyShop', type: 'merchant', status: 'warning', size: 58, x: -470, y: -55, meta: { country: 'Germany', group: 'Merchant' } },
    { id: 'm3', label: 'AtlasPay', type: 'merchant', status: 'active', size: 58, x: -495, y: 85, meta: { country: 'Spain', group: 'Merchant' } },
    { id: 'm4', label: 'RedBox', type: 'merchant', status: 'danger', size: 58, x: -520, y: 245, meta: { country: 'Portugal', group: 'Merchant' } },

    { id: 'm5', label: 'TradeFox', type: 'merchant', status: 'active', size: 58, x: 505, y: -245, meta: { country: 'Serbia', group: 'Merchant' } },
    { id: 'm6', label: 'BlueCart', type: 'merchant', status: 'warning', size: 58, x: 470, y: -50, meta: { country: 'Romania', group: 'Merchant' } },
    { id: 'm7', label: 'Zeta Store', type: 'merchant', status: 'active', size: 58, x: 495, y: 95, meta: { country: 'Italy', group: 'Merchant' } },
    { id: 'm8', label: 'NightPay', type: 'merchant', status: 'danger', size: 58, x: 520, y: 250, meta: { country: 'Bulgaria', group: 'Merchant' } },
  ],
  edges: [
    { id: 'e1', source: 'core', target: 'alpha', edgeType: 'hub', risk: 'low', label: 'routing' },
    { id: 'e2', source: 'core', target: 'beta', edgeType: 'hub', risk: 'medium', label: 'routing' },
    { id: 'e3', source: 'core', target: 'gamma', edgeType: 'hub', risk: 'low', label: 'routing' },
    { id: 'e4', source: 'core', target: 'delta', edgeType: 'hub', risk: 'high', label: 'routing' },

    { id: 'e5', source: 'alpha', target: 'm1', edgeType: 'direct', risk: 'low', label: 'direct' },
    { id: 'e6', source: 'alpha', target: 'm2', edgeType: 'direct', risk: 'medium', label: 'direct' },
    { id: 'e7', source: 'gamma', target: 'm3', edgeType: 'direct', risk: 'low', label: 'direct' },
    { id: 'e8', source: 'gamma', target: 'm4', edgeType: 'direct', risk: 'high', label: 'direct' },

    { id: 'e9', source: 'beta', target: 'm5', edgeType: 'dashed', risk: 'low', label: 'monitor' },
    { id: 'e10', source: 'beta', target: 'm6', edgeType: 'direct', risk: 'medium', label: 'direct' },
    { id: 'e11', source: 'delta', target: 'm7', edgeType: 'direct', risk: 'medium', label: 'direct' },
    { id: 'e12', source: 'delta', target: 'm8', edgeType: 'dashed', risk: 'high', label: 'monitor' },
  ],
}
