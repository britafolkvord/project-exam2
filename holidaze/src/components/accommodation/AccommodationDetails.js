import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, Route, useParams } from 'react-router-dom';
import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';
import { Button, Container, Image } from 'react-bootstrap';
import styles from './details.module.scss';
import Enquire from './Enquire';

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
                <Container className={styles.content}>
                    <Image src={hotel.image} className={styles.image} />
                    <div className={styles.info}>
                        <p className={styles.p}>Price : {hotel.price}</p>
                        <p className={styles.p}>Maximum guests : {hotel.maxGuests}</p>
                        <p className={styles.p}>Self Catering : {hotel.selfCatering ? 'Yes' : 'No'}</p>
                        <p className={styles.p}>Email : {hotel.email}</p>
                        <p className={styles.p}>Description : {hotel.description}</p>
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
