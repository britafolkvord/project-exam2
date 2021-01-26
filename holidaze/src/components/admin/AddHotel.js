import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL, headers } from '../../constants/api';

function AddHotel() {
    const { register, handleSubmit } = useForm();

    const history = useHistory();

    async function onSubmit(data) {
        console.log('data', data);

        const url = BASE_URL + 'establishments';

        const options = { headers, method: 'POST', body: JSON.stringify(data) };

        await fetch(url, options);

        history.push('/admin/hotels');
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add Hotel</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" placeholder="Enter a name for the hotel" ref={register} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Enter an email address" ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" placeholder="Enter price per night" ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Max guests</Form.Label>
                <Form.Control name="maxGuests" placeholder="Enter maximum number of guests" ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Self-catering</Form.Label>
                <Form.Control name="selfCatering" placeholder="Enter true or false" ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" placeholder="Enter a description" ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="image" placeholder="Enter image URL" ref={register} />
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default AddHotel;
