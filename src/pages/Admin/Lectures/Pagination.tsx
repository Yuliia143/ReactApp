import React, { useState } from "react";
import { Menu, Table } from "semantic-ui-react";

interface Props {
  lecturesPerPage: number;
  totalLectures: number;
  paginate(pageNumbers: number): void;
}

const Pagination = ({ lecturesPerPage, totalLectures, paginate }: Props) => {
  const [activeItem, setActiveItem] = useState(1);

  const handleItemClick = (number: number) => setActiveItem(number);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLectures / lecturesPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="4">
          <Menu floated="right" pagination>
            {pageNumbers.map((number) => (
              <Menu.Item
                key={number}
                name={`${number}`}
                active={activeItem === number}
                onClick={() => {
                  handleItemClick(number);
                  paginate(number);
                }}
              />
            ))}
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default Pagination;
