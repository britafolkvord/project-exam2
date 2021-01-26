import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BASE_URL, headers } from '../../constants/api';
import Hotel from '../hotels/hotel';
import Heading from '../layout/Heading';

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);

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
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <Container>
                <Heading title="Hotels" />
                {error && <div className="error">{error}</div>}

                <Container className="adminHotels">
                    {hotels.map((hotel) => {
                        return (
                            <Hotel
                                name={hotel.name}
                                image={hotel.image}
                                price={hotel.price}
                                selfCatering={hotel.selfCatering}
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
