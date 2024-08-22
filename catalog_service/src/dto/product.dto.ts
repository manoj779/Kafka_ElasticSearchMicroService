import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequest {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    description:string;

    @IsNumber()
    @Min(1)
    price:number;

    @IsNumber()
    stock:number;

    
constructor(name: string, description: string, price: number, stock: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
}
}
