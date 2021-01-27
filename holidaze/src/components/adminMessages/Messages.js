import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';
import DeleteMessage from '../deleteMessage/DeleteMessage';
import styles from './messages.module.scss';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = BASE_URL + 'contacts';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.table(json);
                // handle error
                if (json.error) {
                    setMessages([]);
                    setError(json.message);
                } else {
                    setMessages(json);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <Container className={styles.messages}>
            <Heading title="Messages" />
            {error && <div>{error}</div>}
            <Container className={styles.messageContainer}>
                {messages.map((message) => {
                    return (
                        <div key={message.id} className={styles.message}>
                            <h2>{message.name}</h2>
                            <p>{message.email}</p>
                            <p>Sent : {message.createdAt}</p>
                            <p>{message.message}</p>
                            <div className={styles.deleteBtn}>
                                <DeleteMessage id={message.id} />
                            </div>
                        </div>
                    );
                })}
            </Container>
        </Container>
    );
}

export default Messages;
