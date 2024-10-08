import express from "express";
import request from "supertest";
import { faker } from "@faker-js/faker";
import catalogRoutes, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";

const app = express();

app.use(express.json());
app.use(catalogRoutes);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 50 }),
    price: +faker.commerce.price(),
  };
};

describe("Catalog Routes", () => {
  describe("POST /products", () => {
    test("should create product successfully", async () => {
      const reqBody = mockRequest();
      const product = ProductFactory.build();

      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .post("/products")
        .send(reqBody)
        .set("Accept", "application/json");
      //   console.log("Test response", response);

      expect(response.status).toBe(201);
      console.log("responseBody:", response.body);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400",async()=>{
        const  reqBody = mockRequest();
        const response = await request(app)
        .post("/products")
        .send({...reqBody,name: ""})
        .set("Accept","application/json");

        expect(response.status).toBe(400);
        expect(response.body).toEqual("name should not be empty");
    })

    test("should response with an internal error code 500", async() =>{
        const reqBody = mockRequest();
        jest.spyOn(catalogService,"createProduct").mockImplementationOnce(()=>Promise.reject(new Error("error occurred on create product")));
        const response = await request(app)
        .post("/products")
        .send(reqBody)
        .set("Accept","application/json");

        expect(response.status).toBe(500);
        expect(response.body).toEqual("error occurred on create product");
    });

  });
});
