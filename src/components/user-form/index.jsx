import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextField, Button } from "@material-ui/core/";

const UserForm = () => {
  const schema = yup.object().shape({
    user: yup.string().min(6, ""),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
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
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </div>
  );
};

export default UserForm;
