import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";

function Login() {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    function doLogout() {
        logout();
        history.push("/");
    }

    return <Button onClick={doLogout}>Log out</Button>;
}

export default Login;