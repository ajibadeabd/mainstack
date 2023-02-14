import mongoose from "mongoose";
const databaseUrl =
  process.env.MONGO_URI || "mongodb://localhost:27017/my-ecommerce-api";

export const databaseConnection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(databaseUrl)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => console.log(error));
};
