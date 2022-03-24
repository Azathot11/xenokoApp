import React, {Fragment,useState,useContext,useRef,useCallback,useEffect,} from "react";
import classes from "./Loan.module.css";
import AuthContext from "../Store/Auth";
import { useFormik } from "formik";
import { FaTimesCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const Loan = React.forwardRef((props, ref) => {
  const {t} =useTranslation();
  const componentIsMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [drivers, setDrivers] = useState([]);
  const AuthCtx = useContext(AuthContext);


  const notify=()=>{
    toast.success(' succesfull',{autoClose:2000})
 }
 const validate = (values) => {
  const errors = {};

  if (!values.motif) {
    errors.motif =t('FNEM');
  }
  if (!values.amount) {
    errors.amount = t('FNEM');;
  }

  if (!values.date) {
    errors.date = t('FNEM');;
  }

  if (!values.driv) {
    errors.driv = t('FNEM');;
  }
  return errors;
};
  const fetChing = useCallback(async (infos) => {
    try {
      const res = await fetch(" http://xenoko-api.tejiz-dev.de/user/drivers", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      if (componentIsMounted.current) {
        //data.cars
        setDrivers(data.drivers);
      }
      return () => {
        componentIsMounted = false;
      };
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetChing();
  }, [fetChing]);
  const formik = useFormik({
    initialValues: {
      driv: "",
      motif: "",
      amount: "",
      date: "",
    },
    validate,
    onSubmit: (values, onreset) => {
      console.log(values)

      const fetchHandler = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(" http://xenoko-api.tejiz-dev.de/user/loan", {
            method: "PUT",
            body: JSON.stringify({
              reason: values.motif,
              date: values.date,
              amount: values.amount,
              driver: values.driv,
            }),
            headers: {
              Authorization: "Bearer " + AuthCtx.token,
              "Content-Type": "application/json",
            },
          });
          if (response.status == 201) {
            notify()
            props.fetching();
            setError('');
            onreset.resetForm({
              driv: "",
              motif: "",
              amount: "",
              date: "",
            });
            setIsLoading(false);
          } 
          if(!response.ok) {
            throw new Error("Something went wrong");
          }

          const infos = await response.json();

          //window.location.href = "http://localhost:3001/";
        } catch (error) {
          setIsLoading(false);
          setError(error.message);
        }
        // props.Fetch2()
      };
      fetchHandler();

      //  props.submitC(values)
    },
  });

  const drivClasses =
    formik.errors.driv && formik.touched.driv
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const dateClasses =
    formik.errors.date && formik.touched.date
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const motifClasses =
    formik.errors.motif && formik.touched.motif
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const amountClasses =
    formik.errors.amount && formik.touched.amount
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;

  return (
    <div className={classes.form} ref={ref}>
      <div className={classes.title_box}>
        <FaTimesCircle className={classes.faicon} onClick={props.close} />
        <p className={classes.title_text}>{t('Linfo')}</p>
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
          <label htmlFor="driv">{t('Drivers')}</label>
          <br></br>
          <select
            id="driv"
            name="driv"
            className={drivClasses}
            value={formik.values.driv}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="choose a driver"
          >
            <option value="" disabled selected hidden>
             {t('ChooseC')}
            </option>
            {drivers.map((c) => (
              <option  value={c._id} key={c._id}>
                {c.fname} {c.lname}
              </option>
            ))}
          </select>
          {formik.errors.driv && formik.touched.driv ? (
            <p className={classes.errorColor}>{formik.errors.driv}</p>
          ) : null}
          <label htmlFor="date">{t("Date")} </label>
          <br></br>
          <input
            type="date"
            name="date"
            className={dateClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date ? (
            <p className={classes.errorColor}>{formik.errors.date}</p>
          ) : null}

          <label htmlFor="descriptionPanne">{('Reason')}</label>
          <textarea
            id="descriptionLaPanne"
            name="motif"
            rows="6"
            cols="50"
            value={formik.values.motif}
            className={motifClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.motif && formik.touched.motif ? (
            <p className={classes.errorColor}>{formik.errors.motif}</p>
          ) : null}

          <label htmlFor="amount">{t('Amount')}</label>
          <br></br>
          <input
            type="number"
            id="amount"
            name="amount"
            className={amountClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.errors.amount && formik.touched.amount ? (
            <p className={classes.errorColor}>{formik.errors.amount}</p>
          ) : null}

          <div className={classes.spine}>
            {" "}
            {isLoading && <Spinner animation="grow" variant="light" />}
          </div>
          <p className={classes.errMessage}>{error}</p>
          
          <div className={classes.lineT}>
            <div className={classes.line}></div>
            <div className={classes.footer}>
              <button onClick={props.close}>{t('Cancel')}</button>
              <button type="submit">{t('Submit')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default Loan;
