import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { BASE_URL, headers } from '../../constants/api';
import FilterHotels from '../filterHotels/FilterHotels';
import Hotel from '../hotels/hotel';
import Heading from '../layout/Heading';


import styles from './accommodation.module.scss';

function Accommodation() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = BASE_URL + 'establishments';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.error) {
                    setHotels([]);
                    setError(json.message);
                } else {
                    setHotels(json);
                    setFilteredHotels(json);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const filterHotels = function (e) {
        const searchValue = e.target.value;
        console.log(e.target.id);
        if(e.target.id === "price"){
            const filteredArray = hotels.filter(function (hotel) {
                const maxPrice = hotel.price;
                if(searchValue <= maxPrice){
                    return true;
                }
                return false;
            })
            setFilteredHotels(filteredArray);
        }else if(e.target.id === "guests"){
            const filteredArray = hotels.filter(function (hotel) {
                const maximumGuests = hotel.maxGuests;
                if (searchValue <= maximumGuests) {
                    return true;
                }
                return false;
        })
    
        setFilteredHotels(filteredArray);
    }else{
        console.log(searchValue);
        const filteredArray = hotels.filter(function (hotel) {
            const selfCatering = hotel.selfCatering;
            if(searchValue === selfCatering){
                return true;
            }
            return false;
        })
        setFilteredHotels(filteredArray);
    };


    };

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Container className={styles.hotels}>
                <Heading title="Hotels" />
                {error && <div>{error}</div>}
                <div className={styles.content}>
                <FilterHotels handleSearch={filterHotels} />
                {
                    <Container className={styles.container}>
                        {filteredHotels.map((hotel) => {
                            const { id, name, image, description } = hotel;
                            return (
                                <Hotel
                                    key={id}
                                    name={name}
                                    image={image}
                                    description={description}
                                    path={'../accommodation/' + id}
                                    buttonText={'More info'}
                                />
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
