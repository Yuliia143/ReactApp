import React from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Config {
  modalOpen: boolean;
  handleOpen: Function;
  handleClose: Function;
}
interface SearchLecture {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  imgurl: string | undefined;
}

interface ModalLectProps {
  modalConfig: any;
  currentLecture: SearchLecture;
}

const HeaderSearchModal = ({ modalConfig, currentLecture }: ModalLectProps) => {
  return (
    <Modal
      dimmer="blurring"
      open={modalConfig.modalOpen}
      onClose={modalConfig.handleClose}
    >
      <Modal.Header>Do you want to watch this lecture?</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={currentLecture.imgurl} />
        <Modal.Description>
          <Header>{currentLecture.title}</Header>
          <p>{currentLecture.description}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" inverted onClick={modalConfig.handleClose}>
          <Icon name="remove" /> No
        </Button>
        <Link to="/signin">
          <Button color="green" inverted onClick={modalConfig.handleClose}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default HeaderSearchModal;
