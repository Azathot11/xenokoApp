import { useState, useContext, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./SubDetailOneCar.module.css";
import jeff from "../Images/jeff.jpg";
import morgan from "../Images/morgan.jpg";
import axios from "axios";
import { Row,Col,Container } from "react-bootstrap";
import AuthContext from "../Store/Auth";
import Image3 from '../Images/Avatar.png'
import { IoMdFolder } from "react-icons/io";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const SubDetailOneCar = ({ info, size, id, carInfo ,fet,proprietor}) => {
  const {t} = useTranslation()
  const [show, setShow] = useState(false);
  const [driverId, setEnterValue] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [proprietors, setProprietors] = useState([]);
  const [error, setError] = useState("");
  const AuthCtx = useContext(AuthContext);
  const componentIsMounted = useRef(true);
  const status ='' + carInfo.status

  const notify=()=>{
    toast.success('Succesfully Assigned',{autoClose:2000})
 }
 
 const notify2=()=>{
  toast.success('Succesfully Removed',{autoClose:2000})
}
  
  const showHandler = () => {
    setShow(!show);
  };

  const valueHandler = (event) => {
    setEnterValue(event.target.value);
  };


 
   //http://localhost:3004/drivers
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
       // console.log(data.drivers);
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
  //End of fetch logic///////////////////////////////////////////

  const submitHandler = async(event) => {
    event.preventDefault();
    try{
      const res=await axios.patch(` http://xenoko-api.tejiz-dev.de/user/assign-driver/${id}`,{ driverId },{
      headers: {
        Authorization: "Bearer " + AuthCtx.token,
      }
    })

    if (res.status === 200) {
      notify()
    } 

    if (res.status === 400) {
      throw new Error("Already present");
    }

    }  catch (err) {
      setError(err.response.data.message);
    }
    fet()
  };


  

  //////////////////////patch logic////////////////////////////

  ////////////////////////////////fetch proprietors//////////////////

  // useEffect(() => {
  //   axios
  //     .get(` http://xenoko-api.tejiz-dev.de/user/detail-car/$${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + AuthCtx.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
    
  //       } else {
  //         alert("there is an error");
  //       }
  //       setProprietors(res);
  //       console.log(res)
  //     });
       
  // }, []);

  ////////////////////////////////end of Fetch proprietors //////////

  //fetch logic drivers///////////////////////////////////////////
  //http://192.168.100.74:4040/user/drivers
 
    // delete Assigned driver logic//////////////////////////////
 const deleteHandler =(event, _id)=>{
 event.preventDefault()
 

 fetch(` http://xenoko-api.tejiz-dev.de/user/remove-driver/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthCtx.token,
      },
      body: JSON.stringify({driverId:_id}),
    })
      .then((res) => {
        if (res.status === 200) {
          notify2()
        }

        if (res.status === 400) {
          throw new Error("Already present");
        }
        if(!res.ok) {
          throw new Error("Something went wrong");
        }
        fet()
      })
      .catch((err) => {
        setError(err.message);
      });
  
 }
    
 
    // end of delet driver logic
  return (
    <>
    <Row  className='p-0 m-0'>
      <Col className="d-flex justify-content-center p-0 m-0">
      <div className={classes._box}>
        <div className={classes._gInf}>
          <div className={classes._titleG}>
            <p>General Information</p>
          </div>
          <div className={classes._hdr}>
            <p>Status</p>
            <div className={classes._txt}>
              <p>{carInfo.status}</p>
              {/* <div className= {classes.voyantInactif}></div> */}
              {carInfo.status === 'active' || 'Active' ? <div  className= {classes.voyantactif}></div>:<div  className= {classes.voyantInactif}></div>}
            </div>
          </div>
          <div className={classes._hdr}>
            <p>{t("Immatriculation")}</p>
            <div className={classes._txt}>
              <p>{carInfo.immatriculation}</p>
            </div>
          </div>
          <div className={classes._hdr}>
            <p>Chassis</p>
            <div className={classes._txt}>
              <p>{carInfo.chassis}</p>
            </div>
          </div>
          <div className={classes._hdr}>
            <p>{t("Brand")}</p>
            <div className={classes._txt}>
              <p>{carInfo.model}</p>
            </div>
          </div>
          <div className={classes._hdr}>
            <p>{t("Localisation")}</p>
            <div className={classes._txt}>
              <a  href={carInfo.location}  target="_blank" ><u>{t('Find')}</u></a>
              {/* <div className= {classes.voyantInactif}></div> */}
               <div className= {classes.locationIco}><i class="bi bi-geo-alt-fill"></i></div>
            </div>
          </div>
        </div>
        <div className={classes._boxCP}>
          <div className={classes._driv}>
            <div className={classes._titleChauf}>
              <p>{t("Drivers")}</p>
              <p>{size}</p>
            </div>
            {size === 0 ? (
              <h6 className={classes.noD}>{t('result')}</h6>
            ) : (
              info.map((driv) => (
                <div key={driv._id} className={classes.driv_row} >
                   <div className={classes.centePC}>
                  <div className={classes._driv_photo}>
                   { driv.profile ?<img src={' http://xenoko-api.tejiz-dev.de/'+driv.profile} alt="driver profile" />: <img src={Image3} alt="" />}
                  </div>
                  <div className={classes._designations}>
                  
                    <p className={classes.bold}>{driv.fname} {driv.lname}</p>
                    {/* <p className={classes.light}>Titulaire</p> */}
                   </div>                            
                  </div>
                  <div onClick={(event)=> deleteHandler(event,driv._id)} className={classes.removeD}> <i className="bi bi-trash trash"></i></div>    
                </div>
              ))
            )}
            <hr></hr>
            <div className={classes.Adriv}>
              <h6>{t('AssignC')}</h6>
              <span onClick={showHandler}>
                <i class="bi bi-plus"></i>
              </span>
            </div>
            <form
              onSubmit={submitHandler}
              className={`${classes.formAddC} ${show ? "" : classes.inactive}`}
            >
              <div>
                <select className={classes.inputFieldd} onChange={valueHandler}>
                  <option value="" disabled selected hidden>
                   {t("ChooseC")}
                  </option>
                  {drivers.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.fname} {c.lname}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.btnAsigne}>
                <button type="submit">{t("Submit")}</button>
              </div>
              <p className={classes.erMessage}>{error}</p>
            </form>
          </div>
          <div className={classes._prop}>
            <div>
            <div className={classes._titleG2}>
              <p>{t("Proprietors")}</p>
            </div>
              <div className={classes.padi}>
                <div className={classes.driv_row}>
                 <div className={classes._driv_photo}>
                   { proprietor.profile ? <img src={' http://xenoko-api.tejiz-dev.de/'+proprietor.profile} alt="profile pic" />: <img src={Image3} alt="avatar" />}
                  </div>
                  <div className={classes._designations}>
                    <p className={classes.bold}>{proprietor.firstName} {proprietor.lastName}</p>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
      </Col>
    </Row>
      
    </>
  );
};

export default SubDetailOneCar;
