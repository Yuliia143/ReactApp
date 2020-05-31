import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button, Icon, Table } from 'semantic-ui-react';
import User from '../../../models/user';
import styles from './Users.module.css';
import DeleteUserModal from './DeleteUserModal';

interface Config {
    modalOpen: boolean;
    handleOpen: Function;
    handleClose: Function;
    handleRemove: Function;
}

interface TableItemProps {
    list: User[];
    config: Config;
}

const TableItem = ({ list, config }: TableItemProps) => {
    const [currentUser, setCurrentUser] = useState<User>(Object);
    const { url } = useRouteMatch();
    const history = useHistory();
    const elements = list.map((user: User) => {
        const { id, name, email, surName, role } = user;
        return (
            <Table.Row key={id}>
                <Table.Cell width={5}>{`${name} ${surName || ''}`}</Table.Cell>
                <Table.Cell width={6}>{email}</Table.Cell>
                <Table.Cell width={3}>{role}</Table.Cell>
                <Table.Cell width={4}>
                    <Button
                        className={styles.tableButton}
                        onClick={() => history.push(`${url}/${id}`)}
                    >
                        <Icon
                            link
                            name="pencil alternate"
                            className={styles.tableIcon}
                        />
                    </Button>
                    <Button
                        onClick={() => {
                            setCurrentUser(user);
                            config.handleOpen(true);
                        }}
                    >
                        <Icon
                            link
                            name="trash alternate"
                            color="red"
                            className={styles.tableIcon}
                        />
                    </Button>
                </Table.Cell>
                <DeleteUserModal user={currentUser} config={config} />
            </Table.Row>
        );
    });
    return <>{elements}</>;
};
export default TableItem;
