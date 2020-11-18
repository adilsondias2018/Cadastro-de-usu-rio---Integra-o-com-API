import "./App.css";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import UserForm from "./components/user-form";
import RestrictArea from "./components/RestrictArea";

function App() {
  const [authenticated, setAuthenticated] = useState(undefined);

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/cadastro">
            <UserForm />
          </Route>
          <Route exact path="/area-restrita">
            <RestrictArea />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
