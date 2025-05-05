const healthStatus = require('../healthStatus');

describe('healthStatus', () => {
  test('returns healthy when health > 50', () => {
    expect(healthStatus({ name: 'Маг', health: 90 })).toBe('healthy');
    expect(healthStatus({ name: 'Лучник', health: 51 })).toBe('healthy');
  });

  test('returns wounded when health is 50', () => {
    expect(healthStatus({ name: 'Маг', health: 50 })).toBe('wounded');
  });

  test('returns wounded when health is between 15 and 49', () => {
    expect(healthStatus({ name: 'Маг', health: 49 })).toBe('wounded');
    expect(healthStatus({ name: 'Маг', health: 15 })).toBe('wounded');
  });

  test('returns critical when health < 15', () => {
    expect(healthStatus({ name: 'Маг', health: 14 })).toBe('critical');
    expect(healthStatus({ name: 'Маг', health: 0 })).toBe('critical');
  });
}); 