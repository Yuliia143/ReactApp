import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { createLecture } from '../../../api/lectures-api';
import Lecture from '../../../models/lecture';
import GeneralForm from '../GeneralForm';

interface Props extends RouteComponentProps {}

const initialValues: Lecture = {
    title: '',
    description: '',
    videoUrl: '',
    file: null
};

const CreatePage = ({ history }: Props) => {
    const onSubmitLecture = async (values: any) => {
        const result = await createLecture(values);
        // eslint-disable-next-line no-underscore-dangle
        history.push(`/lecture/${result._id}`);
    };

    return (
        <GeneralForm
            formSubmiting={onSubmitLecture}
            initialValues={initialValues}
        />
    );
};

export default withRouter(CreatePage);
