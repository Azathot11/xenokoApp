import React, { useState, useEffect, useCallback, useContext } from 'react';


import './Profile.css';
import AuthContext from '../../Store/Auth';
import ChangePassword from './ChangePassword';
import Image3 from '../../Images/Avatar.png'
import classes from "../.././forms/Car.module.css";
import Photo from '../Bridge/Photo'

import { Container, Row, Col, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom'; //
import { toast } from "react-toastify";
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next';


const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 3) {
    errors.firstName = "firstName must be atleast 3 letters";
  }

  if (!values.lastName) {
    errors.lastName = "lastName required";
  } else if (values.lastName.length < 3) {
    errors.lastName = "lastName must be atleast 3 letters";
  }

  if (!values.email) {
    errors.email = 'email required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }


  if (!values.telephone) {
    errors.telephone = "telephone  required";
  }

  if (!values.password) {
    errors.password = "password required";
  }
  return errors;
};
const UserProfile = (props) => {
  const {t} =useTranslation()
  const [resetP, setResetP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const [formValues, setFormvalues] = useState(null)
  const [modalIsopen,setModalIsOpen] = useState(false)
  const history = useHistory()
  const AuthCtx = useContext(AuthContext)
  Modal.setAppElement('#root')

  const toggleModalHandler= ()=>{
    setModalIsOpen(true)
  }

  const closeToggleModalHandler =()=>{
    setModalIsOpen(false)
  }
  const showResetForm = () => {
    setResetP(!resetP)
  }
  const notify = () => {
    toast.success('Succesfully updated ', { autoClose: 2000 })
  }

  const fetChing = useCallback(async (infos) => {

    const res = await fetch(" http://xenoko-api.tejiz-dev.de/user/home", {
      headers: {
        Authorization: "Bearer " + AuthCtx.token,
      },
    });
    const data = await res.json();

    setUser(data.user);
    setFormvalues({
      firstName: data.user.firstname,
      lastName: data.user.lastname,
      email: data.user.email,
      telephone: data.user.telephone,
      password: '',

    })
    setUserProfile(data.user.profile)

  }, [])

  useEffect(() => {
    fetChing()
  }, [fetChing]);


  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    password: '',
  }



  const formik = useFormik({
    initialValues: formValues || initialValues,
    validate,
    enableReinitialize: true,
    onSubmit: (values, onreset) => {
      console.log(values)
      setLoading(true)
      fetch(
        ' http://xenoko-api.tejiz-dev.de/user/modifyUser',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AuthCtx.token,
          },
          body: JSON.stringify(values),
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setLoading(false)
            notify()
            history.replace('/login')
          }
          if (!res.ok) {
            throw new Error('Something went wrong')
          }
        })
        .catch((err) => {
          setLoading(false)
          // setError(err.message)

        });
    },
  });
  const fistNameClasses =
    formik.errors.firstName && formik.touched.firstName
      ? ' IFlc  invalid'
      : `IFlc`;

  const lastNameClasses =
    formik.errors.lastName && formik.touched.lastName
      ? ' IFlc  invalid'
      : `IFlc`;
  const telephoneClasses =
    formik.errors.telephone && formik.touched.telephone
      ? ' IFlc  invalid'
      : `IFlc`;
  const emailClasses =
    formik.errors.email && formik.touched.email
      ? ' IFlc  invalid'
      : `IFlc`;
  const passwordClasses =
    formik.errors.password && formik.touched.password
      ? ' IFlc  invalid'
      : `IFlc`;

  return (
    <>
    <Modal 
    isOpen={modalIsopen}
    onRequestClose={()=> setModalIsOpen(false)}
    className='Modal'
    overlayClassName='Overlay'
    >
    
      <Photo links={' http://xenoko-api.tejiz-dev.de/user/addProfile'} fetching={props.fetching2} fetching2={fetChing} close={closeToggleModalHandler}/>
    </Modal>

    <div className="profile">
      <div className='contain'>
        <Container>
          <div className='profS'>
            <div className='photoDp'>
              {!userProfile ? <img src={Image3} alt='profilr picture' />: <img src={' http://xenoko-api.tejiz-dev.de/' + userProfile} alt='profile'></img> }
            </div>
            <div className='editPp' onClick={toggleModalHandler}>
              <i class="fas fa-edit"></i>
            </div>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Row className='d-flex justify-content-center'>

              <Col md={6}>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <Form.Control className={fistNameClasses} type="text" placeholder='First Name' name='firstName' value={formik.values.firstName} onChange={formik.handleChange} />
                </FormGroup>
              </Col>
              {formik.errors.firstName && formik.touched.firstName ? (
                <p className={classes.errorColor}>
                  {formik.errors.firstName}
                </p>
              ) : null}

            </Row>
            <Row className='d-flex justify-content-center'>
              <Col md={6}>
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <Form.Control className={lastNameClasses} type="text" placeholder='Last Name' name='lastName' value={formik.values.lastName} onChange={formik.handleChange}></Form.Control>
                </FormGroup>
              </Col>
              {formik.errors.lastName && formik.touched.lastName ? (
                <p className={classes.errorColor}>
                  {formik.errors.lastName}
                </p>
              ) : null}
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control className={telephoneClasses} type="phone" placeholder="Telephone" name='telephone' value={formik.values.telephone} onChange={formik.handleChange} />
                </Form.Group>
                {formik.errors.telephone && formik.touched.telephone ? (
                  <p className={classes.errorColor}>{formik.errors.telephone}</p>
                ) : null}
              </Col>
            </Row>

            <Row className='d-flex justify-content-center'>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control className={emailClasses} type="email" placeholder="Enter email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                </Form.Group>
                {formik.errors.email && formik.touched.email ? (
                  <p className={classes.errorColor}>{formik.errors.email}</p>
                ) : null}
              </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control className={passwordClasses} type="password" placeholder="Enter password" name='password' value={formik.values.password} onChange={formik.handleChange} />
                </Form.Group>
                {formik.errors.password && formik.touched.password ? (
                  <p className={classes.errorColor}>{formik.errors.password}</p>
                ) : null}
              </Col>
            </Row>

            {/* <Row>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Location" />
              </Form.Group>
            </Row>
            <Row>
              <FormGroup>
                <FormLabel>Date of birth</FormLabel>
                <Form.Control type="text" placeholder='dd/mm/yyyy'></Form.Control>
              </FormGroup>
              
            </Row> */}
            <Row className='d-flex justify-content-center'>
              <Col md={6}>
                <Button className="bsubmit" type='submit'>{loading ? <Spinner animation="border" variant="light" size="sm" /> : t('Save')}</Button>
                {/* <button type ='submit'>{loading ? <Spinner animation="border" variant="light" size="sm" /> : 'Save'} </button> */}
              </Col>
            </Row>

          </Form>
          <Row className='d-flex justify-content-center'>
            <Col md={6}>
              <p className="chP" onClick={showResetForm}> {t('ChangePassword')}</p>
            </Col>
          </Row>

          {resetP && <ChangePassword />}
        </Container>
      </div>

    </div>
    </>
  );
}

export default UserProfile;
