import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../context/AuthContext';

import styles from './logout.module.scss';

function LogOut() {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    const doLogout = () => {
        logout();
        history.push('/');
    };

    return (
        <Button onClick={doLogout} className={styles.logoutBtn}>
            Log out
        </Button>
    );
}

export default LogOut;
