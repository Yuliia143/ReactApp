import React, { Component } from 'react';
import { Menu, Accordion, Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import LecturesTable from "./LecturesTable"
import CreatePage from "../Lectures/Create/CreatePage.jsx";
import UploadVideo from "../Lectures/Create/UploadVideo";
import './Admin.css';

const LectureForm = (
    <Form>
        <Form.Group grouped>
            <Form.Checkbox label='Red' name='color' value='red' />
            <Form.Checkbox label='Orange' name='color' value='orange' />
            <Form.Checkbox label='Green' name='color' value='green' />
            <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
    </Form>
)

class AdminEditPage extends Component {

    state = {
        activeIndex: 0,
        activeItem: 'All lectures'
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeIndex, activeItem } = this.state
        return (
            <div className="edit-profile">
                <Accordion as={Menu} vertical>
                    <Menu.Item>
                        <Accordion.Title
                            active={activeIndex === 0}
                            content='Users'
                            index={0}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={activeIndex === 0} content={LectureForm} />
                    </Menu.Item>

                    <Menu.Item>
                        <Accordion.Title
                            active={activeIndex === 1}
                            content='Lectures'
                            index={1}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content
                            active={activeIndex === 1}
                            content={
                                <div>
                                    <Menu.Item
                                        name='All lectures'
                                        active={activeItem === 'All lectures'}
                                        onClick={this.handleItemClick}
                                    ></Menu.Item>

                                    <Menu.Item
                                        name='Add new'
                                        active={activeItem === 'Add new'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='Upload Video'
                                        active={activeItem === 'Upload Video'}
                                        onClick={this.handleItemClick}
                                    />
                                </div>
                            } />
                    </Menu.Item>
                </Accordion>
                <div className="edit-content">
                    {activeItem == 'All lectures' && <LecturesTable />}
                    {activeItem == 'Add new' && <CreatePage />}
                    {activeItem == 'Upload Video' && < UploadVideo />} 
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (user) => dispatch({ type: 'UPDATE_PROFILE', payload: user })
});

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditPage);
