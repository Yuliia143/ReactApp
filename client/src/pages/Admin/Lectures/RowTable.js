import React, {useState} from 'react';
import { Table, Button, Checkbox, Label} from 'semantic-ui-react';
import ModalWindow from './ModalWindow';
import { withRouter } from "react-router-dom";

const RowTable = ({ id, title, videoUrl, history }) => {

    const [modalState, setModalState] = useState(false);
    const [dimmer, setDimmer] = useState(true);
    
    const redirectToSingleLecture = (lectureId) => {
        history.push(`/lecture/${lectureId}`);
    }

    const show = (dimmer) => () => {
        setModalState(true);
        setDimmer(dimmer);
    }
    const close = () => setModalState(false);

    return (
        <Table.Row>
            <ModalWindow dimmer={dimmer} modalState={modalState} onClose={close} id={id} />
            <Table.Cell><Checkbox /></Table.Cell>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell><Label href={videoUrl}>{videoUrl}</Label></Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button onClick={()=>redirectToSingleLecture(id)} color='blue'>View</Button>
                    <Button.Or />
                    <Button color='teal'>Edit</Button>
                    <Button.Or />
                    <Button onClick={show('blurring')} color='red'>Delete</Button>

                </Button.Group>
            </Table.Cell>
        </Table.Row>

        
    )
}

export default withRouter(RowTable);