import React from 'react';

import Heading from '../layout/Heading';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import styles from './home.module.scss';
import SearchHotels from '../search/searchHotels';

function Home() {
    return (
        <header className={styles.home}>
            <div className={styles.homeContent}>
                <Heading title="Find hotels in Bergen" />
                <SearchHotels />
                <Link to="/accommodation" className={styles.btnLink}>
                    <Button className={styles.homeBtn}>Find hotel</Button>
                </Link>
            </div>
        </header>
    );
}

export default Home;
