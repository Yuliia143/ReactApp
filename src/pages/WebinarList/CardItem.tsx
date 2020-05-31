import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './WebinarsList.module.css';
import LiveImg from '../../assets/images/liveStatus.png';

interface CardProps {
    webinarName: string;
    usersOnline: number;
    firstName: string;
    surName: string;
    id: string;
}

interface Props {
    item: CardProps;
    socket: any;
}

export default function (props: Props) {

    const history = useHistory();

    const {item, socket} = props;
    const { webinarName, firstName, surName, id, usersOnline } = item;

    useEffect(() => {
        socket.on(
            'update_online_users',
            (data: { id: string; usersOnline: number }) => {
                const el = document.querySelector(
                    `div[data-key="${data.id}"] span`
                ) as HTMLElement;
                el.innerText = String(data.usersOnline);
            }
        );

        return () => {
            socket.off('update_online_users');
        };
    });

    const goToWebinar = (webinarId: string) => {
        const path = `/webinar/${webinarId}`;
        history.push(path);
    };

    return (
        <div
            className="card"
            id={styles.cards}
            onClick={() => goToWebinar(id)}
            role = "button"
            tabIndex={0}
            onKeyDown={() => false}
        >
            <div className="image">
                <img
                    src="https://c1.sfdcstatic.com/content/dam/blogs/ca/Blog%20Posts/Go-Live-with-a-Webinar-to-Close-the-Sale-opengraph.png"
                    alt="Webinar preview"
                />
            </div>
            <div className={styles.content}>
                <div className="header" id={styles.headerTitle}>
                    {webinarName}
                </div>
                <div className="meta">
                    <p>{`By ${firstName} ${surName}`} </p>
                </div>
            </div>
            <div className={styles.liveContainer}>
                <img
                    src={LiveImg}
                    alt="Online status"
                    className={styles.liveImg}
                />
                <div className={styles.userAmount} data-key={id}>
                    <span>{usersOnline}</span> Users
                </div>
            </div>
        </div>
    );
}
