import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return logout();
};

export default Logout;
