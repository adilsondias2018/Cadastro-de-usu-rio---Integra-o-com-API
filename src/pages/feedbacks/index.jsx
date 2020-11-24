import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
const Feedbacks = () => {
  const token = window.localStorage.getItem("authToken");
  const userID = window.localStorage.getItem("user_id");

  const [feedbacks, setFeedbacks] = useState([]);

  const rows = feedbacks.map((feedback) => {
    return {
      id: feedback.id,
      name: feedback.name,
      comment: feedback.comment,
      grade: feedback.grade,
    };
  });

  const getFeedbacks = () => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${userID}/feedbacks`, {
        headers: { Authorization: token },
      })
      .then((response) => setFeedbacks(response.data));
  };

  useEffect(getFeedbacks, []);

  console.log(rows);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          { field: "id" },
          { field: "name", flex: 1 },
          { field: "comment", flex: 1 },
          { field: "grade", flex: 1 },
        ]}
        pageSize={10}
      />
    </div>
  );
};

export default Feedbacks;
