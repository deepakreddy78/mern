const Product = require("../models/product.model");
const mongoose = require("mongoose");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error message in getting all Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(401)
      .json({ success: false, message: "please provide all the fileds" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error message in creat Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "invalid id" });
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(201).json({ success: true, data: updateProduct });
  } catch (error) {
    console.error("Error message in update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "invalid id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "deleted successfully" });
  } catch (error) {
    console.error("Error message in deleting Product:", error.message);
  }
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct };
