import React from 'react';

import styles from './sub.module.scss';

function SubHeading({ title }) {
    return <h1 className={styles.subHeading}>{title}</h1>;
}

export default SubHeading;