import React from 'react';
import { Link } from 'react-router-dom';
import { XOctagon } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';

import Heading from '../layout/Heading';
import { Routes } from '../../constants/Routes';

import styles from './unauthorized.module.scss';

function Unauthorized() {
    return (
        <>
            <Container className={styles.container}>
                <Heading title="403 Forbidden" />
                <p>
                    You don't have permisson to access this page. Try logging in <Link to={Routes.login}>here</Link>.
                </p>
                <XOctagon className={styles.icon} />
            </Container>
        </>
    );
}

export default Unauthorized;
