import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import SubHeading from '../layout/SubHeading';

import styles from './filter.module.scss';

export default function FilterHotels({
    setSelfCatering,
    maxPrice,
    setMaxPrice,
    maxGuests,
    setMaxGuests,
    selfCatering,
}) {
    return (
        <Container className={styles.filter}>
            <SubHeading title="Filter by" />
            <Form className={styles.form}>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label}>Number of guests</Form.Label>
                    <output htmlFor="guests" className={styles.output}>
                        ( {maxGuests} )
                    </output>
                    <div className={styles.slider}>
                        <Form.Control
                            id="guests"
                            type="range"
                            min={0}
                            max={25}
                            aria-label="Number of guests"
                            aria-valuemin="0"
                            aria-valuemax="25"
                            value={maxGuests}
                            onChange={(event) =>
                                Number(event.target.value) >= 0 ? setMaxGuests(event.target.value) : undefined
                            }
                        />
                    </div>
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label className={styles.label}>Max price per night</Form.Label>
                    <output htmlFor="price" className={styles.output}>
                        ( {maxPrice}$ )
                    </output>
                    <div className={styles.slider}>
                        <Form.Control
                            id="price"
                            type="range"
                            min={40}
                            max={200}
                            aria-label="Max price in dollars per night"
                            aria-valuemin="40"
                            aria-valuemax="200"
                            value={maxPrice}
                            onChange={(event) =>
                                Number(event.target.value) >= 0 ? setMaxPrice(event.target.value) : undefined
                            }
                        />
                    </div>
                </Form.Group>
                <Form.Group className={styles.catering}>
                    <Form.Label className={styles.label}>Self-catering</Form.Label>
                    <div className={styles.radio}>
                        <Form.Check
                            checked={selfCatering === true}
                            inline
                            label="Yes"
                            aria-label="Self-catering: yes"
                            name="catering"
                            type={'radio'}
                            onChange={() => setSelfCatering(true)}
                        />
                        <Form.Check
                            checked={selfCatering === false}
                            inline
                            label="No"
                            aria-label="Self-catering: no"
                            name="catering"
                            type={'radio'}
                            onChange={() => setSelfCatering(false)}
                        />
                    </div>
                </Form.Group>
                <Button
                    onClick={() => {
                        setSelfCatering(null);
                        setMaxPrice('');
                        setMaxGuests('');
                    }}
                    className={styles.reset}
                >
                    Reset filters
                </Button>
            </Form>
        </Container>
    );
}
