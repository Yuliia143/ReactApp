import http from './http';

export const readUsers = () => {
    return http
        .get('/api/users/all')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const removeUser = (id) => {
    return http
        .remove(`/api/users/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const updateUserInfo = (user) => {
    return http
        .put(`/api/users/${user.id}`, { user })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const addUserInfo = (user) => {
    return http
        .post('/api/users/all', { user })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};
