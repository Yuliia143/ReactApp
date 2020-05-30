import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import { connect, ConnectedProps } from 'react-redux';
import { MenuItemProps } from 'semantic-ui-react/dist/commonjs/collections/Menu/MenuItem';
import LogoImg from '../../assets/images/logowhite.png';

import Logo from '../Logo';
import HeaderCategories from './HeaderCategories';
import HeaderSearch from './HeaderSearch';
import HeaderPrimaryMenu from './HeaderPrimaryMenu';
import HeaderAuthButtons from './HeaderAuthButtons';

import { getCategories } from '../../store/actions/getCategories';
import { getLectures } from '../../store/actions/getLectures';
import { RootState } from '../../store';
import styles from './Header.module.css';

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
    categoriesList: state.categories.categories,
    categoriesLoading: state.categories.loading,
    lecturesList: state.lectures.lectures,
    lecturesLoading: state.lectures.loading
});

const mapDispatchToProps = (dispatch: Function) => ({
    getCategories: () => dispatch(getCategories()),
    getLectures: () => dispatch(getLectures())
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const HeaderContainer = ({
    user,
    categoriesList,
    categoriesLoading,
    lecturesList,
    lecturesLoading,
    getLectures,
    getCategories
}: PropsFromRedux) => {
    const [activeItem, setActiveItem] = useState('');
    const handleItemClick = (_: any, data: MenuItemProps) => {
        setActiveItem(data.name || '');
    };

    useEffect(() => {
        getLectures();
        getCategories();
    }, [getLectures, getCategories]);

    return (
        <Segment color="teal" inverted className={styles.headerContainer}>
            <Menu
                attached="top"
                inverted
                secondary
                className={styles.headerMenu}
            >
                <Menu.Menu>
                    <Menu.Item
                        as={NavLink}
                        name="home"
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                        exact
                        to="/"
                    >
                        <Logo image={LogoImg} />
                    </Menu.Item>
                    <Menu.Item>
                        {!categoriesLoading && categoriesList && (
                            <HeaderCategories categoriesList={categoriesList} />
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {!lecturesLoading && lecturesList && (
                            <HeaderSearch lecturesList={lecturesList} />
                        )}
                    </Menu.Item>
                </Menu.Menu>
                {user ? (
                    <Menu.Menu position="right">
                        <HeaderPrimaryMenu />
                    </Menu.Menu>
                ) : (
                    <Menu.Menu position="right">
                        <HeaderAuthButtons
                            activeItem={activeItem}
                            handleActiveItem={handleItemClick}
                        />
                    </Menu.Menu>
                )}
            </Menu>
        </Segment>
    );
};

export default connector(HeaderContainer);
