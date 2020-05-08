import React, {useState} from "react";
import {Accordion, Form, Menu} from 'semantic-ui-react'
import Users from "./Users/Users";

const LecturesForm = (
    <Form>
        <Form.Group grouped>
            <Form.Checkbox label='Red' name='color' value='red'/>
            <Form.Checkbox label='Orange' name='color' value='orange'/>
            <Form.Checkbox label='Green' name='color' value='green'/>
            <Form.Checkbox label='Blue' name='color' value='blue'/>
        </Form.Group>
    </Form>
);

const Admin = () => {
    const [activeIndex, setActiveIndex] = useState('0');
    const [activeItem, setActiveItem] = useState('users');
    const handleClick = (e, {index, name}) => {
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
        setActiveItem(name);
    };
    return (
        <div className="adminMenu" style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '20px'}}>
            <Accordion as={Menu} pointing vertical>
                <Accordion.Title as={Menu.Item}
                                 active={activeItem === 'users'}
                                 name='users'
                                 content='Users'
                                 index={0}
                                 onClick={handleClick}
                                 icon={{display: 'none'}}
                                 style={{padding: '14px 20px'}}/>
                <Accordion.Title as={Menu.Item}
                                 active={activeIndex === 1 && activeItem === 'lectures'}
                                 name='lectures'
                                 content='Lectures'
                                 index={1}
                                 onClick={handleClick}
                                 style={{padding: '14px 20px'}}/>
                <Accordion.Content active={activeIndex === 1} content={LecturesForm}/>
            </Accordion>
            <div className="adminContent" style={{width: '70%', border: '1px solid lightgray', borderRadius: '4px'}}>
                {activeItem === 'users' && <Users/>}
            </div>
        </div>
    )
};


{/*<Menu.Item style={{padding: '14px 0'}}>*/}
{/*<Accordion.Title*/}
{/*                 active={activeIndex === 0 && activeItem === 'users'}*/}
{/*                 name='users'*/}
{/*                 content='Users'*/}
{/*                 index={0}*/}
{/*                 onClick={handleClick}*/}
{/*                 icon={{display: 'none'}}/>*/}
{/*</Menu.Item>*/}

export default Admin;