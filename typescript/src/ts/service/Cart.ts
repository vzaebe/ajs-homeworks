import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        const existingItem = this._items.find(i => i.id === item.id);
        
        if (existingItem && 'quantity' in existingItem) {
            // If item exists and supports quantity, increment its quantity
            const index = this._items.indexOf(existingItem);
            this._items[index] = {
                ...existingItem,
                quantity: (existingItem.quantity || 1) + 1
            };
        } else if (!existingItem) {
            // If item doesn't exist, add it with quantity 1
            this._items.push({
                ...item,
                quantity: 1
            });
        }
        // If item exists but doesn't support quantity, do nothing (digital items)
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    calculateTotalCost(): number {
        return this._items.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    }

    calculateTotalCostWithDiscount(discount: number): number {
        if (discount < 0 || discount > 100) {
            throw new Error('Discount must be between 0 and 100');
        }
        const total = this.calculateTotalCost();
        return total - (total * (discount / 100));
    }

    removeItem(id: number): void {
        const index = this._items.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Item not found in cart');
        }

        const item = this._items[index];
        if ('quantity' in item && item.quantity && item.quantity > 1) {
            // If item has quantity > 1, decrement it
            this._items[index] = {
                ...item,
                quantity: item.quantity - 1
            };
        } else {
            // Otherwise remove the item completely
            this._items.splice(index, 1);
        }
    }
}