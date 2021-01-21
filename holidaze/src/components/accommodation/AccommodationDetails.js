import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link, Route, useParams } from 'react-router-dom'
import { BASE_URL, headers } from '../../constants/api'
import Heading from '../layout/Heading'
import { Container } from 'react-bootstrap'

function AccommodationDetails() {
    const [hotel, setHotel] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    let { id } = useParams()

    useEffect(() => {
        const url = BASE_URL + 'establishments/' + id
        const options = { headers }

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                // handle error
                if (json.error) {
                    setHotel([])
                    setError(json.message)
                } else {
                    setHotel(json)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <Spinner animation="border" className="spinner" />
    }

    return (
        <>
            <Container>
                <Heading title={hotel.name} />
                <Link to={`/accommodation/${id}/enquire`}>enquire</Link>
                <Route path="/accommodation/:id/enquire">
                    <div>enquire</div>
                </Route>
                <div>{error}</div>
            </Container>
        </>
    )
}

export default AccommodationDetails
