function sortHeroes(heroes) {
  return heroes.slice().sort((a, b) => b.health - a.health);
}

module.exports = sortHeroes; 