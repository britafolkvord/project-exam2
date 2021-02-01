import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Heading from '../layout/Heading';
import { BASE_URL, headers } from '../../constants/api';

import styles from './home.module.scss';
import SearchHotels from '../search/searchHotels';



function Home() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = BASE_URL + 'establishments';
        const options = { headers };

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


    const filterHotels = function (e){
        const searchValue = e.target.value.toLowerCase();
        const filteredArray = hotels.filter(function (hotel) {
            const lowerCaseName = hotel.name.toLowerCase();
            if (lowerCaseName.startsWith(searchValue)) {
                return true;
            }
            return false;
        });
        setFilteredHotels(filteredArray);
}


    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }
    console.log(filteredHotels);

    return (
        <header className={styles.home}>
            <div className={styles.homeContent}>
                <Heading title="Find hotels in Bergen" />
                {error && <div>{error}</div>}
                <SearchHotels handleSearch={filterHotels}/>
               {filteredHotels.map((hotel)=>{
                   return(
                       <Link to={`/accommodation/${hotel.id}`} className={styles.link}>
                           <h2>{hotel.name}</h2>
                       </Link>
                   )
               })}
            </div>
        </header>
    );
}

export default Home;

/*

Vil at det ska vises som dropdown når der e matches te søket, men at ingentign vises før någe e skreve inn i searchHotels

 {filteredHotels.map((hotel) => {
     return (
         <Link to="/accommodation/hotel/id">
         <h2>{hotel.name}</h2>
         </Link>
     )
 }


*/