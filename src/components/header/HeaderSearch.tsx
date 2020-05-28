import React, {useState, Fragment} from 'react';
import {Search} from "semantic-ui-react";
import Lecture from "../../models/lecture";
import {MenuItemProps} from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import {SearchProps} from "semantic-ui-react/dist/commonjs/modules/Search/Search";
import {useHistory} from "react-router-dom";
import styles from "./Header.module.css"
import HeaderSearchModal from "./HeaderSearchModal";
import {RootState} from "../../store";
import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    lecturesList: Lecture[]
}

interface SearchLecture {
    id: string,
    title: string,
    description: string,
    imgurl: string
}

const HeaderSearch = ({lecturesList, user}: Props) => {
    let history = useHistory();
    const [currentLecture, setCurrentLecture] = useState<SearchLecture>(Object);

    const list = lecturesList.map(lecture => {
        return {
            id: lecture.id,
            title: lecture.title,
            description: lecture.description,
            imgurl: lecture.imgUrl
        }
    });
    const [searchLectField, setSearchLectField] = useState('');

    const handleResultSelect = (_: any, data: MenuItemProps) => {
        setSearchLectField(data.result.title);
        if (user) {
            history.push(`/lecture/${data.result.id}`);
        } else {
            setCurrentLecture(data.result);
            setModalOpen(true);
        }
    };
    const handleSearchSelect = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
        setSearchLectField(data.value || '');
    };
    const handleSearchChange = (list: SearchLecture[] = []) => {
        return list.filter(item => {
            return item.title.toLowerCase().includes(searchLectField.toLowerCase())
        });
    };
    const res = handleSearchChange(list);

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <Fragment>
            <Search
                placeholder="Search..."
                input={{fluid: true}}
                value={searchLectField}
                onSearchChange={handleSearchSelect}
                onResultSelect={handleResultSelect}
                results={res}
                className={styles.headerSearch}/>
            <HeaderSearchModal
                modalConfig={{
                    modalOpen: modalOpen,
                    handleOpen: handleOpen,
                    handleClose: handleClose
                }}
                currentLecture={currentLecture}/>
        </Fragment>
    )
};

export default connector(HeaderSearch);