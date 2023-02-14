import { Router } from "express"; // Express router
import { ValidatorFactories, validatorRule } from "../utils"; // Custom validation middleware functions
import { productController } from "../controllers/products"; // Controller functions for handling product-related logic

// Create a new router instance
const router = Router();

// Define a GET route to retrieve all products
router.get("/products", productController.getAllProducts);

// Define a GET route to retrieve a specific product by ID, with request validation middleware
router.get(
  "/product/:id",
  ValidatorFactories.getProductById, // Custom validation middleware function to check if product ID exists
  validatorRule, // Custom validation middleware function to check if there are any validation errors
  productController.getProductById // Controller function to retrieve product details
);

// Define a POST route to create a new product, with request validation middleware
router.post(
  "/product",
  ValidatorFactories.createProductValidation, // Custom validation middleware function to check if request body contains required fields
  validatorRule, // Custom validation middleware function to check if there are any validation errors
  productController.createProduct // Controller function to create a new product
);

// Define a PUT route to update a product by ID, with request validation middleware
router.put(
  "/product/:id",
  ValidatorFactories.updateProductValidation, // Custom validation middleware function to check if request body contains required fields
  validatorRule, // Custom validation middleware function to check if there are any validation errors
  productController.updateProduct // Controller function to update an existing product
);

// Define a DELETE route to delete a product by ID, with request validation middleware
router.delete(
  "/product/:id",
  ValidatorFactories.getProductById, // Custom validation middleware function to check if product ID exists
  validatorRule, // Custom validation middleware function to check if there are any validation errors
  productController.deleteProduct // Controller function to delete an existing product
);

// Export the router as a default module
export default router;
