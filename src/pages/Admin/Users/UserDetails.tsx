import React, { useState } from 'react';
import { Button, Form, FormProps, InputOnChangeData } from 'semantic-ui-react';
import User from '../../../models/user';
import { updateUser } from '../../../store/actions/updateUser';
import { connect, ConnectedProps } from 'react-redux';
import { addUser } from '../../../store/actions/addUser';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import styles from './Users.module.css';

const mapStateToProps = (state: RootState) => ({
  usersList: state.users.users,
});
const mapDispatchToProps = (dispatch: Function) => ({
  updateUser: (user: User) => dispatch(updateUser(user)),
  addUser: (user: User) => dispatch(addUser(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface UserDetailsProps extends PropsFromRedux {
  editedUser: null | User;
}

const UserDetails = ({ usersList, updateUser, addUser }: UserDetailsProps) => {
  let { id } = useParams();
  let editedUser = usersList.find((user) => user.id === id);
  if (!editedUser) {
    editedUser = {
      id: '',
      name: '',
      email: '',
      surName: '',
      role: '',
      password: '',
      imageUrl: '',
    };
  }
  const [user, setUser] = useState({ ...editedUser });

  const roles = [
    { key: 'admin', text: 'Admin', value: 'admin' },
    { key: 'lector', text: 'Lector', value: 'lector' },
    { key: 'student', text: 'Student', value: 'student' },
  ];
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
    key: string
  ) => {
    setUser(Object.assign({}, user, { [key]: data.value }));
  };
  const handleSubmit = (
    event: React.SyntheticEvent<HTMLElement>,
    data: FormProps,
    key: string
  ) => {
    setUser(Object.assign({}, user, { [key]: data.value }));
  };
  let history = useHistory();

  const handleUser = () => {
    if (editedUser && !editedUser.id) {
      addUser(user);
    } else {
      updateUser(user);
    }
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };
  return (
    <div className={styles.userDetails}>
      <Form size="large">
        <Form.Input
          label="First Name"
          placeholder="First Name"
          value={user.name}
          onChange={(event, data) => handleChange(event, data, 'name')}
        />
        <Form.Input
          label="Last Name"
          placeholder="Last Name"
          value={user.surName}
          onChange={(event, data) => handleChange(event, data, 'surName')}
        />

        <Form.Select
          fluid
          label="Role"
          options={roles}
          placeholder="Role"
          value={user.role}
          onChange={(event, data) => handleSubmit(event, data, 'role')}
        />

        <Form.Input
          label="Email"
          placeholder="Email"
          value={user.email}
          onChange={(event, data) => handleChange(event, data, 'email')}
        />

        {!editedUser.id && (
          <Form.Input
            label="Password"
            placeholder="Password"
            value={user.password}
            onChange={(event, data) => handleChange(event, data, 'password')}
          />
        )}

        <Form.Field className={styles.userButtons}>
          <Button color="red" inverted onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" color="green" onClick={handleUser}>
            Save
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default connector(UserDetails);
