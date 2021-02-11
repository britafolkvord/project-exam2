import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Heading from '../layout/Heading';
import { BASE_URL, headers } from '../../constants/api';
import { Routes } from '../../constants/Routes';
import SearchHotels from '../search/searchHotels';
import { isEmpty } from '../../utils';
import { FetchError } from '../error/FetchError';

import styles from './home.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function Home() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
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

    const filterHotels = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredArray = hotels.filter((hotel) => {
            const lowerCaseName = hotel.name.toLowerCase();
            if (lowerCaseName.includes(searchValue)) {
                return true;
            }
            return false;
        });

        if (searchValue) {
            setFilteredHotels(filteredArray);
        } else {
            setFilteredHotels([]);
        }
    };

    return (
        <header className={styles.home}>
            <div className={styles.homeContent}>
                <Heading title="Find hotels in Bergen" />
                <SearchHotels handleSearch={filterHotels} />
                {status === Status.Error ? (
                    <FetchError message="Something went wrong while fetching hotels" home={true} />
                ) : null}
                {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
                <div className={styles.resultContainer}>
                    {filteredHotels.map((hotel) => {
                        return (
                            <React.Fragment key={hotel.id}>
                                {status === Status.Success && !isEmpty(filteredHotels) ? (
                                    <Link
                                        to={`${Routes.accommodation.accommodation}/${hotel.id}`}
                                        className={styles.link}
                                    >
                                        <h2>{hotel.name}</h2>
                                    </Link>
                                ) : null}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}

export default Home;
