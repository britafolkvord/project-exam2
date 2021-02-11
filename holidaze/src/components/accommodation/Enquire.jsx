import React, { useCallback, useState } from 'react';
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
    checkIn: yup
        .date()
        .typeError('Check-in must be of type date')
        .min(new Date(), 'Check-in date must be at a later date than today')
        .required('A check-in date must be selected'),
    checkOut: yup
        .date()
        .typeError('Check-out must be of type date')
        .when(
            'checkIn',
            (checkIn, schema) => checkIn && schema.min(checkIn, 'The check-out date must be after the check-in date')
        )
        .required('A check-out date must be selected'),
});

function Enquire() {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
        history.go(0);
    };
    const handleShow = () => setShowModal(true);
    let { id } = useParams();
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const ref = useCallback((element) => {
        if (element) {
            window.scrollTo({ top: element.offsetTop });
        }
    }, []);

    const onSubmit = (data) => {
        const url = BASE_URL + 'enquiries';
        const options = { headers, method: POST };
        options.body = JSON.stringify(data);

        fetch(url, options).then((r) => r.json());
        handleShow();
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
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
            <Container ref={ref} className={styles.enquire}>
                <Heading title="Enquire" />
                <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label} htmlFor="name">
                            Name
                        </Form.Label>
                        <Form.Control name="name" aria-label="name" placeholder="Enter your name" ref={register} />
                        {errors.name && <ErrorMessage errMsg={errors.name.message} />}
                    </Form.Group>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label} htmlFor="email">
                            Email
                        </Form.Label>
                        <Form.Control name="email" aria-label="email" placeholder="Example@email.com" ref={register} />
                        {errors.email && <ErrorMessage errMsg={errors.email.message} />}
                    </Form.Group>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label} htmlFor="checkIn">
                            Check-in date
                        </Form.Label>
                        <Form.Control name="checkIn" aria-label="checkIn" type="date" ref={register} />
                        {errors.checkIn && <ErrorMessage errMsg={errors.checkIn.message} />}
                    </Form.Group>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label} htmlFor="checkOut">
                            Check-out date
                        </Form.Label>
                        <Form.Control name="checkOut" aria-label="checkOut" type="date" ref={register} />
                        {errors.checkOut && <ErrorMessage errMsg={errors.checkOut.message} />}
                    </Form.Group>
                    <Form.Group className={styles.input}>
                        <Form.Label className={styles.label} htmlFor="establishmentId">
                            Establishment ID
                        </Form.Label>
                        <Form.Control
                            name="establishmentId"
                            aria-label="establishmentId"
                            value={id}
                            readOnly
                            ref={register}
                        />
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
