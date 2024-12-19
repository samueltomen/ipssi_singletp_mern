import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function UsersTable({ users, setUsers }) {
  const [editingUser, setEditingUser] = useState(null);
  // const [users, setUsers] = useState([]);
  const columns = [
    { name: "ID", selector: (row) => row._id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button className="btn btn-primary" onClick={() => handleEdit(row)}>
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => handleDelete(row)}>
          Delete
        </button>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleEdit = (row) => {
    setEditingUser(row);
  };

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8081/users/${editingUser._id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Utilisateur modifié avec succès");
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? response.data : user,
        ),
      );
      setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (row) => {
    try {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:8081/users/${row._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error("Utilisateur supprimé avec succès");
      setUsers(users.filter((user) => user._id !== row._id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table w-50 mt-5">
      <DataTable columns={columns} data={users} pagination />
      {editingUser && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier Utilisateur</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateUser}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editingUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editingUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={editingUser.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
