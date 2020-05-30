import React from 'react';
import { Table } from 'semantic-ui-react';
import RowTable from './RowTable';

const BodyTable = ({ lecturesList, handleEditPage, handleOpenDetails }) => {
    return (
        <Table.Body>
            {lecturesList.map((lecture, i) => {
                return (
                    <RowTable
                        key={i}
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
