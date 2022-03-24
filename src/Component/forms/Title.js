import React, { Fragment,useState, useContext, useRef} from "react";
import classes from "./Title.module.css";
import AuthContext from "../Store/Auth";
import { useFormik } from "formik";
import{ FaTimesCircle} from 'react-icons/fa'
import {Spinner} from 'react-bootstrap'
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import {useTranslation} from 'react-i18next'

 

const Title = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const[isLoading,setIsLoading] =useState(false)
  const [error,setError]=useState('')
  const AuthCtx=useContext(AuthContext)

  
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

 // if (!values.email) {
 //   errors.email = "email required";
 // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 //   errors.email = "Invalid email address";
 // }

 if (!values.telephone1) {
  errors.telephone1 = t('FNEM');
} else if (values.telephone1.length  < 9) {
  errors.telephone1 = t('TNEM1');
}
 if (values.telephone2.length  < 9) {
  errors.telephone2 = t('TNEM1');
}
if (values.telephone3.length  < 9) {
  errors.telephone3 = t('TNEM1');
}


 if (!values.salary) {
   errors.salary = t('FNEM');
 } 

 if (!values.address) {
  errors.address = t('FNEM');
}

if (!values.date) {
  errors.date = t('FNEM');
}

 if(!values.status) {
   errors.status= t('FNEM')
 }
 return errors;
};

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      telephone1: "",
      telephone2: "",
      telephone3: "",
      address: "",
      date: "",
      status: "",
      salary:""
    },
    validate,
    onSubmit: (values,onreset) => {
      const fetchHandler = async () => {
        setIsLoading(true)
        try {
         
          //http://192.168.100.74:4040/user/proprietor
          const response = await fetch(
            "http://xenoko-api.tejiz-dev.de/user/add-driver",
            {
              method: "PUT",
              body: JSON.stringify({
                firstName:values.firstName,
                lastName :values.lastName,
                email:values.email,
                telephone1:values.telephone1,
                telephone2:values.telephone2,
                telephone3:values.telephone3,
                address:values.address,
                date:values.date,
                salary:values.salary,
                status:values.status

              }),
              headers: {
                 Authorization :'Bearer ' + AuthCtx.token,
                "Content-Type": "application/json",
              },
            }
          );
    
          
          if (response.status == 201) {
            setIsLoading(false)
            notify()
            setError('')
            setIsLoading(false)
            onreset.resetForm(
              {
                firstName: "",
                lastName: "",
                email: "",
                telephone: "",
                address: "",
                date: "",
                status: "",
              }
          )
           
           
          }
          if (!response.ok == 422) {
            throw new Error('An Error occured');
          }
          if (!response.ok ) {
            throw new Error('An Error occured');
          }
          const infos = await response.json();
        } catch (error) {
          setError(error.message)
          setIsLoading(false)
        }
        props.Fetch2()
        
      };
      fetchHandler()
      
  
      //  props.submitC(values)
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
    formik.errors.telephone1 && formik.touched.telephone1
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
      const telClasses2 =
      formik.errors.telephone2 && formik.touched.telephone2
        ? `${classes.IFlc} ${classes.invalid}`
        : `${classes.IFlc}`;
        const telClasses3 =
      formik.errors.telephone3 && formik.touched.telephone3
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
      const salaryClasses =
      formik.errors.salary && formik.touched.salary
        ? `${classes.IFlc} ${classes.invalid}`
        : `${classes.IFlc}`;
   
  return (
    <div className={classes.form} ref={ref}>
      <div className={classes.title_box}>
        <FaTimesCircle className={classes.faicon} onClick={props.onClick}/>
        <p className={classes.title_text}>{t('DriverF')}</p>
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          <label htmlFor="telephone1">{t('Telephone')}</label>
          <br></br>
          <input
            type="text"
            id="telephone1"
            name="telephone1"
            className={telClasses}
            placeholder="e.g:  000 000 000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone1}
          />
           {formik.errors.telephone1 && formik.touched.telephone1 ? (
            <p className={classes.errorColor}>{formik.errors.telephone1}</p>
          ) : null}
           <label htmlFor="telephone2">{t('Telephonetwo')}</label>
          <br></br>
          <input
            type="text"
            id="telephone2"
            name="telephone2"
            className={telClasses2}
            placeholder="e.g:  000 000 000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone2}
          />
           {formik.errors.telephone2 && formik.touched.telephone2 ? (
            <p className={classes.errorColor}>{formik.errors.telephone2}</p>
          ) : null}
           <label htmlFor="telephone3">{t('Telephonethree')} </label>
          <br></br>
          <input
            type="text"
            id="telephone3"
            name="telephone3"
            className={ telClasses3}
            placeholder="e.g:  000 000 000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone3}
          />
            {formik.errors.telephone3 && formik.touched.telephone3 ? (
            <p className={classes.errorColor}>{formik.errors.telephone3}</p>
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
          <label htmlFor="date">{t('Date')}</label>
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
           <label htmlFor="salary">{t('Salary')}</label>
          <br></br>
          <input
            type="number"
            id="salary"
            name="salary"
            className={salaryClasses}
           
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salary}
          />
            {formik.errors.salary && formik.touched.salary? (
            <p className={classes.errorColor}>{formik.errors.salary}</p>
          ) : null}
          <label htmlFor="status">{t('Status')}</label>
          <br></br>
          <select
            id="status"
            name="status"
            className={classes.select}
            value={formik.values.status}
            onChange={formik.handleChange}
            placeholder='choose a status'
          >
            <option value="" disabled selected hidden>{t("ChooseSTS")}</option>
            <option value="Actif">{t('Active')}</option>
            <option value="Inactif">{t('Inactive')}</option>
          </select>
          {formik.errors.status && formik.touched.status ? (
            <p className={classes.errorColor}>{formik.errors.status}</p>
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
export default Title;
