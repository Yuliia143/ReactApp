import React, { Component } from 'react'
import {Table} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLectures } from "../../store/actions/getLectures";
import BodyTable from './BodyTable';


const mapDispatchToProps = (dispatch) => ({
    getLectures: () => dispatch(getLectures())
});

const mapStateToProps = (state) => ({
    lecturesList: state.lectures.lectures
});


class LecturesTable extends Component {

    componentDidMount() {
        this.props.getLectures();
    }

    render() {
        const { lecturesList } = this.props;
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Video</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <BodyTable lecturesList={ lecturesList } />
            </Table>
        )
    }



}

// const LecturesTable = () => (
//     <Table celled>
//         <Table.Header>
//             <Table.Row>
//                 <Table.HeaderCell>Header</Table.HeaderCell>
//                 <Table.HeaderCell>Header</Table.HeaderCell>
//                 <Table.HeaderCell>Header</Table.HeaderCell>
//             </Table.Row>
//         </Table.Header>

//         <Table.Body>
//             <Table.Row>
//                 <Table.Cell>
//                     <Label ribbon>First</Label>
//                 </Table.Cell>
//                 <Table.Cell>Cell</Table.Cell>
//                 <Table.Cell> <div>
//                     <Button color='red'>Red</Button>
//                     <Button color='orange'>Orange</Button>
//                     <Button color='yellow'>Yellow</Button></div>
//                 </Table.Cell>
//             </Table.Row>
//             <Table.Row>
//                 <Table.Cell>Cell</Table.Cell>
//                 <Table.Cell>Cell</Table.Cell>
//                 <Table.Cell>Cell</Table.Cell>
//             </Table.Row>
//             <Table.Row>
//                 <Table.Cell>Cell</Table.Cell>
//                 <Table.Cell>Cell</Table.Cell>
//                 <Table.Cell>Cell</Table.Cell>
//             </Table.Row>
//         </Table.Body>

//         <Table.Footer>
//             <Table.Row>
//                 <Table.HeaderCell colSpan='3'>
//                     <Menu floated='right' pagination>
//                         <Menu.Item as='a' icon>
//                             <Icon name='chevron left' />
//                         </Menu.Item>
//                         <Menu.Item as='a'>1</Menu.Item>
//                         <Menu.Item as='a'>2</Menu.Item>
//                         <Menu.Item as='a'>3</Menu.Item>
//                         <Menu.Item as='a'>4</Menu.Item>
//                         <Menu.Item as='a' icon>
//                             <Icon name='chevron right' />
//                         </Menu.Item>
//                     </Menu>
//                 </Table.HeaderCell>
//             </Table.Row>
//         </Table.Footer>
//     </Table>
// )




export default connect(mapStateToProps, mapDispatchToProps)(LecturesTable);
