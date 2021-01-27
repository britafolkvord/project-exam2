import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { BASE_URL, headers } from '../../constants/api';
import Hotel from '../hotels/hotel';
import Heading from '../layout/Heading';
import SearchHotels from '../search/searchHotels';

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
                // handle error
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
        const searchValue = e.target.value.toLowerCase();
        const filteredArray = hotels.filter(function (hotel) {
            const lowerCaseName = hotel.name.toLowerCase();
            if (lowerCaseName.startsWith(searchValue)) {
                return true;
            }
            return false;
        });
        setFilteredHotels(filteredArray);
    };

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Container className="hotels">
                <Heading title="Hotels" />
                {error && <div className="error">{error}</div>}
                <SearchHotels handleSearch={filterHotels} />
                {
                    <Container className="cardContainer">
                        {filteredHotels.map((hotel) => {
                            const { id, name, image, price, selfCatering } = hotel;
                            return (
                                <Hotel
                                    key={id}
                                    name={name}
                                    image={image}
                                    price={price}
                                    selfCatering={selfCatering}
                                    path={'../accommodation/' + id}
                                    buttonText={'More info'}
                                />
                            );
                        })}
                    </Container>
                }
            </Container>
        </>
    );
}

export default Accommodation;
