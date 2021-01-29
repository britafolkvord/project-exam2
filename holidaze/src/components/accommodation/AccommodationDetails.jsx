import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, Route, useParams } from 'react-router-dom';
import { Button, Container, Image } from 'react-bootstrap';

import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';
import Enquire from './Enquire';

import styles from './details.module.scss';

function AccommodationDetails() {
    const [hotel, setHotel] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        const url = BASE_URL + 'establishments/' + id;
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                // handle error
                if (json.error) {
                    setHotel([]);
                    setError(json.message);
                } else {
                    setHotel(json);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Container className={styles.container}>
                <Heading title={hotel.name} className={styles.heading} />
                <Container className={styles.description}>
                    <p>{hotel.description}</p>
                    <p>
                        Not sure if this is the hotel for you? Read some of the reviews left by our customers down below
                        to get a better feel of this place. If you have any questions please don't hesitate to send an
                        email to <span>{hotel.email}</span>
                    </p>
                </Container>
                <Container className={styles.content}>
                    <Image src={hotel.image} className={styles.image} />
                    <div className={styles.info}>
                        <p className={styles.p}>Price : {hotel.price}$ per night</p>
                        <p className={styles.p}>Maximum guests : {hotel.maxGuests}</p>
                        <p className={styles.p}>Self Catering : {hotel.selfCatering ? 'Yes' : 'No'}</p>
                    </div>
                </Container>
                <Container className={styles.reviewContainer}>
                    <div className={styles.review}>
                        <h2>Sandra Dee</h2>
                        <p>
                            "My boyfriend and I had the most amazing time at {hotel.name}! The service was excellent and
                            so are the surrundings."
                        </p>
                    </div>
                    <div className={styles.review}>
                        <h2>Tom Sawyer</h2>
                        <p>
                            "{hotel.name} is a very special place! I thoroughly enjoyed my stay here and {hotel.price}$
                            per night is a bargain if you ask me. "
                        </p>
                    </div>
                    <div className={styles.review}>
                        <h2>Atticus Finch</h2>
                        <p>"My family and myself had a great time staying at {hotel.name}. 10/10 would recommend! "</p>
                    </div>
                </Container>
                <Link to={`/accommodation/${id}/enquire`} className={styles.buttonContainer}>
                    <Button className={styles.button}>Enquire</Button>
                </Link>
                <Route path="/accommodation/:id/enquire">
                    <Enquire />
                </Route>
                <div>{error}</div>
            </Container>
        </>
    );
}

export default AccommodationDetails;
