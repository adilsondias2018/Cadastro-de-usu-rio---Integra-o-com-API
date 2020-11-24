import React from "react";
import { useHistory } from "react-router-dom";
// import Authenticator from "../Authenticator";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const RestrictArea = () => {
  const history = useHistory();

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs variant="fullWidth" aria-label="simple tabs example">
          <Tab
            value={0}
            label="Users"
            onClick={() => {
              history.push("/users");
            }}
          />
          <Tab
            value={1}
            label="Feedbacks"
            onClick={() => {
              history.push("/feedbacks");
            }}
          />
          <Tab
            value={2}
            label="Create new feedback"
            onClick={() => {
              history.push("/newfeedback");
            }}
          />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default RestrictArea;
