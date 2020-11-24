import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
const Users = () => {
  const token = window.localStorage.getItem("authToken");

  const [users, setUsers] = useState([]);

  const rows = users.map((usr) => {
    return { id: usr.id, user: usr.user, name: usr.name, email: usr.email };
  });

  const getUsers = () => {
    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then((response) => setUsers(response.data));
  };

  useEffect(getUsers);

  console.log(rows);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          { field: "id" },
          { field: "user", flex: 1 },
          { field: "name", flex: 1 },
          { field: "email", flex: 1 },
        ]}
        pageSize={10}
      />
    </div>
  );
};

export default Users;
