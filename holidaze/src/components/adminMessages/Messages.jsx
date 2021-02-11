import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';

import { isEmpty, prettyDate } from '../../utils';
import { BASE_URL, headers } from '../../constants/api';
import SubHeading from '../layout/SubHeading';
import DeleteMessage from '../deleteMessage/DeleteMessage';

import styles from './messages.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function Messages() {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState(Status.Loading);

    useEffect(() => {
        getMessages();
    }, []);
    const getMessages = () => {
        const url = BASE_URL + 'contacts';
        const options = { headers };

        setStatus(Status.Loading);

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                // Handle error in .catch()
                if (json.error) {
                    throw new Error('Error fetching messages');
                } else {
                    setMessages(json);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
    };

    return (
        <Container className={styles.messages}>
            <SubHeading title="Messages" />
            {status === Status.Error ? (
                <p className={styles.errorMessage}>
                    Something went wrong while fetching messages.
                    <button onClick={() => getMessages()} className={styles.reload}>
                        Try again!
                    </button>
                </p>
            ) : null}

            {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}

            {status === Status.Success && isEmpty(messages) ? <p>No current messages.</p> : null}

            {status === Status.Success && !isEmpty(messages) ? (
                <Container className={styles.messageContainer}>
                    {messages.map((message) => {
                        return (
                            <div key={message.id} className={styles.message}>
                                <h2 className={styles.name}>{message.name}</h2>
                                <p>
                                    <span>Email : </span> {message.email}
                                </p>
                                <p>
                                    <span>Sent : </span> {prettyDate(message.createdAt)}
                                </p>
                                <p className={styles.messageContent}>{message.message}</p>
                                <div className={styles.deleteBtn}>
                                    <DeleteMessage id={message.id} />
                                    <Button className={styles.reply}>
                                        <a href={`mailto:${message.email}`}>Reply</a>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </Container>
            ) : null}
        </Container>
    );
}

export default Messages;
