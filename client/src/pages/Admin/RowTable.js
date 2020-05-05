import React from 'react';
import { Table, Button } from 'semantic-ui-react';

const RowTable = (props) => {
    const { id, title, description } = props;
    return (
        <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button color='blue'>View</Button>
                    <Button.Or />
                    <Button color='teal'>Edit</Button>
                    <Button.Or />
                    <Button color='red'>Delete</Button>

                </Button.Group>
            </Table.Cell>
        </Table.Row>
    )
}

export default RowTable;