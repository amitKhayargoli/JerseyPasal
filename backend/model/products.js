import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";

const SAMPLE_PRODUCTS = [
 
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sequelize.query("TRUNCATE TABLE products RESTART IDENTITY", { type: QueryTypes.RAW });

    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sequelize.query(
        "INSERT INTO products (name, price, image) VALUES (:name, :price, :image)",
        {
          replacements: { name: product.name, price: product.price, image: product.image },
          type: QueryTypes.INSERT,
        }
      );
    }

    console.log("Database seeded successfully");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // failure code
  }
}

seedDatabase();