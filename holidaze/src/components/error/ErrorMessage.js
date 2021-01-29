import React from 'react';

import styles from './errorMessage.module.scss';

export default function ErrorMessage({ errMsg }) {
    return <p className={styles.errMsg}>{errMsg}</p>;
}
