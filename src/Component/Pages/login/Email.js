import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import ImageL from '../../Images/login.svg'
import ImageL1 from '../../Images/xenoko no name.svg'

const Email = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.mail) {
      errors.mail = "email required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      mail: "",
    },
    validate,

    onSubmit: (values, onReset) => {
      console.log(values);

      setIsLoading(true);
      fetch(
        "http://192.168.100.74:4040/auth/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
           email:values.mail
          }),
        }
      )
        .then((res) => {

          if (res.status === 200) {
           console.log(res.data)
            return res.json();
          } else {
            return res.json().then((token) => {
              throw new Error("Wrong email ");
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);

        });
    },
  });

  const emailClasses =
    formik.errors.mail && formik.touched.mail ? "I-F-l invalid" : "I-F-l";

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
                  <h6 className="h6-l">Enter your e-mail address</h6>
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
                            id="email"
                            name="mail"
                            type="email"
                            placeholder="email"
                            className={emailClasses}
                            value={formik.values.mail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <span>
                            {" "}
                            <i className="fas fa-envelope d-flex  "></i>
                          </span>

                          {formik.errors.mail && formik.touched.mail ? (
                            <p className="error-color">{formik.errors.mail}</p>
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

export default Email;
