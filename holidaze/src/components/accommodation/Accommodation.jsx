import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { EmojiFrown } from 'react-bootstrap-icons';

import { BASE_URL, headers } from '../../constants/api';
import { Routes } from '../../constants/Routes';
import FilterHotels from '../filterHotels/FilterHotels';
import Hotel from '../hotels/hotel';
import Heading from '../layout/Heading';
import { isEmpty } from '../../utils';
import { FetchError } from '../error/FetchError';

import styles from './accommodation.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function Accommodation() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [selfCatering, setSelfCatering] = useState(null);
    const [maxPrice, setMaxPrice] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [status, setStatus] = useState(Status.Loading);

    useEffect(() => {
        const url = BASE_URL + 'establishments';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                // Handle error in .catch()
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

    const filterHotels = useEffect(() => {
        const filtered = hotels
            .filter((hotel) => {
                if (maxPrice) {
                    return hotel.price <= Number(maxPrice);
                }

                return true;
            })
            .filter((hotel) => {
                if (maxGuests) {
                    return hotel.maxGuests >= Number(maxGuests);
                }
                return true;
            })
            .filter((hotel) => {
                if (selfCatering !== null) {
                    return hotel.selfCatering === selfCatering;
                }

                return true;
            });

        setFilteredHotels(filtered);
    }, [hotels, maxGuests, maxPrice, selfCatering]);

    return (
        <>
            <Container className={styles.hotels}>
                <Heading title="Hotels" />
                <div className={styles.content}>
                    <FilterHotels
                        handleSearch={filterHotels}
                        maxGuests={maxGuests}
                        maxPrice={maxPrice}
                        selfCatering={selfCatering}
                        setMaxGuests={setMaxGuests}
                        setMaxPrice={setMaxPrice}
                        setSelfCatering={setSelfCatering}
                    />
                    {
                        <Container className={styles.container}>
                            {status === Status.Error ? (
                                <FetchError message="Something went wrong while fetching hotels" />
                            ) : null}

                            {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}

                            {status === Status.Success && isEmpty(hotels) ? (
                                <p>There are currently no hotels listed.</p>
                            ) : null}

                            {isEmpty(filteredHotels) && !isEmpty(hotels) ? (
                                <p className={styles.noMatch}>
                                    None of our hotels met your requirements <EmojiFrown />
                                </p>
                            ) : null}
                            {filteredHotels.map((hotel) => {
                                const { id, name, image, price, maxGuests, selfCatering } = hotel;
                                return (
                                    <React.Fragment key={id}>
                                        {status === Status.Success && !isEmpty(filteredHotels) ? (
                                            <Hotel
                                                key={id}
                                                name={name}
                                                image={image}
                                                price={price}
                                                maxGuests={maxGuests}
                                                selfCatering={selfCatering ? 'Yes' : 'No'}
                                                path={`${Routes.accommodation.accommodation}/${id}`}
                                                buttonText={'More info'}
                                            />
                                        ) : null}
                                    </React.Fragment>
                                );
                            })}
                        </Container>
                    }
                </div>
            </Container>
        </>
    );
}

export default Accommodation;
