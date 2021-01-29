import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { InputGroup, Form, FormControl } from 'react-bootstrap';

import Heading from '../layout/Heading';
import ErrorMessage from '../error/ErrorMessage';

import styles from './home.module.scss';

const schema = yup.object().shape({
    name: yup.string().required('Input is required'),
});

function Home() {
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useHistory();

    function onSubmit(data) {
        localStorage.setItem('searchInput', data);
        history.push('/accommodation');
    }
    return (
        <header className={styles.home}>
            <div className={styles.homeContent}>
                <Heading title="Find hotels in Bergen" />
                <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <InputGroup className={styles.search}>
                        <FormControl placeholder="Search for hotel by name..." ref={register} name="name" />
                        {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
                    </InputGroup>
                    <Button className={styles.homeBtn} type="submit">
                        Find hotel
                    </Button>
                </Form>
            </div>
        </header>
    );
}

export default Home;
