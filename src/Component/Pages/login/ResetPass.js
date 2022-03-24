import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import ImageL from '../../Images/login.svg'
import ImageL1 from '../../Images/xenoko no name.svg'

const ResetPass = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const showHandler = () => {
    setShowPassword(!showPassword);
  };

  const showHandler2 = () => {
    setShowPassword2(!showPassword2);
  };

  const validate = (values) => {
    const errors = {};

    const passwordRegex = /(?=.*[0-9])/;

    if (!values.password) {
      errors.password = "password required";
    } else if (values.password.length < 7) {
      errors.password = "password needs to be 7 characters or more";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Invalid password. Must contain one number.";
    }

    if (!values.password2) {
      errors.password2 = "confirm password required";
    } else if (values.password2.length < 7) {
      errors.password2 = "confirm password needs to be 7 characters or more";
    } else if (!passwordRegex.test(values.password2)) {
      errors.password2 = "Invalid password. Must contain one number.";
    }

    //if(!values.checkbox){
    //   errors.checkbox='please agree to the tirm'
    //}

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password2: "",
      password: "",
      checkbox: false,
    },

    validate,

    onSubmit: (values, onReset) => {
      const { email, password } = values;
      console.log(values);
      //http://xenoko-api.tejiz-dev.de/auth/login
      //http://192.168.100.74:4040/auth/login
      //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4gwFF5jLrx0lQh8dvTs2FbwMSEBpxHOE

      // setIsLoading(true);
      // fetch(
      //   "",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       email,
      //       password,
      //     }),
      //   }
      // )
      //   .then((res) => {

      //     if (res.ok) {
      //       onReset.resetForm({
      //         email: "",
      //         password: "",
      //         checkbox: false,
      //       });
      //       return res.json();
      //     } else {
      //       return res.json().then((token) => {
      //         throw new Error("Wrong email or password");
      //       });
      //     }
      //   })
      //   .then((data) => {
      //     console.log(data)

      //   })

      //   .catch((err) => {
      //     setIsLoading(false);
      //     setError(err.message);

      //   });
    },
  });

  const passWordClasses =
    formik.errors.password2 && formik.touched.password2
      ? "I-F-l invalid"
      : "I-F-l";
  const passwordClasses =
    formik.errors.password && formik.touched.password
      ? "I-F-l invalid"
      : "I-F-l";
  return (
    <div className="login">
      <Container className="contain-l">
        <Row classs>
          <Col>
            <img className="login-logo" src={ImageL1} alt="login"></img>
          </Col>
        </Row>
        <Row className="login-row">
          <Col className="mr-3 hidee">
            <img src={ImageL} alt="login"></img>
          </Col>
          <Col>
            <div>
              <Row>
                <Col className="d-flex justify-content-center pb-4  ">
                  <h2 className="h2-ll">Welcome Back</h2>
                </Col>
              </Row>
              <Row className="rows-l">
                <Col className="d-flex justify-content-center ">
                  <h6 className="h6-l">Reset your password</h6>
                </Col>
              </Row>
              <Row className="rows-l">
                <Col className="hideee d-flex justify-content-center">
                  <img className="img-r" src={ImageL} alt="login"></img>
                </Col>
              </Row>
              <Row>
                <Col className="ml-4">
                  <Form onSubmit={formik.handleSubmit}>
                    <Row className="pb-4">
                      <Col className="F-g">
                        <Form.Group className="mb-3 input-icon ">
                          <Form.Control
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            className={passwordClasses}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <span onClick={showHandler}>
                            {" "}
                            <i className="bi bi-eye d-flex justify-content-end"></i>
                          </span>

                          {formik.errors.password && formik.touched.password ? (
                            <p className="error-color">
                              {formik.errors.password}
                            </p>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="pb-4">
                      <Col className="F-g">
                        <Form.Group className="mb-3 input-icon">
                          <Form.Control
                            id="password2"
                            name="password2"
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Confirm password"
                            className={passWordClasses}
                            value={formik.values.password2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <span onClick={showHandler2}>
                            {" "}
                            <i className="bi bi-eye d-flex justify-content-end"></i>
                          </span>
                          {formik.errors.password2 &&
                          formik.touched.password2 ? (
                            <p className="error-color">
                              {formik.errors.password2}
                            </p>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="d-flex justify-content-center pb-4 ">
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn-2"
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      {isLoading && (
                        <Spinner animation="grow" variant="warning" />
                      )}
                      <p className="error-color d-flex justify-content-center">
                        {error}
                      </p>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPass;
