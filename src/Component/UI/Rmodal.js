import React,{useState} from 'react'
import Modal from 'react-modal'
import classes from './Rmodal.module.css'

const Rmodal = ({Pmodal,setPmodal,loadpic}) => {
  
  return (
    <Modal  
    isOpen={Pmodal}
    onRequestClose={() => setPmodal(false)}
        className={classes.PModal}
        overlayClassName={classes.POverlay}>
            <img src={"  http://xenoko-api.tejiz-dev.de/" + loadpic }  className={classes.Pimage}/>
    </Modal>
  )
}

export default Rmodal