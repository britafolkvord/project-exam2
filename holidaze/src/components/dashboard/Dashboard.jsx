import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from '../../constants/Routes';
import Heading from '../layout/Heading';
import Messages from '../adminMessages/Messages';
import Enquiries from '../adminEnquiries/Enquiries';

import styles from './dashboard.module.scss';

function Dashboard() {
    return (
        <>
            <Container className={styles.dashboard}>
                <Heading title="Dashboard" />
                <Container className={styles.links}>
                    <Link to={Routes.admin.hotels.hotels}>
                        <Button className={styles.btn}>Hotels</Button>
                    </Link>
                    <Link to={Routes.admin.hotels.add}>
                        <Button className={styles.btn}>Add hotel</Button>
                    </Link>
                </Container>
                <Messages />
                <Enquiries />
            </Container>
        </>
    );
}

export default Dashboard;
