import React, { useState,useContext } from 'react';
import AuthContext from '../../Store/Auth';

import './Profile.css';


import { Container, Button, Form, FormGroup, FormLabel ,Row,Col} from 'react-bootstrap';
import './Profile.css';
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; //
import { useTranslation } from 'react-i18next';


const ChangePassword = () => {
   const {t} = useTranslation();
  const [blink, setBlink] = useState (false)
  const [loading,setLoading] =useState (false)
  const AuthCtx = useContext(AuthContext)
  const history = useHistory()

  const showPassword = () => {
    setBlink(!blink)
  }
  const [blink2, setBlink2] = useState (false)
  const showPassword2 = () => {
    setBlink2(!blink2)
  }
  const notify=()=>{
    toast.success('Succesfully updated',{autoClose:2000})
 }
 const validate = (values) => {
  const errors = {};
  const passwordRegex = /(?=.*[0-9])/;

  if (!values.oldPassword) {
    errors.oldPassword = " Old password password required";
  } 

  if (!values.newPassword) {
    errors.newPassword = "New password required";
  } else if (values.newPassword.length < 7) {
    errors.newPassword = "password needs to be 7 characters or more";
  } else if (!passwordRegex.test(values.newPassword)) {
    errors.newPassword = "Invalid password. Must contain one number.";
  }

  //if(!values.checkbox){
  //   errors.checkbox='please agree to the tirm'
  //}

  return errors;
};
const formik = useFormik({
  initialValues: {
    oldPassword: "",
    newPassword: "",
  },

  validate,

  onSubmit: (values, onreset) => {
    console.log(values)
    setLoading(true)
    fetch(
      ' http://xenoko-api.tejiz-dev.de/user/changePassword',
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
const oldPass =
formik.errors.oldPassword && formik.touched.oldPassword
  ?' IFlc  invalid'
  : `IFlc`;
  
const newPass =
formik.errors.newPassword && formik.touched.newPassword
?' IFlc  invalid'
: `IFlc`;
  return (
    <Container className='change'>
      <Form onSubmit={formik.handleSubmit}>
      <Row  className='d-flex justify-content-center'>
        <Col md={6}>
        <FormGroup>
          <FormLabel>Old Password</FormLabel>
            <div className='IconControl'>
              <span>
                <i className="fas fa-eye" onClick={showPassword}> </i>
              </span>
              <Form.Control className={oldPass} type={blink ?  "text" :"password"} placeholder={t("Old")} name='oldPassword'  value={formik.values.oldPassword} onChange={formik.handleChange}></Form.Control>
            </div>
        </FormGroup>
        {formik.errors.oldPassword && formik.touched.oldPassword ? (
            <p className='errorColor'>
              {formik.errors.oldPassword}
            </p>
          ) : null}
        </Col>
      </Row>
      <Row  className='d-flex justify-content-center'>
        <Col md={6}>
        <FormGroup>
            <FormLabel>New Password</FormLabel>
              <div className='IconControl'>
                <span>
                  <i className="fas fa-eye" onClick={showPassword2}> </i>
                </span>
                <Form.Control className={newPass} type={blink2 ? "text" :"password"} placeholder={t("New")} name='newPassword'  value={formik.values.newPassword} onChange={formik.handleChange}></Form.Control>
              </div>
          </FormGroup>
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <p className='errorColor'>{formik.errors.newPassword}</p>
          ) : null}
        </Col>
      </Row>
      <Row  className='d-flex justify-content-center'>
        <Col  md={6}>
        <Button className="bsubmit" type='submit'>{loading ? <Spinner animation="border" variant="light" size="sm"/>:t('Submit')}</Button>
        </Col>
      </Row>
        
         
           
      </Form>
    </Container>
  )
}

export default ChangePassword