import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "../Login";
import Users from "../../pages/users";
import Feedbacks from "../../pages/feedbacks";
import UserForm from "../user-form";
import RestrictArea from "../RestrictArea";
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
      <Route exact path="/area-restrita">
        <RestrictArea />
      </Route>
      <Route exact path="/user-form">
        <UserForm />
      </Route>
      <Route exact path="/users">
        <Users />
      </Route>
      <Route exact path="/feedbacks">
        <Feedbacks />
      </Route>
      <Route path="/">
        <Login setAuthentication={setAuthentication}></Login>
      </Route>
    </Switch>
  );
};

export default Authenticator;
