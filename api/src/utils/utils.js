const getStats = (stats) => {
  const statsNames = ["attack", "defense", "speed", "hp"];

  const statObj = {};
  statsNames.forEach((stat) => {
    statObj[stat] = stats.find(({ stat: { name } }) => name === stat)?.base_stat;
  });

  return statObj;
};


module.exports = { getStats };