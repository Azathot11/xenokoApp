import React, {useState, useContext, useEffect,useRef,useCallback} from "react";
import  classes from './PropsInterface.module.css'
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import PDetailCarsV from "../../Detail/PDetailCarsV";
import PDetailCarR from '../../Detail/PDetailCarR'
import PDetailCarsP from "../../Detail/PDetailCarsP";
import AuthContext from '../../Store/Auth'
import { BrowserRouter as Router, Switch, Route ,Redirect,useHistory,NavLink} from "react-router-dom";
import Image3 from '../../Images/Avatar.png'
import Modal from 'react-modal'
import Photo from '../../Pages/Bridge/Photo'
import NavBar2 from "../Apps/NavBar2";
import Cookies from 'js-cookie'
import { useTranslation } from "react-i18next";

const  PropInterface = (props) => {
    const {t}=useTranslation()
    const [profile,setProfile]=useState([])
    const [finance,setFinance]=useState([])
    const [pInfo,setPInfo]=useState([])
    const [pInfo2,setPInfo2]=useState('')
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [isOpened,setIsOpened ]= useState(false)
    const history =useHistory()
    const componentIsMounted = useRef(true)
    const AuthCtx = useContext(AuthContext);

    

    const toggleHandeler1 =()=>{
      setIsOpened(true)
  }
  const closeToggleHandeler1 =()=>{
    setIsOpened(false)
}

 

    
    const toggleModalHandler= ()=>{
        setModalIsOpen(true)
      }
    
      const closeToggleModalHandler =()=>{
        setModalIsOpen(false)
      }
      
    const fetChing = useCallback( async () => {
        try {
          const res = await fetch(`   http://xenoko-api.tejiz-dev.de/user/detail-proprietor/${Cookies.get('id')}`, {
            headers: {
              Authorization: "Bearer " + AuthCtx.token,
            },
          });
    
          const data = await res.json();
          if(componentIsMounted.current){
            //data.cars
            // history.replace('/secondHome','/login'
            setFinance(data)
            setPInfo(data.proprietor);
            setPInfo2(data.proprietor.cars.length)
            setProfile(data.proprietor.profile)
          }
          return ()=>{
            componentIsMounted = false
          }
        } catch (err) {}
      },[]);
    
    useEffect(()=>{
      fetChing()
    },[fetChing])

    return (
    <> 
      <NavBar2 open={toggleHandeler1} close={closeToggleHandeler1} isOpened={isOpened} profile={profile}/>
      <div className={classes.container2}>
     
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={()=> setModalIsOpen(false)}
          className={classes.Modal}
          overlayClassName={classes.Overlay}
          >
              <Photo close={ closeToggleModalHandler}  fetching={fetChing}    links={`http://xenoko-api.tejiz-dev.de/user/profileProprietor/${Cookies.get('id')}`}/>
          </Modal>
        <div className={classes.bloc}>
            <div className={classes.first}>
            <div className={classes.infos}>
                    <div className={classes.photo}>
                    {!profile === 0 ?<img src={Image3} alt='profile picture'/>: <img src={'http://xenoko-api.tejiz-dev.de/'+profile} alt='profile picture'/>  }
                        <div className={classes.editIcon}>
                            <span className={classes.eye} onClick={ toggleModalHandler}><i class="bi bi-pencil-square"></i></span>
                            <span  className={classes.trash}><i class="bi bi-trash"></i></span>
                        </div>
                    </div>
                    <div className={classes.ident}>
                        <h3>{pInfo.firstName} {pInfo.lastName}</h3>
                        <div className={classes.mail}>
                            <MdEmail className={classes.mail} /> <p>{pInfo.email}</p>
                        </div>
                        <div className={classes.number}>
                            <BsFillTelephoneFill/> <p>{pInfo.telephone}</p>
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
              <NavLink activeClassName={classes.active} to='/secondHome'> {t('Cars')}</NavLink>
              <NavLink  activeClassName={classes.active} to='/revenue'> {t('Revenue')}</NavLink>
              <NavLink activeClassName={classes.active} to='/pannes'>{t('Failures')}</NavLink>
            </ul> 
            </div>         
           
        </div>
     
        <Switch>
            <Route   path="/" exact>
             <Redirect to='/secondHome' />
            </Route>
            <Route exact path="/secondHome">
              <PDetailCarsV  id={Cookies.get('id')} />
            </Route>
            <Route exact path="/revenue">
              <PDetailCarR id={Cookies.get('id')} />
            </Route>
            <Route exact path="/pannes">
              < PDetailCarsP id={Cookies.get('id')} />
            </Route>
          </Switch>
    </div>
    </>)
}

export default  PropInterface;

