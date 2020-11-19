import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { TextField, Button } from "@material-ui/core/";

const UserForm = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    user: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo obrigatório."),
    name: yup.string().required("Campo obrigatório."),
    email: yup
      .string()
      .email("Insira um email válido.")
      .required("Campo obrigatório."),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário ao menos um caracter especial."
      )
      .required("Campo obrigatório."),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não são iguais")
      .required("Campo obrigatório."),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
    axios
      .post("https://ka-users-api.herokuapp.com/users", { user: data })
      .then((response) => {
        console.log(response);
        response.request.status === 201 && history.push("/");
      });
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
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
          label="Nome Completo: "
          name="name"
          variant="outlined"
          margin="normal"
          inputRef={register}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </div>
      <div>
        <TextField
          size="small"
          id="outlined-required"
          label="Email: "
          name="email"
          variant="outlined"
          margin="normal"
          inputRef={register}
          error={!!errors.email}
          helperText={errors.email?.message}
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
      <div>
        <TextField
          size="small"
          id="outlined-required"
          label="Confirmar Senha: "
          name="password_confirmation"
          variant="outlined"
          margin="normal"
          inputRef={register}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation?.message}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Cadastrar
      </Button>
    </form>
  );
};

export default UserForm;
