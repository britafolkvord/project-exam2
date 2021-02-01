import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {Button, Form, Container} from 'react-bootstrap';

import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';

import styles from './add.module.scss';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    description: yup.string().required('A message is required'),
    price: yup.number('Price must be a number').required('Price is required'),
    maxGuests: yup.number('Max guests must be a number').required('Maximum amount of guests is required'),
    selfCatering: yup.boolean('Self-catering must be true or false').required('Input is required'),
    image: yup.string().required('Image Url is required'),
});

function AddHotel() {
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useHistory();

    async function onSubmit(data) {
        console.log('data', data);

        const url = BASE_URL + 'establishments';

        const options = { headers, method: 'POST', body: JSON.stringify(data) };

        await fetch(url, options);

        history.push('/admin/hotels');
    }

    return (
        <Container className={styles.container}>
            <Heading title="Add Hotel" />
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Form.Group className={styles.input}>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" placeholder="Enter a name for the hotel" ref={register} />
                {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
            </Form.Group>
            <Form.Group className={styles.input}>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Enter an email address" ref={register} />
                {errors.email && <ErrorMessage errMsg={errors.email?.message} />}
            </Form.Group>
            <Form.Group className={styles.input}>
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" placeholder="Enter price per night" ref={register} />
                {errors.price && <ErrorMessage errMsg={errors.price?.message} />}
            </Form.Group>
            <Form.Group className={styles.input}>
                <Form.Label>Max guests</Form.Label>
                <Form.Control name="maxGuests" placeholder="Enter maximum number of guests" ref={register} />
                {errors.maxGuests && <ErrorMessage errMsg={errors.maxGuests?.message} />}
            </Form.Group>
            <Form.Group className={styles.input}>
                <Form.Label>Self-catering</Form.Label>
                <Form.Control name="selfCatering" placeholder="Enter true or false" ref={register} />
                {errors.selfCatering && <ErrorMessage errMsg={errors.selfCatering?.message} />}
            </Form.Group>
            <Form.Group className={styles.input}>
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" placeholder="Enter a description" ref={register}  as="textarea"
                        rows={3} />
                {errors.description && <ErrorMessage errMsg={errors.description?.message} />}
            </Form.Group>
            <Form.Group className={styles.input}>
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="image" placeholder="Enter image URL" ref={register} />
                {errors.image && <ErrorMessage errMsg={errors.image?.message} />}
            </Form.Group>
            <div className={styles.btnContainer}>
            <Button type="submit" className={styles.btn}>Submit</Button>
            </div>
        </Form>
        </Container>
    );
}

export default AddHotel;
