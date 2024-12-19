import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";

export default function Product({ product, onProductUpdate, onProductDelete }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const API_URL = "http://127.0.0.1:8081";
  const { isLogged } = useContext(AuthContext);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_URL}/products/${product._id}`,
        editedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      onProductUpdate(response.data);
      setIsEditing(false);
      toast.success("Produit mis à jour avec succès!");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour du produit");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/products/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      setShowDetailsModal(false);
      onProductDelete(product._id);
      toast.success("Produit supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression du produit");
    }
  };

  return (
    <>
      <div className="card mb-3 shadow-sm" style={{ maxWidth: "300px" }}>
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
          <p className="card-text">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">{product.price}€</span>
            <small className="text-muted">
              Auteur : {product.author.email}
            </small>
          </div>
          <button
            className="btn btn-primary mt-2 w-100"
            onClick={() => setShowDetailsModal(true)}
          >
            Voir plus
          </button>
        </div>
      </div>

      <div
        className={`modal ${showDetailsModal ? "show" : ""}`}
        style={{ display: showDetailsModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditing ? "Modifier le produit" : "Détails du produit"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowDetailsModal(false);
                  setIsEditing(false);
                  setEditedProduct(product);
                }}
              ></button>
            </div>
            <div className="modal-body">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedProduct.title}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedProduct.category}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              ) : (
                // Affichage des détails
                <>
                  <h4>{product.title}</h4>
                  <p className="text-muted">{product.category}</p>
                  <p>{product.description}</p>
                  <p className="fw-bold">Prix : {product.price}€</p>
                  <p className="text-muted">Auteur : {product.author.email}</p>
                </>
              )}
            </div>
            {isLogged && (
              <div className="modal-footer">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedProduct(product);
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdate}
                    >
                      Sauvegarder
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Supprimer
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Modifier
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`modal ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmer la suppression</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              Êtes-vous sûr de vouloir supprimer ce produit ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      {(showDetailsModal || showDeleteModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </>
  );
}
