import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { TextField, Button } from "@material-ui/core/";

const Login = (props) => {
  const history = useHistory();

  const schema = yup.object().shape({
    user: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo obrigatório."),

    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário ao menos um caracter especial."
      )
      .required("Campo obrigatório."),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log(data);
    axios
      .post("https://ka-users-api.herokuapp.com/authenticate", { ...data })
      .then((response) => {
        console.log(response);
        window.localStorage.setItem("authToken", response.data.auth_token);
        window.localStorage.setItem("user_id", response.data.user.id);
        props.setAuthentication(true);

        history.push("/area-restrita");
      })
      .catch((err) => console.log(err.response));

    // setRef("password", {
    //   message: err.response.data.error.user_authentication, })
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div>
        <TextField
          autoFocus
          size="small"
          id="outlined-required"
          label="Usuário: "
          name="user"
          variant="outlined"
          margin="normal"
          inputRef={register}
          error={!!errors.user}
          helperText={errors.user?.message}
        />
      </div>

      <div>
        <TextField
          size="small"
          id="outlined-required"
          label="Senha: "
          name="password"
          variant="outlined"
          margin="normal"
          inputRef={register}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        logar
      </Button>
    </form>
  );
};

export default Login;
