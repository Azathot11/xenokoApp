import React from 'react'
import classes from './SubDetailThreeCar.module.css'
import { Row,Col,Container } from "react-bootstrap";
import PPolarArea from '../Charts/Doughtnut';
import PieChart from '../Charts/PieChart';
import PieChart2 from '../Charts/PieChart2';
const SubDetailThreeCar = (props) => {
    return (
        <>
           <Container fluid>
               <Row className='mb-5  pt-2'>
                   <Col className='d-flex justify-content-center'>
                   <div className={classes.contanT}>
                       <PieChart2 total={props.total}/>
                   </div>
                   </Col>
               </Row>
           </Container>
        </>
    )
}

export default SubDetailThreeCar
