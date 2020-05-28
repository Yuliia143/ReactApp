import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store';
import { getLectures } from '../../../store/actions/getLectures';
import BodyTable from './BodyTable';
import Pagination from './Pagination';
import UpdatePage from '../../Lectures/Update/UpdatePage';
import Lecture from '../../../models/lecture';

const mapDispatchToProps = (dispatch: Function) => ({
    getLectures: () => dispatch(getLectures())
});

const mapStateToProps = (state: RootState) => ({
    lecturesList: state.lectures.lectures
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const LecturesTable = ({ lecturesList, getLectures }: PropsFromRedux) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lecturesPerPage] = useState(5);
    const [openDetails, setOpenDetails] = useState(false);
    const [editPage, setEditPage] = useState<null | Lecture>(null);

    // const useIsMounted = () => {
    //     const isMounted = useRef(false);
    //     useEffect(() => {
    //         isMounted.current = true;
    //         return () => (isMounted.current = false);
    //     }, []);
    //     return isMounted;
    // };

    useEffect(() => {
        getLectures();
    }, []);

    // Get current lectures
    const indexofLastLecture = currentPage * lecturesPerPage;
    const indexOfFirstLecture = indexofLastLecture - lecturesPerPage;
    const currentLecturesList = lecturesList.slice(
        indexOfFirstLecture,
        indexofLastLecture
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleCloseDetails = () => setOpenDetails(false);

    return (
        <div className="adminContent">
            {openDetails && (
                <UpdatePage
                    editPage={editPage}
                    closeDetails={handleCloseDetails}
                />
            )}

            {!openDetails && (
                <Table
                    celled
                    compact
                    style={{
                        border: 'none',
                        padding: '0 20px',
                        marginTop: '10px'
                    }}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={3} />
                            <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                            <Table.HeaderCell width={8}>Video</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <BodyTable
                        lecturesList={currentLecturesList}
                        handleEditPage={setEditPage}
                        handleOpenDetails={setOpenDetails}
                    />
                    <Pagination
                        lecturesPerPage={lecturesPerPage}
                        totalLectures={lecturesList.length}
                        paginate={paginate}
                    />
                </Table>
            )}
        </div>
    );
};

export default connector(LecturesTable);
