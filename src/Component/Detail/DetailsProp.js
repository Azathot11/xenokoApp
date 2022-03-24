import React, { useState, useContext, useEffect,useCallback} from "react";
import classes from "./DetailsProp.module.css";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import PDetailCarsV from "./PDetailCarsV";
import PDetailCarR from './PDetailCarR'
import PDetailCarsP from "./PDetailCarsP";
import AuthContext from "../Store/Auth";
import axios from "axios";
import { Route,useParams,NavLink,Redirect,Switch} from "react-router-dom";
import Image3 from '../Images/Avatar.png'
import Modal from 'react-modal'
import Photo from "../Pages/Bridge/Photo";
import {Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation} from "react-i18next";
toast.configure()
const Details = () => {
  const {t}=useTranslation()
    const [profile,setProfile]=useState([])
    const [finance,setFinance]=useState([])
    const [pInfo,setPInfo]=useState([])
    const [pInfo2,setPInfo2]=useState('')
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [modalIsOpen2,setModalIsOpen2]=useState(false)
    const [password,setPassword] =useState()
    const [modal,setModal] =useState(null)
    const [loading,setIsloading] = useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const AuthCtx = useContext(AuthContext);
    const params= useParams()
    
    const notify=()=>{
       toast.success('Succesfully created',{autoClose:2000})
    }
    const notify2=()=>{
      toast.success('Deleted successfuly',{autoClose:2000})
   }
    const fetchingg=()=>{}
    const toggleModalHandler= ()=>{
        setModalIsOpen(true)
      }
    
      const closeToggleModalHandler =()=>{
        setModalIsOpen(false)
      }

      const toggleModalHandler2= ()=>{
        setModalIsOpen2(true)
      }
    
      const closeToggleModalHandler2 =()=>{
        setModalIsOpen2(false)
      }
     
    const fetChing = useCallback( async () => {
        try {
          const res = await fetch(`http://xenoko-api.tejiz-dev.de/user/detail-proprietor/${params.pi}`, {
            headers: {
              Authorization: "Bearer " + AuthCtx.token,
            },
          });
    
          const data = await res.json();
        
            setFinance(data)
            setPInfo(data.proprietor);
            setPInfo2(data.proprietor.cars.length)
            setProfile(data.proprietor.profile)
             
        } catch (err) {}
      },[AuthCtx.token,params.pi]);
    
    useEffect(()=>{
      fetChing()
    },[fetChing])



    const  passHandler=(event)=>{
      setPassword( event.target.value)
    }

    const showHandler=()=>{
      setShowPassword(!showPassword)
  }
    const submitHandler =(event)=>{
      event.preventDefault()
      setIsloading(true)
      axios.post('http://xenoko-api.tejiz-dev.de/user/createViewer', {password:password,proprietor:params.pi},
      {headers: { 
        "Content-Type": "application/json" ,  
        Authorization: "Bearer " + AuthCtx.token,
    }}
      )
      .then(res =>{
        if(res.status === 201){
          console.log(res)
          setModalIsOpen2(false)
          notify()
          fetChing()
          setIsloading(false)

            // setModalIsOpen2(false)
         }
      } )
      .catch(error => {
          setIsloading(false)
        
      });
   
    }

    const deleteHandler=()=>{
      setModal(true)
    }
    
    const confirmHandler=()=>{
      setIsloading(true)
   
    
 fetch(` http://xenoko-api.tejiz-dev.de/user/deleteViewer/${params.pi}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + AuthCtx.token,
  },
})
  .then((res) => {
    console.log(res)
    if (res.status === 200) {
      notify2()
      cancelHandler()
      fetChing()
      setIsloading(false)
    }

    if (res.status === 401) {
      throw new Error(res.error);
    }
    
  })
  .catch((error) => {
    
  });
    }

    const cancelHandler =()=>{
      setModal(false)
    }
    const name =pInfo.firstName
    return (
      <div className={classes.container}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={classes.Modal}
          overlayClassName={classes.Overlay}
        >
          <Photo
            close={closeToggleModalHandler}
            fetching={fetChing}
            fetchingg={fetchingg}
            links={` http://xenoko-api.tejiz-dev.de/user/profileProprietor/${params.pi}`}
          />
        </Modal>
        <Modal
          isOpen={modalIsOpen2}
          onRequestClose={() => setModalIsOpen2(false)}
          className={classes.Modal2}
          overlayClassName={classes.Overlay2}
        >
          
        <form onSubmit={submitHandler} className={classes.formStyle} >
          <div className={classes.esclamation}>
              <i class="fas fa-exclamation-triangle"></i>
          </div>
            <div className={classes.VaccountH6}>
              <h6 className={classes.VaccountH68}>  {t('CreatViewAMS',{name})} </h6>
            </div>
            <label htmlFor="P-password" className={classes.labelIn}>Password</label>
            <div className={classes.Vaccount}>
              
              <input required id='P-password' name='P-password' onChange={ passHandler}  type={showPassword ? 'text' : 'password'} />
              <span onClick={showHandler}><i className="bi bi-eye"></i></span>
             
            </div>

           {loading && <p className={classes.loadingS}> <Spinner animation="border" variant="secondary" /></p>}

            <div className={classes.confirmBtns}>
              <button type="submit" className={classes.btnleft}>Create</button>
              <button className={classes.btnright} onClick={closeToggleModalHandler2 }> Cancel</button>
            </div>
          </form>
        </Modal>
        <Modal 
          isOpen={modal}
          onRequestClose={()=> setModal(false)}
          className={classes.Modal3}
          overlayClassName={classes.Overlay3}>
                <div className={classes.errMessageCon}>
                 <div className={classes.topp}>
                   <span className={classes.delIC}>  <i className="bi bi-trash trash"></i></span>
                   <h4>{t('Delete')}</h4>
                   <h6>{t('ConfirmM')}</h6>
                 </div>
               </div>
               <div  className={classes.bottom}>
                   <div className={classes.line}/>
                 </div>
                 {/* {loading && <p className={classes.loadingS}> <Spinner animation="border" variant="secondary" /></p>} */}
                 <div className={classes.CbtnCon}>
                   <button className={classes.btnModal} onClick={cancelHandler}> {t('Cancel')}</button>
                   <button  className={classes.btnModal2} onClick={confirmHandler}>{t('Delete')}</button>
                 </div>
            </Modal>
        <div className={classes.bloc}>
          <div className={classes.second}>
           
           {pInfo.viewAccount ==='true' ? <button title={t('DeleteViewAC')} className={classes.delBtn} onClick={deleteHandler} ><i class="bi bi-person-dash"></i></button>: <button title={t('CreateViewAC')} className={classes.delBtn2} onClick={toggleModalHandler2}><i class="bi bi-person-plus"></i></button>}
          </div>
          <div className={classes.first}>
            <div className={classes.infos}>
              <div className={classes.photo}>

                {!profile?  <img src={Image3} alt="" />:
                  <img
                    src={" http://xenoko-api.tejiz-dev.de/" + profile}
                    alt=""
                  />
                }
                <div className={classes.editIcon}>
                  <span className={classes.eye} onClick={toggleModalHandler}>
                    <i class="bi bi-pencil-square"></i>
                  </span>
                  <span className={classes.trash}>
                    <i class="bi bi-trash"></i>
                  </span>
                </div>
              </div>
              <div className={classes.ident}>
                <h3>
                  {pInfo.firstName} {pInfo.lastName}
                </h3>
                <div className={classes.mail} href={pInfo.email}>
                  <MdEmail className={classes.mail} /><a href={`mailto:${pInfo.email}`} className={classes.emailstyle}>{pInfo.email}</a>
                </div>
                <div className={classes.number}>
                  <BsFillTelephoneFill /> <p> <a  href={`tel:${pInfo.telephone}`} >{pInfo.telephone}</a></p>
                </div>
              </div>
            </div>

            <div className={classes.details}>
              <div className={classes.owner}>
                <h3>{pInfo2}</h3>
                <p>{t('Cars')}</p>
              </div>
              <div className={classes.drivers}>
                <h3>{finance.revenue}</h3>
                <p>{t('Revenue')} (XAF) </p>
              </div>
              <div className={classes.cars}>
                <h3>{finance.loss}</h3>
                <p>{t('Manquant')} (XAF)</p>
              </div>
               
            </div>
           
          

          </div>
          <div className={classes.bars}>
            <ul>

              <NavLink
                activeClassName={classes.active}
                to={`/bridge/proprietaire/det/${params.pi}/voiture`}
              >
                {" "}
               {t('Cars')}
              </NavLink>
              <NavLink
                activeClassName={classes.active}
                to={`/bridge/proprietaire/det/${params.pi}/revenue`}
              >
               {t('Revenue')}
              </NavLink>
              <NavLink activeClassName={classes.active} to={`/bridge/proprietaire/det/${params.pi}/pannes`}>
            {t('Failures')}
              </NavLink>
            </ul>

          </div>
        </div>
        {/* { tabble && <PDetailCarsV id={ params.pi} />}
         {rev && <PDetailCarR id={ params.pi} />} */}
         <Switch>
        <Route path={`/bridge/proprietaire/det/${params.pi}/revenue`}>
          <PDetailCarR id={params.pi} />
        </Route>
        
        <Route path={`/bridge/proprietaire/det/${params.pi}/pannes`}>
          <PDetailCarsP id={params.pi} />
        </Route>
        <Route path={`/bridge/proprietaire/det/${params.pi}/voiture`}>
          <PDetailCarsV id={params.pi} />
        </Route>
        </Switch>
      </div>
    );
}

export default Details;