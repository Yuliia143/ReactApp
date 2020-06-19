import React, { useState } from "react";

import { Form, Button, Message } from "semantic-ui-react";

import http from "../../api/http";
import User from "../../models/user";

import "./User.css";

interface Props {
  user: User;
  updateProfile: (data: object) => void;
}

const EditEmail: React.FC<Props> = ({ user, updateProfile }: Props) => {
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const textInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const isEmailValid = (userEmail: string) => {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}/g;

    if (!emailPattern.test(userEmail)) {
      setError("Your email is invalid");
      setLoading(false);
      return false;
    }
    return true;
  };

  const getMessage = () => {
    if (error) {
      return <Message negative header={error} />;
    }
    if (success) {
      return <Message success header="Your email has been changed." />;
    }
    return null;
  };

  const saveFields = () => {
    setLoading(true);
    const valid = isEmailValid(email);
    if (!valid) return;

    const data = {
      oldData: {
        email: user.email,
      },
      newData: {
        email,
      },
    };

    http.put("/api/edit/editEmail", data).then((response) => {
      setLoading(false);
      setSuccess('Your email has been changed."');

      updateProfile({
        email,
      });

      if (response.data.message === "Email is already used") {
        setError("Email is already used");
      }
    });
  };

  return (
    <div className="edit-profile">
      <div className="edit-content">
        <div className="title-edit">Email</div>
        <div className="description-edit">Edit your email here</div>
        <div className="inputs">
          <Form loading={loading}>
            <Form.Field>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  onChange={textInputOnChange}
                  value={email}
                  name="email"
                  placeholder="Email"
                />
              </label>
            </Form.Field>
            <div className="save-btn">
              <Button disabled={!email} onClick={saveFields} color="red">
                Save
              </Button>
            </div>
          </Form>
        </div>
        <div>{getMessage()}</div>
      </div>
    </div>
  );
};

export default EditEmail;
