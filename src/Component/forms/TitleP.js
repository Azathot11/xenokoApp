import React, { Fragment,useState, useContext, useRef} from "react";
import classes from "./TitleP.module.css";
import AuthContext from "../Store/Auth";

import {Spinner} from 'react-bootstrap'
import { useFormik } from "formik";
import{ FaTimesCircle} from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const TitleP = React.forwardRef((props, ref) => {
  const {t}= useTranslation();
  const AuthCtx=useContext(AuthContext)
  const[isLoading,setIsLoading] =useState(false)
  const [error,setError]=useState('')
  const [message,setMessage]=useState('')
  const componentIsMounted = useRef(true)
  const notify=()=>{
    toast.success('Succesfully created',{autoClose:2000})
 }
 const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName =t('FNEM');
  } else if (values.firstName.length < 3) {
    errors.firstName =t('FNEM1');
  } else if (!/^[a-zA-Z]*$/g.test(values.firstName)) {
    errors.firstName = t('FNEM2');
  }

  if (!values.lastName) {
    errors.lastName = t('FNEM');
  } else if (values.lastName.length < 3) {
    errors.lastName = t('LNEM1');
  } else if (!/^[a-zA-Z]*$/g.test(values.lastName)) {
    errors.lastName =  t('FNEM2');
  }

  if (!values.email) {
    errors.email = t('FNEM');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email =t('ENEM1');
  }

  if (!values. telephone) {
    errors. telephone = t('FNEM');
  } else if (values.telephone.length  < 9) {
    errors.telephone = t('TNEM1');
  }

  if (!values.address) {
    errors.address = t('FNEM');
  }

  if (!values.date) {
    errors.date = t('FNEM');
  }

  
  return errors;
};
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
     address: "",
      date: "",
     
    },
    validate,
    onSubmit: (values,onreset) => {
      const fetchHandler = async () => {
        setIsLoading(true)
        try {
         
          //http://192.168.100.74:4040/user/proprietor
          const response = await fetch(
            "http://xenoko-api.tejiz-dev.de/user/proprietor",
            {
              method: "PUT",
              body: JSON.stringify({
                firstName:values.firstName,
                lastName :values.lastName,
                email:values.email,
                telephone:values.telephone,
                address:values.address,
                date:values.date,
              }),
              headers: {
                 Authorization :'Bearer ' + AuthCtx.token,
                "Content-Type": "application/json",
              },
            }
          );
    
          
          if (response.status == 201) {
            notify()
            setError('')
            onreset.resetForm(
              {
                firstName: "",
                lastName: "",
                email: "",
                telephone: "",
               address: "",
                date: "",
              
              }
          )
          }
          if (response.status == 403) {
            throw new Error('Email already exist');
          }
          if (response.status == 422) {
            throw new Error('An Error occured');
          }

          const infos = await response.json();
    
          //window.location.href = "http://localhost:3001/";
        } catch (error) {
          setError(error.message)
         
        }
        setIsLoading(false)
        props.Fetch2()
      };
      fetchHandler()
    },
  });

  const firstClasses =
    formik.errors.firstName && formik.touched.firstName
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const lastClasses =
    formik.errors.lastName && formik.touched.lastName
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const EmailClasses =
    formik.errors.email && formik.touched.email
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const telClasses =
    formik.errors.telephone && formik.touched.telephone
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const dateClasses =
    formik.errors.date && formik.touched.date
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const addressClasses =
    formik.errors.address && formik.touched.address
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  return (
    <div className={classes.form} ref={ref}>
      <div className={classes.title_box}>
        <FaTimesCircle className={classes.faicon} onClick={props.onClick}/>
        <p className={classes.title_text}>{t('ProprietorF')}</p>
      </div>

      <div className={classes.personal}>
        <p>Personal Indication</p>
      </div>

      {/* <div className={classes.photo}>
        <div className={classes.buttons_photo}>
          <button></button>
          <button></button>
        </div>
      </div> */}
      <div className={classes.data_form}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstname">{t('firstname')}</label>
          <br></br>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={firstClasses}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <p className={classes.errorColor}>{formik.errors.firstName}</p>
          ) : null}
          <label htmlFor="lastname">{t('Latsname')}</label>
          <br></br>
          <input
            type="text"
            id="lastname"
            className={lastClasses}
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <p className={classes.errorColor}>{formik.errors.lastName}</p>
          ) : null}
          <label htmlFor="email">{t('Email')}</label>
          <br></br>
          <input
            type="email"
            id="email"
            name="email"
            className={EmailClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className={classes.errorColor}>{formik.errors.email}</p>
          ) : null}
          <label htmlFor="telephone">{t('Telephone')}</label>
          <br></br>
          <input
            type="text"
            id="telephone"
            name="telephone"
            className={telClasses}
            placeholder="e.g: 000 000 000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone}
          />
          {formik.errors.telephone && formik.touched.telephone ? (
            <p className={classes.errorColor}>{formik.errors.telephone}</p>
          ) : null}
          <label htmlFor="address">{t('Address')}</label>
          <br></br>
          <input
            type="text"
            id="address"
            name="address"
            className={addressClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.errors.address && formik.touched.address ? (
            <p className={classes.errorColor}>{formik.errors.address}</p>
          ) : null}
          <label htmlFor="date">{t('DateOfBirth')}</label>
          <br></br>
          <input
            type="date"
            name="date"
            className={dateClasses}
            min="1900-01-01"
            max="2100-12-31"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date ? (
            <p className={classes.errorColor}>{formik.errors.date}</p>
          ) : null}
          <div className={classes.spine}>   {isLoading && <Spinner animation="grow" variant="light" />}</div>
          <p className={classes.errMessage}>{error}</p>
        
          <div className={classes.lineT}>
            <div className={classes.line}></div>
            <div className={classes.footer}>
              <button onClick={props.onClick}>{t('Cancel')}</button>
              <button type="submit">{t('Submit')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default TitleP;
