import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./components/Login";
import UserForm from "./components/user-form";
import RestrictArea from "./components/RestrictArea";
import Axios from "axios";

const Authenticator = () => {
  const [isAuthenticated, setAuthentication] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");

    if (!token) {
      setAuthentication(false);
    }

    Axios.get("https://ka-users-api.herokuapp.com/users", {
      headers: { Authorization: token },
    })
      .then(() => {
        setAuthentication(true);
        history.push("/area-restrita");
      })
      .catch(() => {
        setAuthentication(false);
      });
  }, [history, setAuthentication]);

  if (isAuthenticated === undefined) {
    return <div>Loading ...</div>;
  }
  if (isAuthenticated === false) {
    <Switch>
      <Route path="/">
        <Login setAuthentication={setAuthentication}></Login>
      </Route>
    </Switch>;
  }

  return (
    <Switch>
      <Route path="/">
        <Login setAuthentication={setAuthentication}></Login>
      </Route>
      <Route exact path="/area-restrita">
        <RestrictArea />
      </Route>
    </Switch>
  );
};

export default Authenticator;
