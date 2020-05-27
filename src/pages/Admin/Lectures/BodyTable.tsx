import React from 'react';
import { Table } from 'semantic-ui-react';
import Lecture from '../../../models/lecture';
import RowTable from './RowTable';

// handleEditPage: (value: object | ((prevVar: object) => object)) => void;

interface Props {
    lecturesList: Lecture[];
    handleEditPage: any;
    handleOpenDetails: (
        value: boolean | ((prevVar: boolean) => boolean)
    ) => void;
}

const BodyTable = (props: Props) => {
    const { lecturesList, handleEditPage, handleOpenDetails } = props;
    return (
        <Table.Body>
            {lecturesList.map((lecture) => {
                return (
                    <RowTable
                        key={lecture.id}
                        lecture={lecture}
                        handleEditPage={handleEditPage}
                        handleOpenDetails={handleOpenDetails}
                    />
                );
            })}
        </Table.Body>
    );
};

export default BodyTable;
