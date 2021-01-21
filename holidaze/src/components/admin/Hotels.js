import React, { useState, useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { BASE_URL, headers } from '../../constants/api'
import Heading from '../layout/Heading'

function Hotels() {
    const [hotels, setHotels] = useState([])
    const [error, setError] = useState(null)

    const url = BASE_URL + 'establishments'

    const options = { headers }

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.table(json)
                // handle error
                if (json.error) {
                    setHotels([])
                    setError(json.message)
                } else {
                    setHotels(json)
                }
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <>
            <Container>
                <Heading title="Hotels" />
                {error && <div className="error">{error}</div>}

                <Container className="adminHotels">
                    {hotels.map((hotel) => {
                        return (
                            <NavLink to={`/admin/hotels/edit/${hotel.id}`} className="adminHotels__button">
                                <Image src={hotel.image} className="adminHotels__img" />
                                <p>{hotel.name}</p>
                            </NavLink>
                        )
                    })}
                </Container>
            </Container>
        </>
    )
}

export default Hotels
