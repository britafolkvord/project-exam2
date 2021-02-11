import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './fetchError.module.scss';

export function FetchError({ message, home }) {
    const history = useHistory();
    return (
        <p className={`${home ? styles.home : ''} ${styles.errorMessage}`}>
            {message}
            <button onClick={() => history.go(0)} className={`${home ? styles.btn : ''} ${styles.reload}`}>
                Try again!
            </button>
        </p>
    );
}
