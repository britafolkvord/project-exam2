import React from 'react';

import styles from './heading.module.scss';

function Heading({ title }) {
    return <h1 className={styles.heading}>{title}</h1>;
}

export default Heading;
