import Buyable from './Buyable';

export default class PhysicalItem implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly quantity: number = 1,
        readonly brand: string,
        readonly model: string,
        readonly description: string
    ) { }
} 