import React, {useState} from 'react';
import {Button, Icon, Pagination, Table} from 'semantic-ui-react';
import User from "../../../models/user";
import {PaginationProps} from "semantic-ui-react/dist/commonjs/addons/Pagination/Pagination";
import DeleteUserModal from "./DeleteUserModal";

interface Props {
    usersList: User[]
}

const renderTableUser = (list: User[], modalConfig: any, {openDetails}:any) => {
    return list.map((user: User) => {
        const {id, name, email, surName, role} = user;
        return (
            <Table.Row key={id}>
                <Table.Cell width={5}>{`${name} ${surName || ''}`}</Table.Cell>
                <Table.Cell width={6}>{email}</Table.Cell>
                <Table.Cell width={3}>{role}</Table.Cell>
                <Table.Cell width={4}>
                    <Button style={{marginRight: '15px'}} onClick={openDetails}>
                        <Icon link name='pencil alternate' style={{margin: '0'}}/>
                    </Button>
                    <Button onClick={modalConfig.handleOpen}>
                        <Icon link name='trash alternate' color='red' style={{margin: '0'}}/>
                    </Button>
                </Table.Cell>
                <DeleteUserModal id={id} config={modalConfig} />
            </Table.Row>
        )
    })
};
const UsersList = ({usersList, openDetails}: any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const handleRemove = (id: any) => {
        console.log('Remove' , id);
        /* some code if we done */
        setModalOpen(false);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = usersList.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(usersList.length / postsPerPage);

    //change page
    const paginate = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => setCurrentPage(data.activePage as number);

    return (
        <Table singleLine compact style={{border: 'none', padding: '0 20px'}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={5}>Full Name</Table.HeaderCell>
                    <Table.HeaderCell width={6}>Email</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Role</Table.HeaderCell>
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
                    {openDetails})}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4' style={{textAlign: 'center'}}>
                        <Pagination
                            defaultActivePage={1}
                            totalPages={totalPages}
                            itemsCountPerPage={postsPerPage}
                            totalItemsCount={usersList.length}
                            onPageChange={paginate}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
};

export default UsersList;

