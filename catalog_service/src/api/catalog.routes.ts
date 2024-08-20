import express, { NextFunction } from "express";

const router = express.Router();
//end points
router.post("/product", async (req, res, next: NextFunction) => {
  return res.status(201).json({});
});
export default router;
