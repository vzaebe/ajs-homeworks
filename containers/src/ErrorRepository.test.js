import { ErrorRepository } from './ErrorRepository';

describe('ErrorRepository', () => {
    let errorRepository;

    beforeEach(() => {
        errorRepository = new ErrorRepository();
        errorRepository.errors.set(404, 'Not Found');
        errorRepository.errors.set(500, 'Internal Server Error');
    });

    test('should return error message for existing code', () => {
        expect(errorRepository.translate(404)).toBe('Not Found');
        expect(errorRepository.translate(500)).toBe('Internal Server Error');
    });

    test('should return Unknown error for non-existing code', () => {
        expect(errorRepository.translate(403)).toBe('Unknown error');
        expect(errorRepository.translate(999)).toBe('Unknown error');
    });
}); 