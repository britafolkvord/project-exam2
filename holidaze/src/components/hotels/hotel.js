import React from 'react';
import { Card, CardImg, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Hotel({ name, id, image, price, selfCatering, path, buttonText }) {
    return (
        <Card key={id}>
            <CardImg variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>Price: {price}</ListGroup.Item>
                    <ListGroup.Item>{selfCatering ? 'Self Catering : Yes' : 'Self Catering : No'}</ListGroup.Item>
                </ListGroup>
                <Link to={path}>
                    <Button className="card__btn--blue" block>
                        {buttonText}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Hotel;
