import React, {useState} from "react";
import {Accordion, Menu} from 'semantic-ui-react'
import Users from "./Users/Users";
import LecturesTable from "./Lectures/LecturesTable"
import CreatePage from "../Lectures/Create/CreatePage.jsx";
import {MenuItemProps} from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import {AccordionTitleProps} from "semantic-ui-react/dist/commonjs/modules/Accordion/AccordionTitle";
import {useRouteMatch, Switch, useHistory} from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";

const Admin = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeItem, setActiveItem] = useState('users');
    const history = useHistory();
    const handleClick = (_: any, data: AccordionTitleProps) => {
        if (data.name) {
            setActiveItem(data.name || '');
        }
        history.push(data.name);
        const newIndex = activeIndex === data.index ? -1 : data.index;
        setActiveIndex(newIndex as number);
    };

    const handleItemClick = (_: any, data: MenuItemProps) => {
        setActiveItem(data.name || '')
    };
    let {path} = useRouteMatch();
    return (
        <>
            <div className="adminMenu"
                 style={{display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '20px'}}>
                <Accordion as={Menu} pointing vertical>
                    <Accordion.Title as={Menu.Item}
                                     active={activeItem === 'users'}
                                     name='users'
                                     content='Users'
                                     index={0}
                                     onClick={handleClick}
                                     icon={{display: 'none'}}
                                     style={{padding: '14px 20px'}}
                    >
                    </Accordion.Title>
                    <Accordion.Title as={Menu.Item}
                                     active={activeIndex === 1}
                                     name='lectures'
                                     content='Lectures'
                                     index={1}
                                     onClick={handleClick}
                                     style={{padding: '14px 20px'}}>
                    </Accordion.Title>
                    <Accordion.Content
                        active={activeIndex === 1}
                        content={
                            <div>
                                <Menu.Item
                                    name='All lectures'
                                    active={activeItem === 'All lectures'}
                                    onClick={handleItemClick}
                                />
                                <Menu.Item
                                    name='Add new'
                                    active={activeItem === 'Add new'}
                                    onClick={handleItemClick}
                                />
                            </div>
                        }/>
                </Accordion>
                <div className="adminContent" style={{
                    width: '70%',
                    border: '1px solid lightgray',
                    borderRadius: '4px',
                    minHeight: 'calc(100vh - 240px)',
                    position: 'relative'
                }}>
                    <Switch>
                        <PrivateRoute path={`${path}/users`} component={Users} isAdmin/>
                        <PrivateRoute path={`${path}/lectures`} component={LecturesTable} isAdmin/>
                    </Switch>
                    {/*{activeItem === 'users' && <Users/>}*/}
                    {/*{activeItem === 'All lectures' && <LecturesTable/>}*/}
                    {/*{activeItem === 'Add new' && <CreatePage/>}*/}
                </div>
            </div>

        </>
    )
};

export default Admin;