import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
    constructor() {
        console.log("MockCatalogRepository instantiated");
    }

    create(data: Product): Promise<Product> {
        console.log("Entered into the mock repository..!");
        const mockProduct = {
            id: 123,
            ...data
        } as Product;

        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any) {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}
