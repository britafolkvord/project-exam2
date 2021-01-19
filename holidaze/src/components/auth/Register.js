import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/AuthContext";
import Heading from "../layout/Heading";
import { Container } from "react-bootstrap";

function Register() {
    const { register, handleSubmit } = useForm();
    const { registerUser } = useContext(AuthContext);

    const history = useHistory();

    function onSubmit(data) {
        console.log("data", data);
        registerUser(data.username, data.password);
        history.push("/admin");
    }

    return (
        <Container className="login">
            <Heading title="Register" />
            <p>Already have an account? <Link to="/Login">Log in</Link></p>
        <Form onSubmit={handleSubmit(onSubmit)} className="login__form">
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" placeholder="Enter your username" ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" placeholder="Enter your password" ref={register} />
            </Form.Group>

            <div className="login__form--button">
             <Button type="submit" className="login__button">Submit</Button>
            </div>
        </Form>
        </Container>
    );
}
export default Register;