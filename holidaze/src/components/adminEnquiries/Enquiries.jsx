import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { isEmpty, prettyDate } from '../../utils';
import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';

import styles from './enquiries.module.scss';

function Enquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    if (isEmpty(enquiries)) {
        return (
            <>
                <Heading title="Enquiries" />
                <p>No current enquiries</p>
            </>
        );
    } else {
        return (
            <Container className={styles.container}>
                <Heading title="Enquiries" />
                {error && <div>{error}</div>}
                {loading ? (
                    <Spinner animation="border" className="spinner" />
                ) : (
                    <Container className={styles.enquiriesContainer}>
                    {enquiries.map((enquiry) => {
                        return (
                            <div key={enquiry.id} className={styles.enquiries}>
                                <h2 className={styles.name}>{enquiry.name}</h2>
                                <p><span>Email :</span> {enquiry.email}</p>
                                <p><span>Check-in date :</span> {prettyDate(enquiry.checkIn)}</p>
                                <p><span>Check-out date :</span> {prettyDate(enquiry.checkOut)}</p>
                                <p><span>Establishment Id :</span> {enquiry.establishmentId}</p>
                            </div>
                        );
                    })}
                </Container>
                )}
            </Container>
        );
    }
}

export default Enquiries;
