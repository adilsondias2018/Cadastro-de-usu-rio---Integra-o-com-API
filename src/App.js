import "./App.css";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextField, Button } from "@material-ui/core/";

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
