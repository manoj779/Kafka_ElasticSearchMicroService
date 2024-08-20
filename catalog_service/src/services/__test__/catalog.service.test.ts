import { create } from "domain";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";
import { execArgv } from "process";

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  describe("createProduct", () => {
    test("Should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: +faker.commerce.price() });
      console.log(reqBody);
      const result = await service.createProduct(reqBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("Should throw error with unable to create the product ", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: +faker.commerce.price() });
      jest
        .spyOn(repository, "create")
        .mockImplementation(() => Promise.resolve({} as Product));
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("Should throw error with product already exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: +faker.commerce.price() });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exist"))
        );
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "product already exist"
      );
    });
  });

  describe("updateProduct",() => {
    
  })
});
