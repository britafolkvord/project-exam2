import React from 'react';
import { Card, CardImg, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './hotel.module.scss';

function Hotel({ name, id, image, path, buttonText, description }) {
    return (
        <Card key={id} className={styles.card}>
            <CardImg variant="top" src={image} className={styles.img} alt={name} />
            <Card.Body>
                <Card.Title className={styles.hotelName}>{name}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <p>
                         {description}
                        </p>
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
