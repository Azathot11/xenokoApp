import React, { useState } from "react";
import classes from "./TitleP.module.css";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 3) {
    errors.firstName = "Firstname must be more than 2 letters";
  } else if (!/^[a-zA-Z]*$/g.test(values.firstName)) {
    errors.firstName = "Only letters can be entered";
  }

  if (!values.lastName) {
    errors.lastName = "lastname required";
  } else if (values.lastName.length < 3) {
    errors.lastName = "lastname must be atleast 3 letters";
  } else if (!/^[a-zA-Z]*$/g.test(values.lastName)) {
    errors.lastName = "Only letters can be entered";
  }

  if (!values.email) {
    errors.email = "email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.telephone) {
    errors.telephone = "Tel required";
  } else if (values.telephone.length === 9) {
    errors.telephone = "Enter a valid phone number";
  }

  if (!values.location) {
    errors.location = " loaction required";
  }

  if (!values.date) {
    errors.date = "date required";
  }

  
  return errors;
};

const TitleP = React.forwardRef((props, ref) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
      location: "",
      date: "",
     
    },
    validate,
    onSubmit: (values,onreset) => {
      onreset.resetForm(
        {
          firstName: "",
          lastName: "",
          email: "",
          telephone: "",
          location: "",
          date: "",
        
        }
    )
      console.log(values);
       props.submitC(values)
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
  const locationClasses =
    formik.errors.location && formik.touched.location
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const statusClasses =
    formik.errors.status && formik.touched.status
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  return (
    <div className={classes.form} ref={ref}>
      <div className={classes.title_box}>
        <i className="fas fa-times" onClick={props.onClick}></i>
        <p className={classes.title_text}>Chauffeur Info</p>
      </div>

      <div className={classes.personal}>
        <p>Personal Indication</p>
      </div>

      <div className={classes.photo}>
        <div className={classes.buttons_photo}>
          <button></button>
          <button></button>
        </div>
      </div>
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
            type="number"
            id="phone"
            name="telephone"
            className={telClasses}
            placeholder="e.g: +237 656 818 635"
            pattern="[+][0-9]{3} [0-9]{3} [0-9]{3} [0-9]{3}"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone}
          />

          <label htmlFor="location">Location</label>
          <br></br>
          <input
            type="text"
            id="location"
            name="location"
            className={locationClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.errors.location && formik.touched.location ? (
            <p className={classes.errorColor}>{formik.errors.location}</p>
          ) : null}
          <label htmlFor="date">Date</label>
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
          <label htmlFor="status">Status</label>
          <br></br>
          
          <div className={classes.lineT}>
            <div className={classes.line}></div>
            <div className={classes.footer}>
              <button>Cancel</button>
              <button type="submit">Next</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default TitleP;
