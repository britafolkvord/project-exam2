import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { BASE_URL, headers } from '../../constants/api';
import Hotel from '../hotels/hotel';
import Heading from '../layout/Heading';
import { isEmpty } from '../../utils';

import styles from './hotels.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [status, setStatus] = useState(Status.Loading);
    const history = useHistory();

    useEffect(() => {
        const url = BASE_URL + 'establishments';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                // handle error in catch()
                if (json.error) {
                    throw new Error('Error fetching enquiries');
                } else {
                    setHotels(json);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
    }, []);

    return (
        <>
            <Container className={styles.container}>
                <Heading title="Hotels" />
                {status === Status.Error ? (
                    <p>
                        Something went wrong while fetching the hotel.
                        <button onClick={() => history.go(0)} className={styles.reload}>
                            Try again!
                        </button>
                    </p>
                ) : null}
                {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
                {status === Status.Success && isEmpty(hotels) ? <p>There are currently no hotels listed.</p> : null}

                {status === Status.Success && !isEmpty(hotels) ? (
                    <Container className={styles.hotels}>
                        {hotels.map((hotel) => {
                            return (
                                <Hotel
                                    key={hotel.id}
                                    name={hotel.name}
                                    image={hotel.image}
                                    maxGuests={hotel.maxGuests}
                                    price={hotel.price}
                                    selfCatering={hotel.selfCatering ? 'Yes' : 'No'}
                                    path={`/admin/hotels/edit/${hotel.id}`}
                                    buttonText={'Edit hotel'}
                                />
                            );
                        })}
                    </Container>
                ) : null}
            </Container>
        </>
    );
}

export default Hotels;
