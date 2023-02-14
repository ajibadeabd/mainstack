import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import YAML from "yamljs";

import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.load("./swagger.yaml");
import productRoutes from "./routes/product";
import { databaseConnection } from "./utils/database";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 400 && err instanceof SyntaxError && "body" in err) {
    return res.status(400).send({ error: "Invalid Request body" });
  }
  next();
});

// Add middleware to serve the Swagger docs
app.get("/", (req, res) => {
  return res.send(`<h1><a href="/api-docs">check docs</a></h1`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add prifix to serve as base url
app.use("/api", productRoutes);

// Start the server
app.listen(port, async () => {
  await databaseConnection();
  console.log(`Server started on  ${port}`);
});

// Export the Express API
export default app;

// "start": "node -r dotenv/config ./dist/app/server.js",
//     "dev": "ts-node-dev  -r dotenv/config ./src/app/server.ts",
//     "prestart": "tsc",
//     "test": "jest"
