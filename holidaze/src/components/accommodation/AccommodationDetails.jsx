import React, { useState, useEffect } from 'react';
import { Link, Route, useParams, useHistory } from 'react-router-dom';
import { Button, Container, Image, Spinner } from 'react-bootstrap';

import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';
import Enquire from './Enquire';

import styles from './details.module.scss';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function AccommodationDetails() {
    const [hotel, setHotel] = useState([]);
    const [status, setStatus] = useState(Status.Loading);
    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        const url = BASE_URL + 'establishments/' + id;
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                // handle error in catch()
                if (json.error) {
                    throw new Error('Error fetching enquiries');
                } else {
                    setHotel(json);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
    }, [id]);

    return (
        <>
            <Container className={styles.container}>
                {status === Status.Error ? (
                    <p className={styles.errorMessage}>
                        Something went wrong while fetching the hotel.
                        <button onClick={() => history.go(0)} className={styles.reload}>
                            Try again!
                        </button>
                    </p>
                ) : null}
                {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
                {status === Status.Success ? (
                    <>
                        <Heading title={hotel.name} />
                        <Container className={styles.description}>
                            <p>{hotel.description}</p>
                            <p>
                                Not sure if this is the hotel for you? Read some of the reviews left by our customers
                                down below to get a better feel of this place. If you have any questions please don't
                                hesitate to send an email to <span>{hotel.email}</span>
                            </p>
                        </Container>
                        <Container className={styles.content}>
                            <div className={styles.media}>
                                <Image src={hotel.image} className={styles.image} />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252523.9231594416!2d5.149000744044466!3d60.36523064088785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46390d4966767d77%3A0x9e42a03eb4de0a08!2sBergen!5e0!3m2!1sno!2sno!4v1612549947990!5m2!1sno!2sno"
                                    className={styles.map}
                                    frameBorder="0"
                                    aria-hidden="false"
                                    tabIndex="0"
                                    title="Map of Bergen"
                                ></iframe>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.infoGroup}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={styles.svg}>
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                    </svg>
                                    <p>Maximum guests: {hotel.maxGuests}</p>
                                </div>
                                <div className={styles.infoGroup}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={styles.svg}>
                                        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                                    </svg>
                                    <p>Price per night: {hotel.price}$</p>
                                </div>
                                <div className={styles.infoGroup}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={styles.svg}>
                                        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
                                    </svg>
                                    <p>Self-catering: {hotel.selfCatering ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <Link to={`/accommodation/${id}/enquire`} className={styles.buttonContainer}>
                                <Button className={styles.button}>Enquire</Button>
                            </Link>
                        </Container>
                        <Container className={styles.reviewContainer}>
                            <div className={styles.review}>
                                <h2>Ronald Weasley</h2>
                                <p>
                                    "My girlfriend and I had the most amazing time at {hotel.name}! The service was
                                    excellent and so are the surrundings."
                                </p>
                            </div>
                            <div className={styles.review}>
                                <h2>Tom Sawyer</h2>
                                <p>
                                    "{hotel.name} is a very special place! I thoroughly enjoyed my stay here and{' '}
                                    {hotel.price}$ per night is a bargain if you ask me. "
                                </p>
                            </div>
                            <div className={styles.review}>
                                <h2>Atticus Finch</h2>
                                <p>
                                    "My family and myself had a great time staying at {hotel.name}. 10/10 would
                                    recommend! "
                                </p>
                            </div>
                        </Container>
                    </>
                ) : null}
                <Route path="/accommodation/:id/enquire">
                    <Enquire />
                </Route>
            </Container>
        </>
    );
}

export default AccommodationDetails;
