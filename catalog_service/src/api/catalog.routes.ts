import express, { NextFunction } from "express";
import { CatalogService } from "../services/catalog.service";
import { catalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest } from "../dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new catalogRepository());

//end points
router.post("/products", async (req, res, next: NextFunction) => {
try{
  const {errors,input} = await RequestValidator(CreateProductRequest,req.body);
if(errors) {
  return res.status(400).json(errors);
}

  const data = await catalogService.createProduct(req.body);
  return res.status(201).json(data);
} catch(error) {
  const err = error as Error;
  return res.status(500).json(err.message);
}

});
export default router;
