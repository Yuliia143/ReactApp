import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { editLecture } from '../../../api/lectures-api';
import Lecture from '../../../models/lecture';
import GeneralForm from '../GeneralForm';

interface Props extends RouteComponentProps {
    closeDetails: () => void;
    editPage: Lecture;
}

const UpdatePage = ({ history, closeDetails, editPage }: Props) => {
    const initialValues = {
        title: editPage.title,
        description: editPage.description,
        videoUrl: editPage.videoUrl,
        file: null
    };

    const onUpdateLecture = async (values: any) => {
        await editLecture(editPage.id, values);
        history.push(`/lecture/${editPage.id}`);
    };

    return (
        <GeneralForm
            formSubmiting={onUpdateLecture}
            initialValues={initialValues}
            closeDetails={closeDetails}
            editPage={editPage}
        />
    );
};

export default withRouter(UpdatePage);
