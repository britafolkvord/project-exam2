import React from 'react'
import PropTypes from 'prop-types'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function SearchHotels({ handleSearch }) {
    return (
        <InputGroup className="search">
            <FormControl placeholder="Search for hotel by name..." onChange={(event) => handleSearch(event)} />
        </InputGroup>
    )
}

SearchHotels.propTypes = {
    handleSearch: PropTypes.func.isRequired,
}
