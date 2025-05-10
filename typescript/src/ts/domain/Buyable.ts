export default interface Buyable {
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly quantity?: number, // Optional property for items that can have multiple quantities
}