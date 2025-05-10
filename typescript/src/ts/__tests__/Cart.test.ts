import Cart from '../service/Cart';
import Book from '../domain/Book';
import Movie from '../domain/Movie';
import PhysicalItem from '../domain/PhysicalItem';

describe('Cart', () => {
    let cart: Cart;

    beforeEach(() => {
        cart = new Cart();
    });

    test('new cart should be empty', () => {
        expect(cart.items).toHaveLength(0);
    });

    test('should add digital items (books, movies) only once', () => {
        const book = new Book(1, 'Test Book', 'Test Author', 100, 200);
        const movie = new Movie(2, 'Test Movie', 200, 'USA', 'Test Tagline', 2023, ['Action'], 120);

        cart.add(book);
        cart.add(book);
        cart.add(movie);
        cart.add(movie);

        expect(cart.items).toHaveLength(2);
        expect(cart.items[0].id).toBe(1);
        expect(cart.items[1].id).toBe(2);
    });

    test('should handle physical items with quantities', () => {
        const smartphone = new PhysicalItem(
            1,
            'Smartphone',
            1000,
            1,
            'Apple',
            'iPhone 13',
            'Latest iPhone model'
        );

        cart.add(smartphone);
        cart.add(smartphone);
        cart.add(smartphone);

        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(3);
        expect(cart.calculateTotalCost()).toBe(3000);

        cart.removeItem(1);
        expect(cart.items[0].quantity).toBe(2);
        expect(cart.calculateTotalCost()).toBe(2000);
    });

    test('should calculate total cost correctly', () => {
        const book = new Book(1, 'Test Book', 'Test Author', 100, 200);
        const movie = new Movie(2, 'Test Movie', 200, 'USA', 'Test Tagline', 2023, ['Action'], 120);
        const smartphone = new PhysicalItem(
            3,
            'Smartphone',
            1000,
            1,
            'Apple',
            'iPhone 13',
            'Latest iPhone model'
        );

        cart.add(book);
        cart.add(movie);
        cart.add(smartphone);
        cart.add(smartphone);

        expect(cart.calculateTotalCost()).toBe(2300); // 100 + 200 + (1000 * 2)
    });

    test('should calculate total cost with discount correctly', () => {
        const book = new Book(1, 'Test Book', 'Test Author', 100, 200);
        const movie = new Movie(2, 'Test Movie', 200, 'USA', 'Test Tagline', 2023, ['Action'], 120);
        const smartphone = new PhysicalItem(
            3,
            'Smartphone',
            1000,
            1,
            'Apple',
            'iPhone 13',
            'Latest iPhone model'
        );

        cart.add(book);
        cart.add(movie);
        cart.add(smartphone);
        cart.add(smartphone);

        expect(cart.calculateTotalCostWithDiscount(10)).toBe(2070); // (2300 - 10%)
    });

    test('should throw error for invalid discount', () => {
        const book = new Book(1, 'Test Book', 'Test Author', 100, 200);
        cart.add(book);

        expect(() => cart.calculateTotalCostWithDiscount(-1)).toThrow('Discount must be between 0 and 100');
        expect(() => cart.calculateTotalCostWithDiscount(101)).toThrow('Discount must be between 0 and 100');
    });

    test('should remove items correctly', () => {
        const book = new Book(1, 'Test Book', 'Test Author', 100, 200);
        const movie = new Movie(2, 'Test Movie', 200, 'USA', 'Test Tagline', 2023, ['Action'], 120);
        const smartphone = new PhysicalItem(
            3,
            'Smartphone',
            1000,
            1,
            'Apple',
            'iPhone 13',
            'Latest iPhone model'
        );

        cart.add(book);
        cart.add(movie);
        cart.add(smartphone);
        cart.add(smartphone);

        cart.removeItem(1);
        expect(cart.items).toHaveLength(2);
        expect(cart.items[0].id).toBe(2);
        expect(cart.items[1].id).toBe(3);
        expect(cart.items[1].quantity).toBe(2);

        cart.removeItem(3);
        expect(cart.items).toHaveLength(2);
        expect(cart.items[1].quantity).toBe(1);

        expect(() => cart.removeItem(999)).toThrow('Item not found in cart');
    });
});
