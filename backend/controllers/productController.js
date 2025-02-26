import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    const products = await sequelize.query(
      "SELECT * FROM products ORDER BY created_at DESC",
      { type: QueryTypes.SELECT }
    );

    console.log("fetched products", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await sequelize.query(
      "INSERT INTO products (name, price, image) VALUES (:name, :price, :image) RETURNING *",
      {
        replacements: { name, price, image },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sequelize.query(
      "SELECT * FROM products WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sequelize.query(
      "UPDATE products SET name = :name, price = :price, image = :image WHERE id = :id RETURNING *",
      {
        replacements: { name, price, image, id },
        type: QueryTypes.UPDATE,
      }
    );

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sequelize.query(
      "DELETE FROM products WHERE id = :id RETURNING *",
      {
        replacements: { id },
        type: QueryTypes.DELETE,
      }
    );

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};