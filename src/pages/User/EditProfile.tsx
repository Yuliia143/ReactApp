import React, { useState } from "react";

import { Form, Button, Message } from "semantic-ui-react";

import http from "../../api/http";
import User from "../../models/user";

import "./User.css";

interface Props {
  user: User;
  updateProfile: (data: object) => void;
  onSignOut: () => void;
}

const EditProfile: React.FC<Props> = ({
  user,
  updateProfile,
  onSignOut,
}: Props) => {
  const [userFullName, setUserFullName] = useState({
    name: user.name,
    surName: user.surName,
  });
  const userId = user._id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const textInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFullName((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError(false);
  };

  const isFieldsEmpty = () => {
    if (userFullName.name.length === 0 || userFullName.surName.length === 0) {
      setError(true);
    }
  };

  const getMessage = () => {
    if (error) {
      return <Message negative header="All fields are required." />;
    }

    return null;
  };

  const deleteAccount = () => {
    const token = localStorage.getItem("Access-Token");
    const requestOptions = {
      headers: {
        "Access-Token": token,
      },
    };
    http
      .remove(`/api/users/${userId}`, requestOptions)
      .then(() => {
        setLoading(false);
        onSignOut();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const saveFields = () => {
    setLoading(true);

    const data = {
      oldData: {
        email: user.email,
      },
      newData: {
        first_name: userFullName.name,
        surName: userFullName.surName,
      },
    };

    http
      .put("/api/edit/editName", data)
      .then(() => {
        setLoading(false);
        updateProfile({
          name: userFullName.name,
          surName: userFullName.surName,
        });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="edit-profile">
      <div className="edit-content">
        <div className="title-edit">Public profile</div>
        <div className="description-edit">Add information about yourself</div>
        <div className="inputs">
          <Form loading={loading} onSubmit={isFieldsEmpty}>
            <Form.Field>
              <label htmlFor="firstName">
                First Name
                <input
                  id="firstName"
                  onChange={textInputOnChange}
                  value={userFullName.name}
                  name="name"
                  placeholder="First Name"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="lastName">
                Last Name
                <input
                  id="lastName"
                  onChange={textInputOnChange}
                  value={userFullName.surName}
                  name="surName"
                  placeholder="Last Name"
                />
              </label>
            </Form.Field>
            <div className="save-btn">
              <Button onClick={saveFields} color="red">
                Save
              </Button>
            </div>
          </Form>
          <div className="deleteAcc">
            <Button onClick={deleteAccount} color="red">
              Delete account
            </Button>
          </div>
        </div>
        <div>{getMessage()}</div>
      </div>
    </div>
  );
};

export default EditProfile;
