import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Container, Button, Form, Modal } from 'react-bootstrap';

import { BASE_URL, headers, POST } from '../../constants/api';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';

import styles from './enquire.module.scss';

const schema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    checkIn: yup.date().required('A check-in date must be selected'),
    checkOut: yup
        .date()
        .when(
            'checkIn',
            (checkIn, schema) => checkIn && schema.min(checkIn, 'The check-out date must be after the check-in day')
        )
        .required('A check-out date must be selected'),
});

function Enquire() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        history.go(0)
    };
    const handleShow = () => setShow(true);
    let { id } = useParams();
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);
        const url = BASE_URL + 'enquiries';
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
                    <Modal.Title>Your enquiry has been sent!</Modal.Title>
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
            <Container className={styles.enquire}>
                <Heading title="Enquire" className={styles.heading} />
                <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label}>Name</Form.Label>
                        <Form.Control name="name" placeholder="Enter your name" ref={register} />
                        {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
                    </Form.Group>

                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label}>Email</Form.Label>
                        <Form.Control name="email" placeholder="Example@email.com" ref={register} />
                        {errors.email && <ErrorMessage errMsg={errors.email?.message} />}
                    </Form.Group>

                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label}>Check-In date</Form.Label>
                        <Form.Control name="checkIn" type="date" ref={register} />
                        {errors.checkIn && <ErrorMessage errMsg={errors.checkIn?.message} />}
                    </Form.Group>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label}>Check-Out date</Form.Label>
                        <Form.Control name="checkOut" type="date" ref={register} />
                        {errors.checkOut && <ErrorMessage errMsg={errors.checkOut?.message} />}
                    </Form.Group>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label}>Establishment ID</Form.Label>
                        <Form.Control name="establishmentId" value={id} readOnly ref={register} />
                    </Form.Group>
                    <div className={styles.btnContainer}>
                        <Button type="submit" className={styles.btn}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default Enquire;
