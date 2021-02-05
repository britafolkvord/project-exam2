import React from 'react';
import { Container, Form } from 'react-bootstrap';

import SubHeading from '../layout/SubHeading';

import styles from './filter.module.scss';

export default function FilterHotels({ setSelfCatering, maxPrice, setMaxPrice, maxGuests, setMaxGuests }) {
    return (
        <Container className={styles.filter}>
            <SubHeading title="Filter by" />
            <Form className={styles.form}>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label}>Number of guests</Form.Label>
                    <Form.Control
                        id="guests"
                        value={maxGuests}
                        onChange={(event) =>
                            Number(event.target.value) >= 0 ? setMaxGuests(event.target.value) : undefined
                        }
                    />
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label}>Max $ per night</Form.Label>
                    <Form.Control
                        id="price"
                        value={maxPrice}
                        onChange={(event) =>
                            Number(event.target.value) >= 0 ? setMaxPrice(event.target.value) : undefined
                        }
                    />
                </Form.Group>
                <Form.Group className={styles.catering}>
                    <Form.Label className={styles.label}>Self-catering</Form.Label>
                    <div className={styles.radio}>
                        <Form.Check
                            inline
                            label="Yes"
                            name="catering"
                            type={'radio'}
                            onChange={() => setSelfCatering(true)}
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="catering"
                            type={'radio'}
                            onChange={() => setSelfCatering(false)}
                        />
                    </div>
                </Form.Group>
            </Form>
        </Container>
    );
}
