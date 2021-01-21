import React from 'react'
import Heading from '../layout/Heading'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import styles from './home.module.scss'

function Home() {
    return (
        <div className={`hero ${styles.home}`}>
            <div className="hero__content">
                <Heading title="Find hotels in Bergen" />
                <Link to="/accommodation/Accommodation" className="button__link">
                    <Button className="hero__btn--grey">Find hotel</Button>
                </Link>
            </div>
        </div>
    )
}

export default Home
