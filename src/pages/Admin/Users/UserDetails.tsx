import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import User from "../../../models/user";
import { updateUser } from "../../../store/actions/updateUser";
import { addUser } from "../../../store/actions/addUser";
import { RootState } from "../../../store";
import styles from "./Users.module.css";

const validationGrid: any = {
  name: Yup.string()
    .min(5, "Too Short!")
    .max(40, "Too Long!")
    .required("First Name is required"),

  email: Yup.string().email("Email is invalid").required("Email is required"),
};

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
  const { id } = useParams();
  let editedUser = usersList.find((user) => user.id === id);
  if (!editedUser) {
    validationGrid.password = Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required");
    editedUser = {
      id: "",
      name: "",
      email: "",
      surName: "",
      role: "",
      password: "",
      imageUrl: "",
    };
  } else if (validationGrid.password) {
    delete validationGrid.password;
  }
  const validationSchema = Yup.object().shape(validationGrid);

  const [user] = useState({ ...editedUser });

  const roles = [
    { key: "admin", text: "Admin", value: "admin" },
    { key: "lector", text: "Lector", value: "lector" },
    { key: "student", text: "Student", value: "student" },
  ];

  const history = useHistory();

  const handleUser = async (user: User, formikActions: any) => {
    const result =
      editedUser && !editedUser.id
        ? await addUser(user)
        : await updateUser(user);
    if (result && result.err) {
      return formikActions.setErrors(result.err);
    }
    return history.goBack();
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    history.goBack();
  };
  const errorFormHandling = (touchedName: any, errorName: any) => {
    if (touchedName && typeof errorName !== "undefined") {
      return {
        content: errorName,
        pointing: "below",
      };
    }
    return false;
  };
  return (
    <div className={styles.userDetails}>
      <Formik
        initialValues={user}
        onSubmit={handleUser}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          isValid,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              id="name"
              name="name"
              label="First Name"
              placeholder="First Name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errorFormHandling(touched.name, errors.name)}
            />

            <Form.Input
              id="surName"
              name="surName"
              label="Last Name"
              placeholder="Last Name"
              value={values.surName}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Form.Select
              fluid
              id="role"
              name="role"
              label="Role"
              options={roles}
              placeholder="Role"
              value={values.role}
              onBlur={handleBlur}
              onChange={(event, data) => {
                setFieldValue("role", data.value);
              }}
            />

            <Form.Input
              id="email"
              name="email"
              label="Email"
              placeholder="Email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errorFormHandling(touched.email, errors.email)}
            />

            {!user.id && (
              <Form.Input
                type="password"
                id="password"
                name="password"
                label="Password"
                placeholder="Password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errorFormHandling(touched.password, errors.password)}
              />
            )}

            <Form.Field className={styles.userButtons}>
              <Button color="red" inverted onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" color="teal" disabled={!isValid}>
                Save
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connector(UserDetails);
