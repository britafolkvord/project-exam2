import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';


export default function FilterHotels({ handleSearch }) {
    return (
        <Form>
        <Form.Group>
            <Form.Label>Number of guests</Form.Label>
            <Form.Control type="number" id="guests" onChange={(event) => handleSearch(event)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Max price per night</Form.Label>
            <Form.Control  id="price" type="number" onChange={(event) => handleSearch(event)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Self-catering</Form.Label>
            <Form.Check  id="true" value={true} inline label="Yes" onChange={(event) => handleSearch(event)} />
            <Form.Check  id="false" value={false} inline label="No" onChange={(event) => handleSearch(event)} />
        </Form.Group>
        </Form>
    );
}

FilterHotels.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};