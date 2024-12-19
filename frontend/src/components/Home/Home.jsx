import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Product from "../Product/Product.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";

export default function Home() {
  const API_URL = "http://127.0.0.1:8081";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    author: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        setLoading(true);
        const response = await axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
        setFilteredProducts(productsData);
        const uniqueCategories = [
          ...new Set(productsData.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        toast.error("Erreur lors du chargement des produits");
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${API_URL}/products`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newProductData = response.data;
      setProducts((prevProducts) => [...prevProducts, newProductData]);
      setFilteredProducts((prevFiltered) => [...prevFiltered, newProductData]);

      // Ajouter une catégorie si elle est nouvelle
      if (!categories.includes(newProductData.category)) {
        setCategories((prevCategories) => [
          ...prevCategories,
          newProductData.category,
        ]);
      }

      setShowModal(false);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        author: "",
      });
      toast.success("Produit ajouté avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p,
      ),
    );
    setFilteredProducts((prevFiltered) =>
      prevFiltered.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p,
      ),
    );
  };

  const handleProductDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== productId),
    );
    setFilteredProducts((prevFiltered) =>
      prevFiltered.filter((p) => p._id !== productId),
    );
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4">LE BON TUYAUX</h1>
        <p className="lead">Bienvenue sur Le Bon Tuyaux</p>
      </div>

      {/* Filtres et bouton d'ajout */}
      <div className="row mb-4">
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {isLogged && (
          <div className="col-md-6 text-end">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Ajouter un produit
            </button>
          </div>
        )}
      </div>

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4">
              <Product
                product={product}
                onProductUpdate={handleProductUpdate}
                onProductDelete={handleProductDelete}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-info" role="alert">
              Aucun produit trouvé
            </div>
          </div>
        )}
      </div>

      {/* Modal d'ajout de produit */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un produit</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Prix</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Catégorie</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
