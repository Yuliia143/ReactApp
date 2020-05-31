import React, { useState } from "react";
import { Button, Form, Icon, Popup } from "semantic-ui-react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./Users.module.css";

const regex = new RegExp("^[a-zA-Z0-9 ]+$");
interface OptionsProps {
  query: string;
  handleQuery: Function;
  totalCount: number;
}

const UsersOptions = ({ query, handleQuery, totalCount }: OptionsProps) => {
  const history = useHistory();
  const [filterValid, setFilterValid] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const handleOnChange = (event: any, { value }: any) => {
    if (value !== "" && !regex.test(value)) {
      setFilterValid(false);
      setPopupMessage("Invalid character.");
    } else {
      setFilterValid(true);
      handleQuery(value);
    }
    if (totalCount === 0) {
      setPopupMessage("No results found.");
    }
  };
  const { url } = useRouteMatch();
  return (
    <div className={styles.tableOptions}>
      <Form className={styles.optionsForm}>
        <Form.Group>
          <Form.Field>
            <Popup
              trigger={
                <Form.Input
                  placeholder="Enter the filter."
                  name="filter"
                  value={query}
                  error={!filterValid}
                  label="Filter"
                  onChange={handleOnChange}
                  icon="search"
                />
              }
              content={popupMessage}
              open={!filterValid || totalCount === 0}
              on="click"
              position="right center"
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Button
        className={styles.optionsButton}
        onClick={() => history.push(`${url}/new`)}
      >
        Add new user
        <Icon className={styles.optionsIcon} name="plus" />
      </Button>
    </div>
  );
};
export default UsersOptions;
