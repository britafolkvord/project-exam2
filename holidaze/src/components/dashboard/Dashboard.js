import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Heading from '../layout/Heading';
import Messages from '../adminMessages/Messages';
import Enquiries from '../adminEnquiries/Enquiries';

import styles from './dashboard.module.scss';

function Dashboard() {
    return (
        <>
            <Container className={styles.dashboard}>
                <Heading title="Dashboard" className={styles.heading} />
                <Container className={styles.links}>
                    <NavLink to="../admin/adminHotels/hotels">
                        <Button className={styles.btn}>Hotels</Button>
                    </NavLink>
                    <NavLink to="../admin/hotels/add">
                        <Button className={styles.btn}>Add hotel</Button>
                    </NavLink>
                </Container>
                <Messages />
                <Enquiries />
            </Container>
        </>
    );
}

export default Dashboard;
