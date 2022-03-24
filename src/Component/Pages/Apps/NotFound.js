import React from 'react'
import { useHistory } from 'react-router-dom';
import classes from './Notfound.module.css'
import Image1 from '../../Images/notfound.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Card } from "react-bootstrap";
const NotFound = () => {
    const history = useHistory()
    return (
        <div className={classes.conTain}>
       
            <div  className={classes.conTainl} style ={ { backgroundImage:  `url(${Image1}) `,} }>
            <button onClick={()=>{
                history.push('/home')
            }} className={classes.buttonR}>Back to home page</button>
            </div>
        
        </div>
    )
}

export default NotFound
