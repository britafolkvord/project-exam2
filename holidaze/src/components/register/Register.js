import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

import { AuthContext } from '../../context/AuthContext';
import Heading from '../layout/Heading';

import styles from './register.module.scss';

function Register() {
    const { register, handleSubmit } = useForm();
    const { registerUser } = useContext(AuthContext);

    const history = useHistory();

    function onSubmit(data) {
        console.log('data', data);
        registerUser(data.username, data.password);
        history.push('/admin/dashboard');
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.register}>
                <Heading title="Register" />
                <p>
                    Already have an account? <Link to="../login">Log in</Link>
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
                            Register
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
}
export default Register;
