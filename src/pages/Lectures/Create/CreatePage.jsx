import React from 'react';
import { withRouter } from 'react-router-dom';
import { createLecture } from '../../../api/lectures-api';
import GeneralForm from '../GeneralForm';

const initialValues = {
    title: '',
    description: '',
    videoUrl: '',
    file: null
};

const CreatePage = ({ history }) => {
    const onSubmitLecture = async (values) => {
        const result = await createLecture(values);
        console.log(result);
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
