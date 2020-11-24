import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import RestrictArea from "../../components/RestrictArea";

import { TextField, Button } from "@material-ui/core/";
const UserForm = () => {
  const token = window.localStorage.getItem("authToken");
  const userID = window.localStorage.getItem("user_id");
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório."),
    comment: yup.string().required("Campo obrigatório."),
    grade: yup.number().required("Campo obrigatório."),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
    axios
      .post(
        `https://ka-users-api.herokuapp.com/users/${userID}/feedbacks`,
        { feedback: data },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        console.log(response);
        response.request.status === 201 && history.push("/feedbacks");
      });
  };

  return (
    <div>
      <RestrictArea />

      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            autoFocus
            size="small"
            id="outlined-required"
            label="Nome: "
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
            label="Comentário: "
            name="comment"
            variant="outlined"
            margin="normal"
            inputRef={register}
            error={!!errors.comment}
            helperText={errors.comment?.message}
          />
        </div>
        <div>
          <TextField
            size="small"
            id="outlined-required"
            label="Nota: "
            name="grade"
            variant="outlined"
            margin="normal"
            inputRef={register}
            error={!!errors.grade}
            helperText={errors.grade?.message}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
