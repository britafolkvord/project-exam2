import React from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import styles from './search.module.scss';

export default function SearchHotels({ handleSearch, handleKeyPress }) {
    return (
        <InputGroup className={styles.search}>
            <FormControl
                onKeyPress={handleKeyPress}
                aria-label="Search for hotel by name"
                placeholder="Search for hotel by name..."
                onChange={(event) => handleSearch(event)}
            />
        </InputGroup>
    );
}

SearchHotels.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};
