import React, { useState, useEffect } from "react";
import { Card, CardImg, Container, Spinner, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL, headers } from "../../constants/api";
import Heading from "../layout/Heading";
import SearchHotels from "./searchHotels";

function Accommodation() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = BASE_URL + "establishments";

    const options = { headers };

    useEffect(() => {
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
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const filterHotels = function(e){
        const searchValue = e.target.value.toLowerCase();
        const filteredArray = hotels.filter(function(hotel){
            const lowerCaseName = hotel.name.toLowerCase();
            if (lowerCaseName.startsWith(searchValue)){
                return true;
            }
            return false;
        });
        setFilteredHotels(filteredArray);
    }

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Container className="hotels">
            <Heading title="Hotels" />
            {error && <div className="error">{error}</div>}
            <SearchHotels handleSearch={filterHotels} />
            <Container className="cardContainer">
            {filteredHotels.map((hotel) => {
                     const { id, name, image, price, selfCatering } = hotel;
                    return (
                        <Card key={id}>
                        <CardImg variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Price: {price}</ListGroup.Item>
                                <ListGroup.Item>Self Catering: {selfCatering ? "Yes" : "No"}</ListGroup.Item>
                                </ListGroup>   
                                <Link to={"../accommodation/" + id}>    
                                <Button className="card__btn--blue" block>More info</Button>
                                </Link> 
                        </Card.Body>
                        </Card>
                    );
                })}
            </Container>
            </Container>
        </>
    );
}

export default Accommodation;