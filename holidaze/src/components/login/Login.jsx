import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import Heading from '../layout/Heading';
import { AuthContext } from '../../context/AuthContext';

import styles from './login.module.scss';

function Login() {
    const { register, handleSubmit } = useForm();
    const { registerUser } = useContext(AuthContext);

    const history = useHistory();

    function onSubmit(data) {
        console.log('data', data);
        registerUser(data.username, data.password);
        history.push('/admin/dashboard');
    }

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
                    <Heading title="Login" />
                    <p>
                        Don't have an account? <Link to="../register">Register</Link>
                    </p>
                    <div className={styles.form}>
                        <Form.Group className={styles.input}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="username" placeholder="Enter your username" ref={register} />
                        </Form.Group>

                        <Form.Group className={styles.input}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                ref={register}
                            />
                        </Form.Group>

                        <div className={styles.btnContainer}>
                            <Button type="submit" className={styles.btn}>
                                Log in
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default Login;

// import React, { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import Login from "./Logout";

// function Login() {
//     const { login } = useContext(AuthContext);

//     return <button onClick={login}>Log in</button>;
// }

// export default Login;
