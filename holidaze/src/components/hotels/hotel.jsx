import React from 'react';
import { Card, CardImg, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './hotel.module.scss';

function Hotel({ name, id, image, price, selfCatering, path, buttonText }) {
    return (
        <Card key={id} className={styles.card}>
            <CardImg variant="top" src={image} className={styles.img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <p>
                            <span>Price :</span> {price}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {selfCatering ? (
                            <p>
                                <span>Self-catering : </span>Yes
                            </p>
                        ) : (
                            <p>
                                <span>Self-catering : </span>No
                            </p>
                        )}
                    </ListGroup.Item>
                </ListGroup>
                <Link to={path} className={styles.link}>
                    <Button className={styles.btn} block>
                        {buttonText}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Hotel;
