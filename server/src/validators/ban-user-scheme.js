export default {
    id: (value) => (typeof +value === 'number' && +value >= 0),
    days: (value) => (typeof +value === 'number' && +value >= -1)
  };