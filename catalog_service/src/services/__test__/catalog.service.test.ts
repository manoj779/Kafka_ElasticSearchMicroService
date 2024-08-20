import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";

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
                 const reqBody = {
                name: "iphone",
                description: "smart phone",
                stock: 200,
                price: 2,
            };
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
  });
});
