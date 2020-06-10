import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect, ConnectedProps } from 'react-redux';
import { getLectures } from '../../../store/actions/getLectures';
import http from '../../../api/http';

const mapDispatchToProps = (dispatch: Function) => ({
  updateLectureList: () => dispatch(getLectures()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  modalState: boolean;
  dimmer: any;
  onClose: () => void;
  id: string | undefined;
  videoUrl: string | undefined;
}

const ModalWindow = ({
  modalState,
  dimmer,
  onClose,
  id,
  videoUrl,
  updateLectureList,
}: Props) => {
  const deleteFromAws = async (urlVideo: string | undefined) => {
    const slashIndex = urlVideo!.lastIndexOf('/');
    const fileName = urlVideo!.slice(slashIndex + 1, urlVideo!.length);
    const data: { file: string } = {
      file: fileName,
    };
    await http.remove('/api/aws/upload-video', data);
  };

  const deleteLecture = async (lectureId: string | undefined) => {
    await http.remove(`/api/lectures/${lectureId}`);
    await deleteFromAws(videoUrl);
    updateLectureList();
    onClose();
  };

  return (
    <Modal dimmer={dimmer} open={modalState} onClose={onClose}>
      <Modal.Header>Delete this lecture?</Modal.Header>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button
          negative
          icon="checkmark"
          labelPosition="right"
          content="Delete"
          onClick={() => deleteLecture(id)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default connector(ModalWindow);
