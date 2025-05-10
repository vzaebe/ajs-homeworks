import Buyable from "./Buyable";

export default class Movie implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly country: string,
        readonly tagline: string,
        readonly year: number,
        readonly genre: string[],
        readonly duration: number
    ) { }
}