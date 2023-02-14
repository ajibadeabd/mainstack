import { body, param, query, validationResult } from "express-validator";

export const validatorRule = (req: any, res: any, next: any) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};

class ValidatorFactory {
  private price = body("price")
    .isNumeric()
    .withMessage("Provide a valid Price");
  private name = body("name").isString().withMessage("Provide a valid name");
  private id = param("id")
    .isMongoId()
    .withMessage("Provide a valid product id");
  private description = body("description")
    .isString()
    .withMessage("Provide a valid description");
  createProductValidation = [this.name, this.description, this.price];

  getProductById = [this.id];
  updateProductValidation = [
    this.id,
    this.name.optional(),
    this.description.optional(),
    this.price.optional(),
  ];
}
export const ValidatorFactories = new ValidatorFactory();
