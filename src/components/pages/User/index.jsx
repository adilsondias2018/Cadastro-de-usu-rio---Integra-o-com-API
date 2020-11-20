import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core/";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const User = () => {
  const handledata = (data) => {
    console.log(data);
    axios
      .GET("https://ka-users-api.herokuapp.com/users")
      .then((response) => {
        response.json();
      })
      .then((response) => {
        return response;
      });
  };
  return (
    <>
      <div>
        <h2> </h2>
      </div>
    </>
  );
};

export default User;
