const sortHeroes = require('../sortHeroes');

describe('sortHeroes', () => {
  test('sorts heroes by health in descending order', () => {
    const input = [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
    ];
    const expected = [
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
      { name: 'мечник', health: 10 },
    ];
    expect(sortHeroes(input)).toEqual(expected);
  });

  test('returns a new array and does not modify the original', () => {
    const input = [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
    ];
    const result = sortHeroes(input);
    expect(result).not.toBe(input);
    expect(input).toEqual([
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
    ]);
  });
}); 