import React, {useState} from 'react';
import { Table, Button, Modal } from 'semantic-ui-react';
import ModalWindow from './ModalWindow';

const RowTable = ({ id, title, description }) => {
    const [modalState, setModalState] = useState(false);
    const [dimmer, setDimmer] = useState(true); 

    const show = (dimmer) => () => {
        setModalState(true);
        setDimmer(dimmer);
    }
    const close = () => setModalState(false);

    return (
        <Table.Row>
            <ModalWindow dimmer={dimmer} modalState={modalState} onClose={close} id={id} />
            <Table.Cell></Table.Cell>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button color='blue'>View</Button>
                    <Button.Or />
                    <Button color='teal'>Edit</Button>
                    <Button.Or />
                    <Button onClick={show('blurring')} color='red'>Delete</Button>

                </Button.Group>
            </Table.Cell>
        </Table.Row>

        
    )
}

export default RowTable;