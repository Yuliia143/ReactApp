import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { editLecture } from "../../../api/lectures-api";
import Lecture from "../../../models/lecture";
import GeneralForm from "../GeneralForm";

interface Props {
  lecturesList: Lecture[];
}

const UpdatePage = ({ lecturesList }: Props) => {
  const { id } = useParams();
  const history = useHistory();
  const editPage = lecturesList.find((lecture) => lecture.id === id);

  const initialValues = {
    title: editPage!.title,
    description: editPage!.description,
    videoUrl: editPage!.videoUrl,
    file: null,
  };

  const onUpdateLecture = async (values: any) => {
    await editLecture(editPage!.id, values);
    history.push(`/lecture/${editPage!.id}`);
  };

  return (
    <GeneralForm
      formSubmiting={onUpdateLecture}
      initialValues={initialValues}
      editPage={editPage}
    />
  );
};

export default UpdatePage;
