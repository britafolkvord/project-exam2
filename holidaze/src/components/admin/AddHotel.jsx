import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';

import { BASE_URL, headers } from '../../constants/api';
import { Routes } from '../../constants/Routes';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';

import styles from './add.module.scss';

const schema = yup.object().shape({
    name: yup.string().min(4, 'Name must be at least 2 characters').required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    price: yup
        .number()
        .typeError('Price must be a number')
        .min(10, 'Price must be 10$ per night or higher')
        .required('Price is required'),
    maxGuests: yup
        .number()
        .typeError('Maximum guests must be a number')
        .min(2, 'Max guest must be 2 or higher')
        .required('Maximum guests is required'),
    description: yup
        .string()
        .min(20, 'Description must contain 20 characters or more')
        .required('Description is required'),
    selfCatering: yup
        .boolean()
        .typeError('Self-catering must be either true or false')
        .required('Self-catering is required'),
    image: yup.string().required('Image url is required'),
});

function AddHotel() {
    const { register, errors, reset, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useHistory();

    const onSubmit = async (data) => {
        const url = BASE_URL + 'establishments';
        const options = { headers, method: 'POST', body: JSON.stringify(data) };
        await fetch(url, options);
        history.push(Routes.admin.hotels.hotels);
    };

    return (
        <Container className={styles.container}>
            <Heading title="Add Hotel" />
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset} className={styles.form}>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="name">
                        Name
                    </Form.Label>
                    <Form.Control
                        name="name"
                        aria-label="name"
                        placeholder="Enter a name for the hotel"
                        ref={register}
                    />
                    {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="email">
                        Email
                    </Form.Label>
                    <Form.Control name="email" aria-label="email" placeholder="Enter an email address" ref={register} />
                    {errors.email && <ErrorMessage errMsg={errors.email?.message} />}
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="price">
                        Price
                    </Form.Label>
                    <Form.Control name="price" aria-label="price" placeholder="Enter price per night" ref={register} />
                    {errors.price && <ErrorMessage errMsg={errors.price?.message} />}
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="maxGuests">
                        Max guests
                    </Form.Label>
                    <Form.Control
                        name="maxGuests"
                        aria-label="maxGuests"
                        placeholder="Enter maximum number of guests"
                        ref={register}
                    />
                    {errors.maxGuests && <ErrorMessage errMsg={errors.maxGuests?.message} />}
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="selfCatering">
                        Self-catering
                    </Form.Label>
                    <Form.Control
                        name="selfCatering"
                        aria-label="selfCatering"
                        placeholder="Enter true or false"
                        ref={register}
                    />
                    {errors.selfCatering && <ErrorMessage errMsg={errors.selfCatering?.message} />}
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="description">
                        Description
                    </Form.Label>
                    <Form.Control
                        name="description"
                        aria-label="description"
                        placeholder="Enter a description"
                        ref={register}
                        as="textarea"
                        rows={3}
                    />
                    {errors.description && <ErrorMessage errMsg={errors.description?.message} />}
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label} htmlFor="image">
                        Image URL
                    </Form.Label>
                    <Form.Control name="image" aria-label="image" placeholder="Enter image URL" ref={register} />
                    {errors.image && <ErrorMessage errMsg={errors.image?.message} />}
                </Form.Group>
                <div className={styles.btnContainer}>
                    <Button type="reset" className={styles.reset}>
                        Reset
                    </Button>
                    <Button type="submit" className={styles.btn}>
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default AddHotel;
