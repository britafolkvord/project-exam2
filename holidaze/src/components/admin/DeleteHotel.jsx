import React from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Button } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BASE_URL, headers, DELETE } from '../../constants/api';
import { Routes } from '../../constants/Routes';

import styles from './delete.module.scss';

function DeleteHotel(props) {
    const history = useHistory();

    const checkDelete = () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Deleting this hotel will be permanent',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteHotel(),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const deleteHotel = async () => {
        const url = BASE_URL + 'establishments/' + props.id;
        const options = { headers, method: DELETE };
        await fetch(url, options);
        history.push(Routes.admin.hotels.hotels);
    };

    return (
        <Button variant="danger" onClick={checkDelete} className={styles.btn}>
            Delete
        </Button>
    );
}

export default DeleteHotel;
