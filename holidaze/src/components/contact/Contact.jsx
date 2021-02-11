import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Button, Form, Modal } from 'react-bootstrap';

import { BASE_URL, headers, POST } from '../../constants/api';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';

import styles from './contact.module.scss';

const schema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    message: yup.string().min(10, 'The message must be at least 10 characters').required('A message is required'),
});

export default function Contact() {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
        history.go(0);
    };
    const handleShow = () => setShowModal(true);
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const url = BASE_URL + 'contacts';
        const options = { headers, method: POST };
        options.body = JSON.stringify(data);

        fetch(url, options).then((r) => r.json());

        handleShow();
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your message has been sent!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We will get back to you shortly so keep an eye out for a message from us in your inbox
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container className={styles.contact} fluid>
                <div className={styles.column}>
                    <Heading title="Have any questions?" />
                    <p className={styles.contactInfo}>
                        We would love for you to get in touch with us! Please fill out the form below and we will be
                        sure to get back to you with a reply shortly.
                    </p>
                    <Form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                        <Form.Group>
                            <Form.Label className={styles.label} htmlFor="name">
                                Name
                            </Form.Label>
                            <Form.Control name="name" aria-label="name" placeholder="Enter your name" ref={register} />
                            {errors.name && <ErrorMessage errMsg={errors.name.message} />}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label} htmlFor="email">
                                Email
                            </Form.Label>
                            <Form.Control
                                name="email"
                                aria-label="email"
                                placeholder="Example@email.com"
                                ref={register}
                            />
                            {errors.email && <ErrorMessage errMsg={errors.email.message} />}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className={styles.label} htmlFor="message">
                                Message
                            </Form.Label>
                            <Form.Control
                                name="message"
                                aria-label="message"
                                placeholder="Type your message here"
                                as="textarea"
                                rows={5}
                                ref={register}
                            />
                            {errors.message && <ErrorMessage errMsg={errors.message.message} />}
                        </Form.Group>
                        <div className={styles.contactFormBtn}>
                            <Button type="submit" className={styles.submitBtn}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}
