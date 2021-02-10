import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { AuthContext } from '../../context/AuthContext';
import { Routes } from '../../constants/Routes';

import styles from './logout.module.scss';

function LogOut() {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    const doLogout = () => {
        logout();
        history.push(Routes.home);
    };

    return (
        <Button onClick={doLogout} className={styles.logoutBtn}>
            Log out
        </Button>
    );
}

export default LogOut;
