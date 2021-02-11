import React, { useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { Button, Container, Image, Spinner } from 'react-bootstrap';
import { EggFried, CashStack, People } from 'react-bootstrap-icons';

import { BASE_URL, headers } from '../../constants/api';
import { Routes } from '../../constants/Routes';
import Heading from '../layout/Heading';
import Enquire from './Enquire';
import { FetchError } from '../error/FetchError';

import styles from './details.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function AccommodationDetails() {
    const [hotel, setHotel] = useState([]);
    const [status, setStatus] = useState(Status.Loading);

    let { id } = useParams();

    useEffect(() => {
        const url = BASE_URL + 'establishments/' + id;
        const options = { headers };

        fetch(url, options)
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
    }, [id]);

    return (
        <>
            <Container className={styles.container}>
                {status === Status.Error ? (
                    <FetchError message="Something went wrong while fetching the hotel" />
                ) : null}
                {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
                {status === Status.Success ? (
                    <>
                        <Heading title={hotel.name} />
                        <Container className={styles.description}>
                            <p>{hotel.description}</p>
                            <p>
                                Not sure if this is the hotel for you? Read some of the reviews left by our customers
                                down below to get a better feel of this place. If you have any questions please don't
                                hesitate to send an email to <span>{hotel.email}</span>
                            </p>
                        </Container>
                        <Container className={styles.content}>
                            <div className={styles.media}>
                                <Image src={hotel.image} className={styles.image} alt={hotel.name} />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252523.9231594416!2d5.149000744044466!3d60.36523064088785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46390d4966767d77%3A0x9e42a03eb4de0a08!2sBergen!5e0!3m2!1sno!2sno!4v1612549947990!5m2!1sno!2sno"
                                    className={styles.map}
                                    frameBorder="0"
                                    aria-hidden="false"
                                    tabIndex="0"
                                    title="Map of Bergen"
                                ></iframe>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.infoGroup}>
                                    <People className={styles.icon} />
                                    <p>Maximum guests: {hotel.maxGuests}</p>
                                </div>
                                <div className={styles.infoGroup}>
                                    <CashStack className={styles.icon} />
                                    <p>Price per night: {hotel.price}$</p>
                                </div>
                                <div className={styles.infoGroup}>
                                    <EggFried className={styles.icon} />
                                    <p>Self-catering: {hotel.selfCatering ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <Link
                                to={`${Routes.accommodation.accommodation}/${id}${Routes.accommodation.enquire}`}
                                className={styles.buttonContainer}
                            >
                                <Button className={styles.button}>Enquire</Button>
                            </Link>
                        </Container>
                        <Container className={styles.reviewContainer}>
                            <div className={styles.review}>
                                <h2>Ronald Weasley</h2>
                                <p>
                                    "My girlfriend and I had the most amazing time at {hotel.name}! The service was
                                    excellent and so are the surrundings."
                                </p>
                            </div>
                            <div className={styles.review}>
                                <h2>Tom Sawyer</h2>
                                <p>
                                    "{hotel.name} is a very special place! I thoroughly enjoyed my stay here and{' '}
                                    {hotel.price}$ per night is a bargain if you ask me. "
                                </p>
                            </div>
                            <div className={styles.review}>
                                <h2>Atticus Finch</h2>
                                <p>
                                    "My family and myself had a great time staying at {hotel.name}. 10/10 would
                                    recommend! "
                                </p>
                            </div>
                        </Container>
                    </>
                ) : null}
                <Route path={`${Routes.accommodation.accommodation}/:id${Routes.accommodation.enquire}`}>
                    <Enquire />
                </Route>
            </Container>
        </>
    );
}

export default AccommodationDetails;
