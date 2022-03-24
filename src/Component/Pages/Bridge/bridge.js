import React, {Fragment, useState,useContext,useEffect,useCallback
} from "react";
import styles from "./Bridge.module.css";
import SideBar from "../../SideBar/SideBar";
import NavBar from "../Apps/NavBar";
import {Switch, Route,useHistory,Redirect } from "react-router-dom";
import Home from "../Apps/Home";
import Proprietaire from "../Apps/Proprietaire";
import Chauffeur from "../Apps/Chauffeur";
import Voiture from "../Apps/Voiture";
import Pannes from "../Apps/Pannes";
import Revenue from "../Apps/Revenue";
import Pret from "../Apps/Pret";
import Document from "../Apps/Document";
import AuthContext from "../../Store/Auth";
import NotFound from "../Apps/NotFound";
import Slide from "../../forms/Slide";
import Details from "../../Detail/DetailsProp";
import Modal from 'react-modal'
import SideBarW from '../../SideBarwebsite/SidBarWComp.js'
import UserProfile from "../userprofile/UserProfile";
const Bridge = (props) => {
  const [inactive, setInactive] = useState(false);
  const [isopened, setDisAppear] = useState(false);
  const [dataInfo, setData] = useState([]);
  const [infos2, setInfo2] = useState([]);
  const [error, setError] = useState("");
  const [modalIsopen,setModalIsOpen] = useState(false)
  const [profile,setProfile]=useState([])
  const [resNav,setResNav] =useState(false)
  const AuthCtx = useContext(AuthContext);
  Modal.setAppElement('#root')

  
  const rNav=()=>{
    setResNav(!resNav)
  }
 

  const toggle = () => {
    setInactive(!inactive);
  };
  
  
  const toggleModalHandler= ()=>{
    setModalIsOpen(true)
  }

  const closeToggleModalHandler =()=>{
    setModalIsOpen(false)
  }

 
 
  const fetChing = useCallback (async (infos) => {
  
    const res = await fetch(" http://xenoko-api.tejiz-dev.de/user/home", {
      headers: {
        Authorization: "Bearer " + AuthCtx.token,
      },
    });
    const data = await res.json();
    setData(data.user);
    setProfile(data.user.profile)
    setInfo2(data);
  },[])

  useEffect(() => {
  fetChing()
  }, [fetChing]);

 
  if (error) return <h1>{error}</h1>;
 

    
  return (
    
      <Fragment>
      
     
      <div  className={styles["SideBar-p"]}>
        {AuthCtx.isLoggedIn && (
       
          <SideBar
           
            isopened={isopened}
            infos={dataInfo}
            toggle={toggle}
            inactive={inactive}
            setInactive={setInactive}
            className={styles["SideBar-p"]}
            callM={toggleModalHandler}
            profile={profile}
            close={ closeToggleModalHandler}
          />
        
        )}
        </div>
        <div
         
          
          className={`${styles["pages-container"]} ${
            inactive ? styles.inactive : ""
          }`}
        >
      

          {AuthCtx.isLoggedIn && (
            <NavBar
            // ref={dropdownMenuRef}
             infos={dataInfo}
              toggle={toggle}
              inactive={inactive}
              isopened={isopened}
              onLogout={props.onLogout}
              profile={profile}
              rNav={rNav}
            />
          )}
          <SideBarW rNav={rNav} 
          callM={toggleModalHandler}
        
          resNav={resNav}   
          profile={profile}   
          infos={dataInfo}/>
           
          
          <Switch>
            <Route   path="/" exact>
             <Redirect to='/home' />
            </Route>
            <Route exact path="/home">
              <Home isopened={isopened} />
            </Route>
            <Route path="/bridge/proprietaire" exact>
            <Proprietaire infos={dataInfo}   />
            </Route>
            <Route path='/bridge/proprietaire/det/:pi'>
              <Details infos={dataInfo} profile={profile}/>
            </Route>
            <Route path="/bridge/chauffeurs">
              <Chauffeur />
            </Route>
            <Route path="/bridge/voiture"  exact>
              <Voiture />
            </Route>
            <Route path="/bridge/voiture/detail/:vi">
              <Slide />
            </Route>
            <Route path="/bridge/failures">
              <Pannes />
            </Route>
            <Route path="/bridge/reve">
              <Revenue />
            </Route>
            <Route path="/bridge/borrow">
              <Pret />
            </Route>
            <Route path="/bridge/useprofile">
              <UserProfile fetching2={fetChing}/>
            </Route>
            <Route path="/bridge/docs">
              <Document />
            </Route>
           
            <Route   path="*" >
                <NotFound />
            </Route>
          </Switch>
         
        </div>  
      </Fragment>
  );
};

export default Bridge;
