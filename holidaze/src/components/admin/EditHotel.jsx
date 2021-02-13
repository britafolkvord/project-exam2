import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container, Form, Spinner } from 'react-bootstrap';

import { BASE_URL, headers, PATCH } from '../../constants/api';
import { Routes } from '../../constants/Routes';
import DeleteHotel from './DeleteHotel';
import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';
import { FetchError } from '../error/FetchError';

import styles from './edit.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

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
    const defaultState = {
        name: '',
        email: '',
        price: '',
        maxGuests: '',
        selfCatering: '',
        description: '',
        image: '',
    };

    const history = useHistory();
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const [hotel, setHotel] = useState(defaultState);
    const [status, setStatus] = useState(Status.Loading);

    let { id } = useParams();

    const options = { headers };
    const fetchUrl = BASE_URL + 'establishments/' + id;

    useEffect(() => {
        fetch(fetchUrl, options)
            .then((response) => response.json())
            .then((json) => {
                // handle error in catch()
                if (json.error) {
                    throw new Error('Error fetching enquiries');
                } else {
                    setHotel(json);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (data) => {
        const updateOptions = { headers, method: PATCH, body: JSON.stringify(data) };
        await fetch(fetchUrl, updateOptions);
        history.push(Routes.admin.hotels.hotels);
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset} className={styles.form}>
                <Heading title="Edit Hotel" />
                {status === Status.Error ? (
                    <FetchError message="Something went wrong while fetching the hotel" />
                ) : null}
                {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
                {status === Status.Success ? (
                    <Container className={styles.formContent}>
                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label} htmlFor="name">
                                Name
                            </Form.Label>
                            <Form.Control
                                name="name"
                                aria-label="name"
                                defaultValue={hotel.name}
                                placeholder="Enter a name for the hotel"
                                ref={register}
                            />
                            {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
                        </Form.Group>
                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label} htmlFor="email">
                                Email
                            </Form.Label>
                            <Form.Control
                                name="email"
                                aria-label="email"
                                defaultValue={hotel.email}
                                placeholder="Enter an email address"
                                ref={register}
                            />
                            {errors.email && <ErrorMessage errMsg={errors.email?.message} />}
                        </Form.Group>
                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label} htmlFor="price">
                                Price
                            </Form.Label>
                            <Form.Control
                                name="price"
                                aria-label="price"
                                defaultValue={hotel.price}
                                placeholder="Enter price per night"
                                ref={register}
                            />
                            {errors.price && <ErrorMessage errMsg={errors.price?.message} />}
                        </Form.Group>
                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label} htmlFor="maxGuests">
                                Max guests
                            </Form.Label>
                            <Form.Control
                                name="maxGuests"
                                aria-label="maxGuests"
                                defaultValue={hotel.maxGuests}
                                placeholder="Enter the maximum number of guests"
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
                                defaultValue={hotel.selfCatering}
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
                                defaultValue={hotel.description}
                                placeholder="Enter a description for the hotel"
                                ref={register}
                                as="textarea"
                                rows={3}
                            />
                            {errors.description && <ErrorMessage errMsg={errors.description?.message} />}
                        </Form.Group>
                        <Form.Group className={styles.input}>
                            <Form.Label className={styles.label} htmlFor="image">
                                Image
                            </Form.Label>
                            <Form.Control
                                name="image"
                                aria-label="image"
                                defaultValue={hotel.image}
                                placeholder={hotel.image}
                                ref={register}
                            />
                            {errors.image && <ErrorMessage errMsg={errors.image?.message} />}
                        </Form.Group>
                        <div className={styles.btnContainer}>
                            <DeleteHotel id={id} />
                            <Button type="reset" className={styles.reset}>
                                Reset
                            </Button>
                            <Button type="submit" className={styles.btn}>
                                Update
                            </Button>
                        </div>
                    </Container>
                ) : null}
            </Form>
        </>
    );
}

export default AddHotel;
