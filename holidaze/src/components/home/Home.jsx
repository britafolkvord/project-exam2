import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import Heading from '../layout/Heading';
import { BASE_URL, headers } from '../../constants/api';
import SearchHotels from '../search/searchHotels';
import { isEmpty } from '../../utils';

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
    const history = useHistory();

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

    const filterHotels = function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredArray = hotels.filter(function (hotel) {
            const lowerCaseName = hotel.name.toLowerCase();
            if (lowerCaseName.startsWith(searchValue)) {
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
                {filteredHotels.map((hotel) => {
                    return (
                        <>
                            {status === Status.Error ? (
                                <p>
                                    Something went wrong while fetching hotels.
                                    <button onClick={() => history.go(0)}>Try again!</button>
                                </p>
                            ) : null}
                            {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}

                            {status === Status.Success && isEmpty(filteredHotels) ? <p>No current enquiries.</p> : null}
                            {status === Status.Success && !isEmpty(filteredHotels) ? (
                                <Link to={`/accommodation/${hotel.id}`} className={styles.link}>
                                    <h2>{hotel.name}</h2>
                                </Link>
                            ) : null}
                        </>
                    );
                })}
            </div>
        </header>
    );
}

export default Home;
