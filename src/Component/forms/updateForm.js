import {useContext,useState,useEffect,useCallback}from 'react'
import classes from "./TitleP.module.css";
import { useFormik}  from "formik";
import{ FaTimesCircle} from 'react-icons/fa'
import { Spinner } from 'react-bootstrap';
import AuthContext from '../Store/Auth';
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next"

const UpdateForm = (props) => {
  const {t} = useTranslation();
  const [formValues,setFormvalues] = useState(null)
  const[isLoading,setIsLoading] =useState(false)
  const [error,setError]=useState('')
  
  const AuthCtx = useContext(AuthContext);
  const notify=()=>{
    toast.success('Updated successfully',{autoClose:2000})
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
  const  initialValues={
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
   address: "",
    date: "",
  }

  const  savedValues={  
   
    firstName: props.transfer.firstName,
    lastName:props.transfer.lastName,
    email: props.transfer.email,
    telephone: props.transfer.tel,
    address: props.transfer.address,
    date: props.transfer.date,
   
  }
  const setValueHandler =useCallback(()=>{
    setFormvalues(savedValues)
   },[])

   useEffect(()=>{
    setValueHandler()
   },[ setValueHandler])

    const formik = useFormik(  {
        initialValues: formValues||initialValues ,
        validate,
        enableReinitialize:true,
        onSubmit: (values,onreset) => {
          console.log(values)
          setIsLoading(true)
            fetch(
               ` http://xenoko-api.tejiz-dev.de/user/edit-proprietor/${props.transfer.id}`,
                {
                  method: "PUT",
                  headers: { 
                    "Content-Type": "application/json" ,  
                    Authorization: "Bearer " + AuthCtx.token,
                },
                  body: JSON.stringify(values),
                }
              )
                .then((res) => {
                  if (res.status === 200){
                    props.Fetch2()
                    notify()
                    setError('')
                    return res.json();
                  } else {
                    throw new Error('Something went wrong!')
                  }
                })
                .catch((err) => {
                  setError(err.message)
                  setIsLoading(false)
                });
                setIsLoading(false)
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
        <div className={classes.form} >
        <div className={classes.title_box}>
        <FaTimesCircle className={classes.faicon} onClick={props.hide}/>
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
            <label htmlFor="firstname">First Name</label>
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
            <label htmlFor="lastname">Last Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="telephone">Telephone</label>
            <br></br>
            <input
              type="text"
              id="phone"
              name="telephone"
              className={telClasses}
              placeholder="e.g: +237 000 000 000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telephone}
            />
             {formik.errors.telephone && formik.touched.telephone ? (
              <p className={classes.errorColor}>{formik.errors.telephone}</p>
            ) : null}
            <label htmlFor="address">address</label>
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
            <label htmlFor="date">Date of birth</label>
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
             <p className={classes.errMessage}>{error}</p>
              <div className={classes.spine}>   {isLoading && <Spinner animation="grow" variant="light" />}</div>
              <p className={classes.errMessage}>{error}</p>
            <div className={classes.lineT}>
              <div className={classes.line}></div>
              <div className={classes.footer}>
                <button onClick={props.hide}>Cancel</button>
                <button type="submit">Next</button>
                {/* <button type='button' onClick={setValueHandler}>Nexttt</button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default UpdateForm
