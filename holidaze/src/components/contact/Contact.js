import React, { useState } from 'react';
import { BASE_URL, headers, POST } from '../../constants/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import styles from './contact.module.scss';

const schema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    message: yup.string().min(10, 'The message must be at least 10 characters').required('A message is required'),
});

export default function Contact() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        //console.log(data);
        const url = BASE_URL + 'contacts';
        const options = { headers, method: POST };
        options.body = JSON.stringify(data);

        fetch(url, options)
            .then((r) => r.json())
            .then((j) => console.log(j));

        handleShow();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
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
            <Container className={styles.contact}>
                <Heading title="Contact" />
                <Form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Enter your name" ref={register} />
                        {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" placeholder="Example@email.com" ref={register} />
                        {errors.email && <ErrorMessage errMsg={errors.email?.message} />}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            name="message"
                            placeholder="Type your message here"
                            as="textarea"
                            rows={5}
                            ref={register}
                        />
                        {errors.message && <ErrorMessage errMsg={errors.message?.message} />}
                    </Form.Group>
                    <div className={styles.contactFormBtn}>
                        <Button type="submit" className={styles.submitBtn}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}
