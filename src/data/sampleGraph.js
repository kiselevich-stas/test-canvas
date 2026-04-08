export const sampleGraph = {
  nodes: [
    {
      id: 'core',
      label: 'Twix.im',
      type: 'hub',
      status: 'active',
      size: 132,
      x: 0,
      y: 0,
      meta: { country: 'Global', group: 'TWIX Hub' },
    },

    { id: 'p1', label: 'AlphaRoute', type: 'processor', status: 'active', size: 92, x: -170, y: -115, meta: { country: 'Estonia', group: 'Процессинг' } },
    { id: 'p2', label: 'AlphaRoute', type: 'processor', status: 'active', size: 92, x: -55, y: -250, meta: { country: 'Cyprus', group: 'Процессинг' } },
    { id: 'p3', label: 'AlphaRoute', type: 'processor', status: 'active', size: 92, x: 90, y: -245, meta: { country: 'Latvia', group: 'Процессинг' } },
    { id: 'p4', label: 'AlphaRoute', type: 'processor', status: 'active', size: 92, x: 200, y: -115, meta: { country: 'Poland', group: 'Процессинг' } },
    { id: 'p5', label: 'AlphaRoute', type: 'processor', status: 'unknown', size: 92, x: -170, y: 90, meta: { country: 'Lithuania', group: 'Процессинг' } },
    { id: 'p6', label: 'AlphaRoute', type: 'processor', status: 'warning', size: 92, x: -45, y: 180, meta: { country: 'Romania', group: 'Процессинг' } },
    { id: 'p7', label: 'AlphaRoute', type: 'processor', status: 'warning', size: 92, x: 110, y: 205, meta: { country: 'Serbia', group: 'Процессинг' } },
    { id: 'p8', label: 'AlphaRoute', type: 'processor', status: 'active', size: 92, x: 180, y: 110, meta: { country: 'Italy', group: 'Процессинг' } },

    { id: 'm1', label: 'BitStore', type: 'merchant', status: 'danger', size: 64, x: -300, y: -180, meta: { country: 'DE', group: 'Мерчант' } },
    { id: 'm2', label: 'BitStore', type: 'merchant', status: 'active', size: 64, x: -360, y: -20, meta: { country: 'DE', group: 'Мерчант' } },
    { id: 'm3', label: 'BitStore', type: 'merchant', status: 'warning', size: 64, x: -305, y: 140, meta: { country: 'DE', group: 'Мерчант' } },
    { id: 'm4', label: 'BitStore', type: 'merchant', status: 'unknown', size: 64, x: -290, y: 250, meta: { country: 'DE', group: 'Мерчант' } },

    { id: 'm5', label: 'BitStore', type: 'merchant', status: 'warning', size: 64, x: -95, y: -325, meta: { country: 'PL', group: 'Мерчант' } },
    { id: 'm6', label: 'BitStore', type: 'merchant', status: 'active', size: 64, x: 40, y: -315, meta: { country: 'PL', group: 'Мерчант' } },
    { id: 'm7', label: 'BitStore', type: 'merchant', status: 'warning', size: 64, x: 195, y: -275, meta: { country: 'PL', group: 'Мерчант' } },
    { id: 'm8', label: 'BitStore', type: 'merchant', status: 'unknown', size: 64, x: 285, y: -205, meta: { country: 'PL', group: 'Мерчант' } },

    { id: 'm9', label: 'BitStore', type: 'merchant', status: 'active', size: 64, x: 340, y: -30, meta: { country: 'NL', group: 'Мерчант' } },
    { id: 'm10', label: 'BitStore', type: 'merchant', status: 'active', size: 64, x: 285, y: 160, meta: { country: 'NL', group: 'Мерчант' } },
    { id: 'm11', label: 'BitStore', type: 'merchant', status: 'warning', size: 64, x: 300, y: 260, meta: { country: 'NL', group: 'Мерчант' } },
    { id: 'm12', label: 'BitStore', type: 'merchant', status: 'danger', size: 64, x: 180, y: 310, meta: { country: 'NL', group: 'Мерчант' } },

    { id: 'm13', label: 'BitStore', type: 'merchant', status: 'warning', size: 64, x: -55, y: 305, meta: { country: 'ES', group: 'Мерчант' } },
  ],
  edges: [
    { id: 'e1', source: 'core', target: 'p1', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },
    { id: 'e2', source: 'core', target: 'p2', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },
    { id: 'e3', source: 'core', target: 'p4', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },
    { id: 'e4', source: 'core', target: 'p5', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },
    { id: 'e5', source: 'core', target: 'p6', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },
    { id: 'e6', source: 'core', target: 'p7', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },
    { id: 'e7', source: 'core', target: 'p8', edgeType: 'hub', risk: 'low', label: 'Через TWIX' },

    { id: 'e8', source: 'p1', target: 'm1', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e9', source: 'p1', target: 'm2', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e10', source: 'p1', target: 'm3', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },

    { id: 'e11', source: 'p2', target: 'm5', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e12', source: 'p3', target: 'm6', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e13', source: 'p4', target: 'm7', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e14', source: 'p4', target: 'm8', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },

    { id: 'e15', source: 'p4', target: 'm9', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e16', source: 'p4', target: 'm10', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },

    { id: 'e17', source: 'p8', target: 'm11', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
    { id: 'e18', source: 'p7', target: 'm12', edgeType: 'direct', risk: 'medium', label: 'Прямая связь' },
    { id: 'e19', source: 'p5', target: 'm4', edgeType: 'direct', risk: 'medium', label: 'Прямая связь' },
    { id: 'e20', source: 'p6', target: 'm13', edgeType: 'direct', risk: 'low', label: 'Прямая связь' },
  ],
}