import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';

import { Routes } from '../../constants/Routes';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';

import styles from './register.module.scss';

const schema = yup.object().shape({
    username: yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function Register() {
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const history = useHistory();

    const onSubmit = (data) => {
        localStorage.setItem('username', data.username);
        localStorage.setItem('password', data.password);
        history.push(Routes.login);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.register}>
                <Heading title="Register" />
                <p>
                    Already have an account? <Link to={Routes.login}>Log in</Link>
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
                            Register
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
}
export default Register;
