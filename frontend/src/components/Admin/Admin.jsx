import Register from "../Authentification/Register.jsx";
import UsersTable from "./UsersTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8081/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className={"mt-5"}>Gestion des utilisateurs</h1>
      <p className="mb-5"></p>
      <Register setUsers={setUsers} />
      <UsersTable users={users} setUsers={setUsers} />
    </div>
  );
}
