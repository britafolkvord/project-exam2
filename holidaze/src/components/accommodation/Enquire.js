import React, { useState } from 'react';
import { BASE_URL, headers, POST } from '../../constants/api';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';
import { Container, Button, Form, Modal } from 'react-bootstrap';

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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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
            <Container className="contact">
                <Heading title="Enquire" />
                <Form onSubmit={handleSubmit(onSubmit)} className="contact__form">
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
                        <Form.Label>Check-In date</Form.Label>
                        <Form.Control name="checkIn" type="date" ref={register} />
                        {errors.checkIn && <ErrorMessage errMsg={errors.checkIn?.message} />}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Check-Out date</Form.Label>
                        <Form.Control name="checkOut" type="date" ref={register} />
                        {errors.checkOut && <ErrorMessage errMsg={errors.checkOut?.message} />}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Establishment ID</Form.Label>
                        <Form.Control name="establishmentId" value={id} readOnly ref={register} />
                    </Form.Group>
                    <div className="contact__form--button">
                        <Button type="submit" className="contact__button">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default Enquire;
