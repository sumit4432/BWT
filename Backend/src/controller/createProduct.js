const slugify = require("slugify");
const products = require("../models/productSchema");

// ******************CreateProduct********************

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      images,
      countryOrigin,
      color,
      packageType,
      size,
      minimum,
      short_des,
      berief_des,
      price,
      category,
    } = req.body;

    const product = new Product({
      name,
      slug: slugify(name),
      countryOrigin,
      packageType,
      color,
      size,
      minimum,
      short_des,
      berief_des,
      price,
      category,
    });
    await product.save();
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// **************************ReadBy Id product **********************

exports.getAllProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await products.findById(id);
    res.status(200).json({ Product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ****************************UpadteProduct by Id **************************

exports.updateProductbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await products.findByIdAndUpdate(
      id,
      {
        name,
        short_des,
        price,
        countryOrigin,
        Minimum,
        Size,
        packagetype,
        Color,
      },
      {
        new: true,
        useFindAndModified: false,
      }
    );
    if (!user) {
      return res.status(500).json({ message: `user not found ${id}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// ************************DeleteProduct By ID ****************************

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteById = await products.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Sorry u cant delet product" });
  }
};
