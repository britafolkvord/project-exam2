import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';

function Enquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = BASE_URL + 'enquiries';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.table(json);
                // handle error
                if (json.error) {
                    setEnquiries([]);
                    setError(json.message);
                } else {
                    setEnquiries(json);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    if (enquiries === []) {
        return (
            <>
                <Heading title="Enquiries" />
                {error && <div className="error">{error}</div>}
                <p>No current enquiries</p>
            </>
        );
    } else {
        return (
            <Container>
                <Heading title="Enquiries" />
                {error && <div className="error">{error}</div>}
                <Container>
                    {enquiries.map((enquiry) => {
                        return (
                            <div key={enquiry.id}>
                                <h2>Name: {enquiry.name}</h2>
                                <p>Email: {enquiry.email}</p>
                                <p>Check-in date: {enquiry.checkIn}</p>
                                <p>Check-out date: {enquiry.checkOut}</p>
                                <p>Establishment Id: {enquiry.establishmentId}</p>
                            </div>
                        );
                    })}
                </Container>
            </Container>
        );
    }
}

export default Enquiries;
