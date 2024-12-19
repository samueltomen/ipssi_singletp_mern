import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register({ setUsers }) {
  // const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8081/users", newUser);
      if (setUsers) {
        setUsers((prevUsers) => [...prevUsers, response.data]);
      }
      setNewUser({ name: "", email: "", password: "" });
      navigate("/login");
      toast.success("Utilisateur ajouté avec succès");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-50">
      <form onSubmit={addUser}>
        <div className="form-group">
          <label htmlFor="exampleInputPseudo1">Pseudo</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPseudo1"
            aria-describedby="pseudoHelp"
            value={newUser.name}
            onChange={(event) =>
              setNewUser({ ...newUser, name: event.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Adresse email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            value={newUser.email}
            onChange={(event) =>
              setNewUser({ ...newUser, email: event.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
            value={newUser.password}
            onChange={(event) =>
              setNewUser({ ...newUser, password: event.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Créer un compte
        </button>
      </form>
    </div>
  );
}
