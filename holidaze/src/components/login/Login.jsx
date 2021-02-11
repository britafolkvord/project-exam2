import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Container, Modal, Button, Form } from 'react-bootstrap';

import Heading from '../layout/Heading';
import { Routes } from '../../constants/Routes';
import { AuthContext } from '../../context/AuthContext';
import ErrorMessage from '../error/ErrorMessage';

import styles from './login.module.scss';

const schema = yup.object().shape({
    username: yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function Login() {
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const { loginUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const history = useHistory();

    const onSubmit = (data) => {
        const user = localStorage.getItem('username');
        const userPassword = localStorage.getItem('password');
        if (user === data.username && userPassword === data.password) {
            loginUser(data.username, data.password);
            history.push(Routes.admin.dashboard);
        } else {
            handleShow();
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Something's not right</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Check to see if you've entered the right username and password. If you don't have an account you can
                    go here to <Link to={Routes.register}>register</Link>.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
                    <Heading title="Login" />
                    <p>
                        Don't have an account? <Link to={Routes.register}>Register</Link>
                    </p>
                    <div className={styles.form}>
                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label}>Username</Form.Label>
                            <Form.Control
                                name="username"
                                aria-label="username"
                                placeholder="Enter your username"
                                ref={register}
                            />
                            {errors.username && <ErrorMessage errMsg={errors.username?.message} />}
                        </Form.Group>

                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label}>Password</Form.Label>
                            <Form.Control
                                name="password"
                                aria-label="password"
                                type={passwordShown ? 'text' : 'password'}
                                placeholder="Enter your password"
                                ref={register}
                            />
                            {errors.password && <ErrorMessage errMsg={errors.password?.message} />}
                            <div className={styles.passwordVisibility}>
                                <Button onClick={togglePasswordVisiblity} tabIndex={0} className={styles.showPassword}>
                                    {passwordShown ? 'Hide password' : 'Show password'}
                                </Button>
                            </div>
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
