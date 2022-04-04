import React, { useState, useContext } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Button, Form ,Spinner} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import ImageL from '../../Images/login.svg'
import ImageL1 from '../../Images/xenoko no name.svg'
import  AuthContext from "../../Store/Auth";
import { useLocation,useHistory} from "react-router-dom";
import Cookies from 'js-cookie'
const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values,setValues]=useState([])
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
 

  if (authCtx.isLoading) {
    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from)
  }

  const showHandler = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "email required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    const passwordRegex = /(?=.*[0-9])/;

    if (!values.password) {
      errors.password = "password required";
    } else if (values.password.length < 7) {
      errors.password = "password needs to be 7 characters or more";
    } 
    // else if (!passwordRegex.test(values.password)) {
    //   errors.password = "Invalid password. Must contain one number.";
    // }

    //if(!values.checkbox){
    //   errors.checkbox='please agree to the tirm'
    //}

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      checkbox: false,
    },

    validate,

    onSubmit: (values, onReset) => {
      
     
      const { email, password } = values;
      // http://xenoko-api.tejiz-dev.de/auth/login
      // http://192.168.100.74:4040/auth/login
      // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4gwFF5jLrx0lQh8dvTs2FbwMSEBpxHOE

      setIsLoading(true);
      fetch(
        " http://xenoko-api.tejiz-dev.de/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )
        .then((res) => {
          
          if (res.ok) {
            onReset.resetForm({
              email: "",
              password: "",
              checkbox: false,
            });
            return res.json();
          } else {
            return res.json().then((token) => {
              throw new Error("Wrong email or password");
            });
          }
        })
        .then((data) => {
          const items ={
            role:data.role,
            id:data.propId
          }
            const remainingMilliseconds = 60 * 60 * 1000;
            const expirationTime = new Date(
                  new Date().getTime() + +remainingMilliseconds
                );

                // Cookies.set('role', '' + data.role) 
                Cookies.set('role', '' + data.role)
                Cookies.set('id', '' + data.propId)
                localStorage.setItem('role', data.role)
                authCtx.login(data.idToken,expirationTime.toISOString(),items);
                          
        }).then((data)=>{
          const { from } = location.state || { from: { pathname: "/" } };
          history.replace(from)
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
         
        });
       
    },
  });
 
  const EmailClasses =
    formik.errors.email && formik.touched.email ? "I-F-l invalid2" : "I-F-l";
  const passwordClasses =
    formik.errors.password && formik.touched.password
      ? "I-F-l invalid2"
      : "I-F-l";

      
  return (
    <div className="login">
      <Container className="contain-l ">
        <Row classs>
          <Col>
            <img
              className="login-logo"
              src={ImageL1}
              alt="login"
            ></img>
          </Col>
        </Row>
        <Row className="login-row  mx-0  d-flex justify-content-center">
          <Col className="mr-3 hidee">
            <img src={ImageL} alt="login"></img>
          </Col>
          <Col>
            <div>
              <Row className=" d-flex justify-content-center">
                <Col className="d-flex justify-content-center pb-4  ">
                  <h2 className="h2-ll">Welcome</h2>
                </Col>
              </Row>
              <Row className="rows-l  d-flex justify-content-center ">
                <Col className="d-flex justify-content-center ">
                  <h6 className="h6-l">Login to your account</h6>
                </Col>
              </Row>
              <Row className="rows-l d-flex justify-content-center ">
                <Col className="hideee d-flex justify-content-center">
                  <img
                    className="img-r"
                    src={ImageL}
                    alt="login"
                  ></img>
                </Col>
              </Row>
              <Row className=" d-flex justify-content-center">
                <Col className="ml-4 ">
                  <Form onSubmit={formik.handleSubmit}>
                    <Row className="pb-4 d-flex justify-content-center">
                      <Col className="F-g">
                        <Form.Group className="mb-3 input-icon">
                          <Form.Control
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className={EmailClasses}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <span>
                            {" "}
                            <i className="fas fa-envelope d-flex  "></i>
                          </span>
                          {formik.errors.email && formik.touched.email ? (
                            <p className="error-color">{formik.errors.email}</p>
                          ) : null}
                         
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="pb-4 d-flex justify-content-center">
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
                    <Row className="d-flex justify-content-center">
                      <Col className="p-do">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox1"
                        >
                          <Form.Check
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            label="remember"
                            value={formik.values.checkbox}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Link to='/mailing'><p className="p-do">forgot password</p></Link>
                        
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
                    {
                        isLoading &&   <Spinner animation="grow" variant="warning" />
                      }
                    <p className="error-color d-flex justify-content-center">{error}</p>
                      
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-center ">
                        <p className="p-do">Do you want to have an account ?</p>
                          <a className=" re-l ml-2" href="http://xenoko.tejiz-dev.de/">
                            Register
                          </a>
                      </Col>
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

export default Login;
