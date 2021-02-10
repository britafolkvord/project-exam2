import React from 'react';

import styles from './sub.module.scss';

function SubHeading({ title }) {
    return <h2 className={styles.subHeading}>{title}</h2>;
}

export default SubHeading;
