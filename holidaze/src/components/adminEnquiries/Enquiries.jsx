import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { isEmpty, prettyDate } from '../../utils';
import { BASE_URL, headers } from '../../constants/api';
import SubHeading from '../layout/SubHeading';
import DeleteEnquiry from '../deleteEnquiry/DeleteEnquiry';

import styles from './enquiries.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function Enquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [status, setStatus] = useState(Status.Loading);
    const history = useHistory();

    useEffect(() => {
        const url = BASE_URL + 'enquiries';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                // Handle error in .catch()
                if (json.error) {
                    throw new Error('Error fetching enquiries');
                } else {
                    setEnquiries(json);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
    }, []);

    return (
        <Container className={styles.container}>
            <SubHeading title="Enquiries" />
            <Container className={styles.enquiriesContainer}>
                {status === Status.Error ? (
                    <p className={styles.errorMessage}>
                        Something went wrong while fetching enquiries.{' '}
                        <button onClick={() => history.go(0)} className={styles.reload}>
                            Try again!
                        </button>
                    </p>
                ) : null}

                {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}

                {status === Status.Success && isEmpty(enquiries) ? <p>No current enquiries.</p> : null}

                {status === Status.Success && !isEmpty(enquiries) ? (
                    <>
                        {enquiries.map((enquiry) => {
                            return (
                                <div key={enquiry.id} className={styles.enquiries}>
                                    <h2 className={styles.name}>{enquiry.name}</h2>
                                    <p>
                                        <span>Email :</span> {enquiry.email}
                                    </p>
                                    <p>
                                        <span>Check-in date :</span> {prettyDate(enquiry.checkIn)}
                                    </p>
                                    <p>
                                        <span>Check-out date :</span> {prettyDate(enquiry.checkOut)}
                                    </p>
                                    <p>
                                        <span>Establishment Id :</span> {enquiry.establishmentId}
                                    </p>
                                    <div className={styles.deleteBtn}>
                                        <DeleteEnquiry id={enquiry.id} />
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : null}
            </Container>
        </Container>
    );
}

export default Enquiries;
