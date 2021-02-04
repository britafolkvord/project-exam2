import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { BASE_URL, headers } from '../../constants/api';
import Hotel from '../hotels/hotel';
import Heading from '../layout/Heading';

import styles from './hotels.module.scss';

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = BASE_URL + 'establishments';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.table(json);
                // handle error
                if (json.error) {
                    setHotels([]);
                    setError(json.message);
                } else {
                    setHotels(json);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Container className={styles.container}>
                <Heading title="Hotels" />
                {error && <div>{error}</div>}

                <Container className={styles.hotels}>
                    {hotels.map((hotel) => {
                        return (
                            <Hotel
                                name={hotel.name}
                                image={hotel.image}
                                description={hotel.description}
                                path={`/admin/hotels/edit/${hotel.id}`}
                                buttonText={'Edit hotel'}
                            />
                        );
                    })}
                </Container>
            </Container>
        </>
    );
}

export default Hotels;
