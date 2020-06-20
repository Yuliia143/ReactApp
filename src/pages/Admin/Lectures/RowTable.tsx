import React, { useState } from "react";
import { Table, Button, Checkbox, Label, Icon } from "semantic-ui-react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Lecture from "../../../models/lecture";
import ModalWindow from "./ModalWindow";

interface Props {
  lecture: Lecture;
}

const RowTable = (props: Props) => {
  const { lecture } = props;
  const { id, title, videoUrl } = lecture;
  const history = useHistory();
  const { url } = useRouteMatch();

  const [modalState, setModalState] = useState(false);
  const [dimmer, setDimmer] = useState<string | boolean>(true);

  const redirectToSingleLecture = (lectureId: string | undefined) => {
    history.push(`/lecture/${lectureId}`);
  };

  const show = (dimmerValue: string | boolean) => () => {
    setModalState(true);
    setDimmer(dimmerValue);
  };
  const close = () => setModalState(false);

  return (
    <Table.Row>
      <ModalWindow
        dimmer={dimmer}
        modalState={modalState}
        onClose={close}
        id={id}
      />
      <Table.Cell>
        <Checkbox />
      </Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <Label href={videoUrl}>{videoUrl}</Label>
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button onClick={() => redirectToSingleLecture(id)}>
            <Icon
              link
              name="hand point left"
              color="blue"
              style={{ margin: "0" }}
            />
          </Button>
          <Button.Or />
          <Button onClick={() => history.push(`${url}/${id}`)}>
            <Icon
              link
              name="pencil alternate"
              color="teal"
              style={{ margin: "0" }}
            />
          </Button>
          <Button.Or />
          <Button onClick={show("blurring")}>
            <Icon
              link
              name="trash alternate"
              color="red"
              style={{ margin: "0" }}
            />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default RowTable;
