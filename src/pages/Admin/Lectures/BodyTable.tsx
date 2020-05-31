import React from "react";
import { Table } from "semantic-ui-react";
import Lecture from "../../../models/lecture";
import RowTable from "./RowTable";

// handleEditPage: (value: object | ((prevVar: object) => object)) => void;

interface Props {
  lecturesList: Lecture[];
}

const BodyTable = (props: Props) => {
  const { lecturesList } = props;
  return (
    <Table.Body>
      {lecturesList.map((lecture) => {
        return <RowTable key={lecture.id} lecture={lecture} />;
      })}
    </Table.Body>
  );
};

export default BodyTable;
