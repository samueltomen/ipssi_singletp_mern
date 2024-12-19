const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
  Login,
} = require("./Controllers/UserController");

router.get("/users", getAllUsers);
router.post("/users", registerUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/login", Login);

const authMiddleware = require("./Middlewares/Middleware");
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByUserId,
} = require("./Controllers/ProductController");

router.get("/products", getProducts);

router.post("/products", authMiddleware, createProduct);

router.get("/products/user/:userId", authMiddleware, getProductByUserId);

router.patch("/products/:productId", authMiddleware, updateProduct);

router.delete("/products/:productId", authMiddleware, deleteProduct);
module.exports = router;
