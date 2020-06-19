import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./SignIn.css";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import * as Yup from "yup";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { signIn } from "../../store/actions/auth";
import { Credential } from "../../models/credential";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),

  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignIn = ({ onSignIn, history }: any) => {
  const handleSignIn = async (credential: Credential, formikActions: any) => {
    const result = await onSignIn(credential, false);
    if (!result) {
      history.push("/");
    }
    if (result && result.err) {
      formikActions.setErrors(result.err);
    }
  };

  const responseGoogle = async ({
    profileObj: { email, familyName, givenName, imageUrl },
  }: any) => {
    const result = await onSignIn(
      {
        name: givenName,
        email,
        surName: familyName,
        imageUrl,
      },
      true
    );
    if (!result) {
      history.push("/");
    }
  };

  const responseFacebook = async (res: any) => {
    if (Object.prototype.hasOwnProperty.call(res, 'email') === true) {
      const {
        email,
        first_name,
        last_name,
        picture: {
          data: { url },
        },
      } = res;
      const response = await onSignIn(
        {
          name: first_name,
          surName: last_name,
          email,
          imageUrl: url,
        },
        true
      );
      if (!response) {
        history.push("/");
      }
    }

  };

  return (
    <div className="modalContentIn">
      <div className="headerPopIn">
        <h4 className="logClassIn">Log In to Your StudyHard Account!</h4>
      </div>
      <hr />
      <div className="fieldsIn">
        <p className="logText fieldsIn">
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
            fields="name,email,picture, first_name, last_name"
            callback={responseFacebook}
            cssClass="facebookButton"
            render={
              <Button className="buttonsSignIn">Continue with Facebook</Button>
            }
          />
        </p>
        <p className="logText fieldsIn">
          <GoogleLogin
            clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
            render={(renderProps) => (
              <Button className="buttonsSignIn" onClick={renderProps.onClick}>
                Continue with Google
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="btn btn-outline-danger"
          />
        </p>
        <p className="logText fieldsIn">
          <Button className="buttonsSignIn">Continue with Apple</Button>
        </p>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSignIn}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            isSubmitting,
            isValid,
            errors,
            touched,
          }) => (
            <Form>
              <div className="inpAreaIn">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  className={`form-control${
                    errors.email && touched.email ? " is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  className={`form-control${
                    errors.password && touched.password ? " is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="logBtnIn fieldsIn">
                {isSubmitting && "Loading"}
                <Button
                  className="buttonsSignIn"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  onClick={() => handleSubmit}
                >
                  Log In
                </Button>
              </div>
              <div className="changeAccIn">
                <p className="forgotPassword">or Forgot Password</p>
                <p className="newAcc">Don&apos;t have an account? Sign Up</p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSignIn: (credential: any, googleOrFacebook: boolean) =>
      dispatch(signIn(credential, googleOrFacebook)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
