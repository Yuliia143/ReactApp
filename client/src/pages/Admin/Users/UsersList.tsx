import React, {useState, Fragment} from 'react';
import {Button, Icon, Pagination, Table} from 'semantic-ui-react';
import User from "../../../models/user";
import {PaginationProps} from "semantic-ui-react/dist/commonjs/addons/Pagination/Pagination";
import DeleteUserModal from "./DeleteUserModal";
import UsersOptions from "./UsersOptions";

interface Props {
    usersList: User[]
}

const renderTableUser = (list: User[], modalConfig: any, handleOpenDetails: any, handleSetUser: any, setDeletedUser: any, deletedUser: any) => {
    return list.map((user: User) => {
        const {id, name, email, surName, role} = user;
        return (
            <Table.Row>
                <Table.Cell width={5}>{`${name} ${surName || ''}`}</Table.Cell>
                <Table.Cell width={6}>{email}</Table.Cell>
                <Table.Cell width={3}>{role}</Table.Cell>
                <Table.Cell width={4}>
                    <Button style={{marginRight: '15px'}}
                            onClick={() => {
                                handleOpenDetails(true);
                                handleSetUser(user);
                            }}>
                        <Icon link name='pencil alternate' style={{margin: '0'}}/>
                    </Button>
                    <Button onClick={() => {
                        modalConfig.handleOpen(true);
                        setDeletedUser(id);
                    }}>
                        <Icon link name='trash alternate' color='red' style={{margin: '0'}}/>
                    </Button>
                </Table.Cell>
                <DeleteUserModal id={deletedUser} config={modalConfig}/>
            </Table.Row>
        )
    })
};
const UsersList = ({usersList, handleOpenDetails, handleSetUser}: any) => {
    const originalList = [...usersList];
    const [list, setList] = useState([...usersList]); // Todo naming

    //search
    const [query, setQuery] = useState('');

    //delete modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [deletedUser, setDeletedUser] = useState(null);

    const handleRemove = (id: any) => {
        let index = list.findIndex((user: any) => user['id'] === id);
        list.splice(index, 1);
        setModalOpen(false);
    };

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(list.length / postsPerPage);

    //change page
    const paginate = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => setCurrentPage(data.activePage as number);

    //sort
    const [column, setColumn] = useState(null);
    type DirectionProps = undefined | "ascending" | "descending";
    const [direction, setDirection] = useState<DirectionProps>(undefined);

    const handleSort = (clickedColumn: any) => () => {
        setColumn(clickedColumn);
        switch (direction) {
            case "ascending":{
                setList(list.reverse());
                break;
            }
            case "descending":{
                setList(originalList);
                break;
            }
            default:{
                setList(list.sort((a: any, b: any) => (a[clickedColumn] > b[clickedColumn]) ? 1 : -1));
            }
        }

        const setType = (type: any) => {
            if (type === 'ascending') return 'descending';
            else if (type === 'descending') return undefined;
            else if (type === undefined) return 'ascending';
        };
        setDirection(setType(direction));
    };

    return (
        <Fragment>
            <UsersOptions filter={query}/>
            <Table sortable singleLine compact style={{border: 'none', padding: '0 20px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5}
                                          sorted={column === 'name' ? direction : undefined}
                                          onClick={handleSort('name')}
                        >Full Name</Table.HeaderCell>
                        <Table.HeaderCell width={6}
                                          sorted={column === 'email' ? direction : undefined}
                                          onClick={handleSort('email')}
                        >Email</Table.HeaderCell>
                        <Table.HeaderCell width={3}
                                          sorted={column === 'role' ? direction : undefined}
                                          onClick={handleSort('role')}>Role</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {renderTableUser(currentPosts,
                        {
                            modalOpen,
                            handleOpen: handleOpen,
                            handleClose: handleClose,
                            handleRemove: handleRemove,
                        },
                        handleOpenDetails,
                        handleSetUser,
                        setDeletedUser,
                        deletedUser,
                    )}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4' style={{textAlign: 'center'}}>
                            <Pagination
                                defaultActivePage={1}
                                totalPages={totalPages}
                                itemsCountPerPage={postsPerPage}
                                totalItemsCount={list.length}
                                onPageChange={paginate}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Fragment>
    )
};

export default UsersList;

