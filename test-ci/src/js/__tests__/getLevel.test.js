import { getLevel } from '../getLevel';
import fetchData from '../http';

jest.mock('../http', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('getLevel', () => {
  test('returns level when fetchData returns status ok', () => {
    fetchData.mockReturnValue({ status: 'ok', level: 5 });
    expect(getLevel('user1')).toBe('Ваш текущий уровень: 5');
  });

  test('returns unavailable message when fetchData returns status not ok', () => {
    fetchData.mockReturnValue({ status: 'error' });
    expect(getLevel('user1')).toBe('Информация об уровне временно недоступна');
  });

  test('returns unavailable message when fetchData throws an error', () => {
    fetchData.mockImplementation(() => {
      throw new Error('Network error');
    });
    expect(getLevel('user1')).toBe('Информация об уровне временно недоступна');
  });
}); 