import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import socketIoClient from 'socket.io-client';
import styles from './WebinarsList.module.css';
import CardItem from './CardItem';
import { BASE_URL } from '../../config';
import Loader from '../Webinar/Loader';

const socket = socketIoClient(BASE_URL || 'http://localhost:3030');

interface WebinarItem {
    webinarName: string;
    usersOnline: number;
    id: string;
    firstName: string;
    surName: string;
    activeUsers: [];
}

export default function () {
    const [webinarsList, setWebinarsList] = useState<WebinarItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        socket.emit('get_all_webinars', '');

        socket.on('get_all_webinars', (webinars: WebinarItem[]) => {
            setWebinarsList(webinars);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {loading === true ? (
                <Loader />
            ) : (
                <div className={styles.mainContainer}>
                    <h1 className={styles.mainTitle}>All available webinars</h1>
                    <Card className={styles.wrapperCards}>
                        <div className="ui link three cards">
                            {webinarsList.map((item) => (
                                <CardItem
                                    item={{
                                        webinarName: item.webinarName,
                                        usersOnline: item.usersOnline,
                                        firstName: item.firstName,
                                        surName: item.surName,
                                        id: item.id
                                    }}
                                    socket={socket}
                                    key={item.id}
                                />
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
