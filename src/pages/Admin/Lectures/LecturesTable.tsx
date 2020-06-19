import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import BodyTable from "./BodyTable";
import Pagination from "./Pagination";
import Lecture from "../../../models/lecture";

interface Props {
  lecturesList: Lecture[];
}

const LecturesTable = ({ lecturesList }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lecturesPerPage] = useState(8);

  // Get current lectures
  const indexofLastLecture = currentPage * lecturesPerPage;
  const indexOfFirstLecture = indexofLastLecture - lecturesPerPage;
  const currentLecturesList = lecturesList.slice(
    indexOfFirstLecture,
    indexofLastLecture
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Table
      celled
      compact
      style={{
        border: "none",
        padding: "0 20px",
        marginTop: "10px",
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
      <BodyTable lecturesList={currentLecturesList} />
      <Pagination
        lecturesPerPage={lecturesPerPage}
        totalLectures={lecturesList.length}
        paginate={paginate}
      />
    </Table>
  );
};

export default LecturesTable;
