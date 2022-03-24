import React, { useState, useContext, useEffect, useCallback } from "react";
import styles from "./Dropdown3.module.css";

import { List, ListItem, makeStyles, Box } from "@material-ui/core";

import { useHistory, Link } from "react-router-dom";
import AuthContext from "../Store/Auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  customWidth: {
    // width: "365px",
    maxHeight: "200px",
    overflow: "auto",
  },
 
  textWidth: {
    width: "80px",
  },
  customBadge: {
    color: "white",
  },
  summary: {
    overflow: "hidden",
  },
}));

const Dropdown3 = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [driverDocNotif, setDiverDocNotif] = useState([]);
  const [carDocNotif, setCarDocNotif] = useState([]);
  const [dDays,setDdays] = useState(null);
  const [cDays,setCdays] = useState(null);
  const [notif, setNotif] = useState([]);
  const classes = useStyles();
  const AuthCtx = useContext(AuthContext);
 
  const fetChing = useCallback(async () => {
    try {
      const res = await fetch(" http://xenoko-api.tejiz-dev.de/user/home", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      console.log(data);
    
      const notifNumber =data.notificationCar.length + data.notificationDriver.length;
      const transformedNotificaion = data.notificationDriver.map(notif =>{
        return {
          // DocName:notif.document.name,
          DocName:notif.document.name,
          fname: notif.driver.fname,
          lname:notif.driver.lname,
          expire:notif.expiresIn,
          date:notif.expiryDate,
          id:notif.driver._id
        };
      })

      const transformedNotificaion2=data.notificationCar.map(notif =>{
        
        return {
          // DocName:notif.document.name,
          DocName:'CNI',
          maticule: notif.car.immatriculation,
          expire:notif.expiresIn,
          id:notif._id
        };
      });
    
      setNotif(notifNumber);

     
      setNotif(notifNumber);
      setDiverDocNotif( transformedNotificaion);
      setCarDocNotif(transformedNotificaion2);
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetChing();
  }, [fetChing]);

  

  // if (carDocNotif.length === 0) {
  //   notificationhandler2 = (
  //     <ListItemText align="center">{t("NotifResult")}</ListItemText>
  //   );
  // } else if (driverDocNotif.length !== 0) {
  //   notificationhandler2 = carDocNotif.map((car) => (
  //     <>
  //       <ListItemText
  //         onClick={() => {
  //           history.push(`/bridge/voiture/detail/${car.id}`);
  //         }}
  //       >
  //         {/* <ListItemText className ={styles.notifp}>The {car.DocName} related to {car.fname}  expires in {car.expire < 0  ? 'expired since' + +  Math.abs(car.expire) : car.expire}</ListItemText> */}
  //       </ListItemText>
  //       <Typography variant="body2" color="text.secondary">
  //         <ClearIcon />
  //       </Typography>
  //     </>
  //   ));
  // }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <span
            {...bindTrigger(popupState)}
            className={styles.logo1}
            title={t("Notification")}
          >
           { notif === 0 ?   <NotificationsIcon />:<Badge badgeContent={notif} color="error">
              <NotificationsIcon />
            </Badge>}
          </span>

          <Menu
            {...bindMenu(popupState)}
            PaperProps={{
              style: {
                width: 350,
              },
            }}
          >
            <MenuItem>
              <Typography align="center" variant="h6">
                {t("Dnotification")}{" "}
              </Typography>
            </MenuItem>

            <div className={classes.customWidth}> {driverDocNotif.map((driver) => (
             
              <MenuItem onClick={popupState.close} key={driver.id}>
               
                   <ListItemText
                  onClick={() => {
                    AuthCtx.chauffeurDet(driver.id);
                    history.push(`/bridge/chauffeurs`);
                  }}
                 
                >
                  <Box component="div" align="center" whiteSpace="normal">
                  {Cookies.get('i18next') === 'en'? <p>
                  The {driver.DocName} of {driver.fname}  {driver.expire < 0  ?  'expired since '  + +  Math.abs(driver.expire)  +  ' days ' :' expires in' +  driver.expire + ' days '}
                  </p>:<p>
                  La {driver.DocName} de {driver.fname}    {driver.expire < 0  ?  ' a expiré depuis  '  +  Math.abs(driver.expire) + ' jours ' : ' expire dans ' +  driver.expire + ' jours '}
                  </p>}
                  
                  </Box>
                </ListItemText>
                <Typography variant="body2" color="text.secondary">
                  <ClearIcon />
                </Typography>
              </MenuItem>
              
            ))}
              </div>
            <Divider />
            <MenuItem>
              <Typography align="center" variant="h6">
                {t("Cnotification")}{" "}
              </Typography>
            </MenuItem>
            <div className={classes.customWidth}> {carDocNotif.map((car) => (
             
             <MenuItem onClick={popupState.close} key ={car.id}>
              
                  <ListItemText
                 onClick={() => {
                   history.push(`/bridge/voiture/detail/${car.id}`);
                 }}
                
               >
                 <Box component="div" whiteSpace="normal">
                 {Cookies.get('i18next') === 'en'? <p>
                 The {car.DocName} of the car {car.maticule}  {car.expire < 0  ?  ' expired since '  + +  Math.abs(car.expire)  +  ' days ' :' expires in ' + car.expire +  ' days '}
                 </p>:<p>
                 La {car.DocName} de la voiture {car.maticule}    {car.expire < 0  ?  ' a expiré depuis  '  +  Math.abs(car.expire) + ' jours ' : ' expire dans ' +  car.expire + ' jours '}
                 </p>}
                 
                 </Box>
               </ListItemText>
               <Typography variant="body2" color="text.secondary">
                 <ClearIcon />
               </Typography>
             </MenuItem>
             
           ))}
             </div>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default Dropdown3;
