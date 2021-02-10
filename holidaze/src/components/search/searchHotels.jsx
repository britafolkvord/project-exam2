import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import styles from './search.module.scss';

export default function SearchHotels({ handleSearch }) {
    return (
        <InputGroup className={styles.search}>
            <FormControl
                aria-label="Search for hotel by name"
                placeholder="Search for hotel by name..."
                onChange={(event) => handleSearch(event)}
            />
        </InputGroup>
    );
}
