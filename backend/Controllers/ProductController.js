const Product = require("../Models/ProductModel");

const createProduct = async (req, res) => {
  const authorId = req.user.id;
  try {
    const product = new Product({
      ...req.body,
      author: authorId,
    });
    if (!product) {
      return res.status(400).send("Merci de remplir tous les champs");
    }
    await product.save();
    const populatedProduct = await Product.findById(product._id).populate(
      "author",
      "username email",
    );
    res.status(201).send(populatedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }
    if (req.query.description) {
      filter.description = { $regex: req.query.description, $options: "i" };
    }

    const products = await Product.find(filter).populate(
      "author",
      "username email",
    );

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      },
    );
    if (!product) {
      return res.status(404).send({ error: "Produit introuvable" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductByUserId = async (req, res) => {
  try {
    const product = await Product.find({ author: req.params.userId }).populate(
      "author",
      "username email",
    );
    if (!product) {
      return res.status(404).send({ error: "Produit introuvable" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).send({ error: "Produit introuvable" });
    }
    res.status(200).send({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  getProductByUserId,
  deleteProduct,
};
