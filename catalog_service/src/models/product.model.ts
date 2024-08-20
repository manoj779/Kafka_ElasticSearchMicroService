export class Product{
    constructor(
        public readonly name:String,
        public readonly description: String,
        public readonly price: Number,
        public readonly stock: Number,
        public readonly id?: number
    ){}
}