export const productionData = [
  {
    id: '4000T1',
    prodPlan: 4654,
    prodQty: 2525,
    balProd: 4129,
    workingDays: 21,
    avgPerDay: 2525,
    reqAvgPerDay: 2197,
    status: 'good',
    planValues: [2212, 2212, 2212, 2212, 2212, 2212],
    actualValues: [2100, 2150, 2180, 2200, 2250, 2212],
    efficiency: 85
  },
  {
    id: '4000T2',
    prodPlan: 5500,
    prodQty: 2795,
    balProd: 5205,
    workingDays: 21,
    avgPerDay: 2795,
    reqAvgPerDay: 2486,
    status: 'good',
    planValues: [2500, 2500, 2500, 2500, 2500, 2500],
    actualValues: [2400, 2450, 2480, 2490, 2500, 2500],
    efficiency: 88
  },
  {
    id: '4000T(LUG)',
    prodPlan: 6462,
    prodQty: 2705,
    balProd: 6757,
    workingDays: 21,
    avgPerDay: 2705,
    reqAvgPerDay: 2893,
    status: 'warning',
    planValues: [2885, 2885, 2885, 2885, 2885, 2885],
    actualValues: [2700, 2720, 2750, 2780, 2800, 2885],
    efficiency: 75
  },
  {
    id: '3000T1',
    prodPlan: 7154,
    prodQty: 4000,
    balProd: 7154,
    workingDays: 21,
    avgPerDay: 4000,
    reqAvgPerDay: 3436,
    status: 'good',
    planValues: [3462, 3462, 3462, 3462, 3462, 3462],
    actualValues: [3400, 3420, 3450, 3460, 3462, 3462],
    efficiency: 92
  },
  {
    id: '2500T1',
    prodPlan: 6792,
    prodQty: 2885,
    balProd: 6807,
    workingDays: 21,
    avgPerDay: 2885,
    reqAvgPerDay: 3086,
    status: 'warning',
    planValues: [3077, 3077, 3077, 3077, 3077, 3077],
    actualValues: [2900, 2950, 3000, 3020, 3050, 3077],
    efficiency: 78
  },
  {
    id: '2500T2',
    prodPlan: 12923,
    prodQty: 6555,
    balProd: 12368,
    workingDays: 21,
    avgPerDay: 6555,
    reqAvgPerDay: 5736,
    status: 'excellent',
    planValues: [5769, 5769, 5769, 5769, 5769, 5769],
    actualValues: [5700, 5730, 5750, 5760, 5769, 5769],
    efficiency: 95
  },
  {
    id: '2500T3',
    prodPlan: 6792,
    prodQty: 3249,
    balProd: 6443,
    workingDays: 21,
    avgPerDay: 3249,
    reqAvgPerDay: 3069,
    status: 'good',
    planValues: [3077, 3077, 3077, 3077, 3077, 3077],
    actualValues: [3200, 3220, 3240, 3249, 3249, 3077],
    efficiency: 82
  },
  {
    id: '2500T5',
    prodPlan: 7154,
    prodQty: 2890,
    balProd: 7264,
    workingDays: 21,
    avgPerDay: 2890,
    reqAvgPerDay: 3489,
    status: 'warning',
    planValues: [3462, 3462, 3462, 3462, 3462, 3462],
    actualValues: [2800, 2850, 2870, 2880, 2890, 3462],
    efficiency: 72
  },
  {
    id: '630T',
    prodPlan: 21538,
    prodQty: 10198,
    balProd: 20340,
    workingDays: 21,
    avgPerDay: 10198,
    reqAvgPerDay: 9588,
    status: 'good',
    planValues: [9615, 9615, 9615, 9615, 9615, 9615],
    actualValues: [9500, 9550, 9580, 9600, 9615, 9615],
    efficiency: 86
  },
  {
    id: '1000T1',
    prodPlan: 15308,
    prodQty: 6037,
    balProd: 14271,
    workingDays: 21,
    avgPerDay: 6037,
    reqAvgPerDay: 6965,
    status: 'warning',
    planValues: [6923, 6923, 6923, 6923, 6923, 6923],
    actualValues: [6000, 6020, 6030, 6037, 6037, 6923],
    efficiency: 74
  }
];

export const statusColors = {
  excellent: '#10B981',
  good: '#3B82F6', 
  warning: '#F59E0B',
  danger: '#EF4444'
};