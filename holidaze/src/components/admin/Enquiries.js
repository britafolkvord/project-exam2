import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { BASE_URL, headers } from '../../constants/api'
import Heading from '../layout/Heading'

function Enquiries() {
    const [enquiries, setEnquiries] = useState([])
    const [error, setError] = useState(null)

    const url = BASE_URL + 'enquiries'

    const options = { headers }

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.table(json)
                // handle error
                if (json.error) {
                    setEnquiries([])
                    setError(json.message)
                } else {
                    setEnquiries(json)
                }
            })
            .catch((error) => console.log(error))
    }, [])

    if (enquiries === []) {
        return (
            <>
                <Heading title="Enquiries" />
                {error && <div className="error">{error}</div>}
                <p>No current enquiries</p>
            </>
        )
    } else {
        return (
            <Container>
                <Heading title="Enquiries" />
                {error && <div className="error">{error}</div>}
                <Container>
                    {enquiries.map((enquiry) => {
                        return (
                            <div key={enquiry.id}>
                                <h2>{enquiry.name}</h2>
                                <p>{enquiry.email}</p>
                                <p>{enquiry.message}</p>
                            </div>
                        )
                    })}
                </Container>
            </Container>
        )
    }
}

export default Enquiries
