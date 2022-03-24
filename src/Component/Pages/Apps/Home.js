import React, { Fragment, useRef, useState, useContext, useEffect, useCallback } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Card,Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../Store/Auth";
import BarChart from "../../Charts/BarChart";
import PieChart from "../../Charts/PieChart";
import { useTranslation} from "react-i18next";
import { ClassNames } from "@emotion/react";


const Home = (props) => {
  const {t} =useTranslation()
  const [info, setinfo] = useState([])
  const [notif,setNotif]= useState([])
  const [months,setMonths] = useState({})
  const [days,setDays] = useState({})
  const [ranking, setRanking] = useState([])
  const [num, setNum] = useState([])
  const [filter, setFilter] = useState('')
  const [chooseRev,setChooseRev]= useState(t('month'))
  const loadedCost = []
  const loadedDate = []
  const loadedrevenue = []
  const loadedFuel = []

  useEffect(() => {
     localStorage.setItem('choice',chooseRev)
  }, [chooseRev])
  
  
  const AuthCtx = useContext(AuthContext)
  const filterHandler = (e) => {
    setFilter(e.target.value)
  }
  const fetChing = useCallback(async (infos) => {

    const res = await fetch("http://192.168.100.74:4040/user/home", {
      headers: {
        Authorization: "Bearer " + AuthCtx.token,
      },
    });
    const data = await res.json();
    console.log(data)
    const notifNumber =data.notificationCar.length + data.notificationDriver.length
    setRanking(data.ranking)
    setinfo(data.user)
    setNotif(notifNumber)
    setNum(data)

    const monthsRev = []
    const monthFuel = []
    const monthFailures = []

    const dayRev = []
    const dayFuel = []
    const dayFailures = []

    for (const dataObj of data.ratingDay) {
      dayRev.push(dataObj.revenue)
      dayFuel.push(dataObj.fuel )
      dayFailures.push(dataObj.failureCost)

      setDays({
        revenue: dayRev,
        fuel:dayFuel,
        failures:dayFailures
      })
    }

    for (const dataObj of data.ratingMonth) {
      monthsRev.push(dataObj.revenue)
      monthFuel.push(dataObj.fuel )
      monthFailures.push(dataObj.failureCost)

      setMonths({
        revenue: monthsRev,
        fuel:monthFuel,
        failures:monthFailures
      })
    }
  }, []);

  useEffect(() => {
    fetChing()
  }, [fetChing]);

  let choice
  let heading

  if(localStorage.getItem('choice') !== 'day' ){
        heading = t('Yesterday')
        choice =  <BarChart
        failure={days.failures}
        date={[t("Trevenue")]}
        revenue={days.revenue}
        fuel={days.fuel}
      />
  } else{
    heading = t('headingMonth')
    choice =  <BarChart
    failure={months.failures}
    date={[t("Trevenue")]}
    revenue={months.revenue}
    fuel={months.fuel}
    months={months}
  /> 
  }

  
const notifNumber=notif;

  // const fetChingg = useCallback(async (infos) => {
  //   try {
  //     const res = await fetch(" http://xenoko-api.tejiz-dev.de/user/revenues", {
  //       headers: {
  //         Authorization: "Bearer " + AuthCtx.token,
  //       },
  //     });

  //     const data = await res.json();
  //     if (componentIsMounted.current) {
  //       // setRev(data.Revenues);
  //     }

  //     for (const dataObj of data.Revenues) {
  //       let Fdate = new Date(dataObj.date)
  //       let dateYMD = `${Fdate.getDate()}/${Fdate.getMonth() + 1}/${Fdate.getFullYear()}`;

  //       loadedCost.push(dataObj.failureCost)
  //       loadedDate.push(dateYMD)
  //       loadedrevenue.push(dataObj.revenue)
  //       loadedFuel.push(dataObj.fuel)

  //       setCost(loadedCost)
  //       setdate(loadedDate)
  //       setRevenue(loadedrevenue)
  //       setFuel(loadedFuel)
  //     }
  //     return () => {
  //       componentIsMounted = false
  //     }
  //   } catch (err) { }
  // }, []);

  // useEffect(() => {
  //   fetChingg()
  // }, [fetChingg])

  return (
    <Fragment>
      <div className={styles.gen}>
        <Row className={styles.profileR}>
          <Col
            className="d-flex align-items-center px-2"
            lg={3}
            md={3}
            sm={3}
            xs={12}
          >
            <div className={styles.profile}>
              <div className={styles.sec1}>
                <div className={styles.message}>
                  <p className={styles.name}>
                    {" "}
                    {t("Welcome")},{info.firstname}
                  </p>
                  <p className={styles.notification}>
                    <span>
                      <i className="bi bi-bell-fill"></i>
                    </span>
                    {t("Notif", { notifNumber })}
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={3} md={3} sm={3} xs={4} className={styles.DprofileR}>
            <LinkContainer to="bridge/proprietaire">
              <div className={styles.box} title={t("CTSPD")}>
                <div className="d-flex justify-content-center align-items-center pb-2">
                  <div className={styles.centerbox}>
                    <div className={styles.user}>
                      {" "}
                      <i className="fas fa-user-check"></i>
                    </div>
                    <div className={styles.number}>{num.totalProprietor}</div>
                    <div className={styles.total}>{t("Proprietors")}</div>
                  </div>
                </div>
              </div>
            </LinkContainer>
          </Col>
          <Col lg={3} md={3} sm={3} xs={4} className={styles.DprofileR}>
            <LinkContainer to="/bridge/chauffeurs">
              <div className={styles.box} title={t("CTSDD")}>
                <div className="d-flex justify-content-center align-items-center pb-2">
                  <div className={styles.centerbox}>
                    <div className={styles.user1}>
                      <span
                        className="iconify"
                        data-icon="si-glyph:wheel-steel"
                      ></span>
                    </div>
                    <div className={styles.number}>{num.totalDrivers}</div>
                    <div className={styles.total}>{t("Drivers")}</div>
                  </div>
                </div>
              </div>
            </LinkContainer>
          </Col>
          <Col lg={3} md={3} sm={3} xs={4} className={styles.DprofileR}>
            <LinkContainer to="/bridge/voiture">
              <div className={styles.box} title={t("CTSCD")}>
                <div className="d-flex  d-flex justify-content-center align-items-center pb-2">
                  <div className={styles.centerbox}>
                    <span className={styles.user}>
                      <i className="fas fa-car"></i>
                    </span>
                    <div className={styles.number}>{num.totalCars}</div>
                    <div className={styles.total}>{t("Cars")}</div>
                  </div>
                </div>
              </div>
            </LinkContainer>
          </Col>
        </Row>
        <Container fluid className={styles.gen}>
          <Row className="m-0 p-0">
            <Col>
              <Row  className="pt-3 pb-3">
                <Col className="ml-3" sm={12} lg={6}>
                  <Row className="">
                    <Col sm={12}>
                      <Card className="pt-3"style={{height: '35rem',maxHeight:'35rem' }}>
                        <Card.Title  className={styles.hmonths}>
                          <div>
                             <p>
                              { heading}{" "}
                             </p>
                          </div>
                          <div>
                          <select className={styles.selectedH} onClick={(e) => {setChooseRev(e.target.value) }} >      
                            <option value ='day' >
                              {" "}{t("yesT")}
                            </option>

                            <option value='month'>
                              {" "} {t("LastM")}
                            </option>
                          </select>
                          </div>
                         
                        </Card.Title>
                        <Card.Body>
                         { choice }
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>

                <Col sm={12} lg={6} >
                  <Card className={styles.carD} >
                    <Card.Body>
                      <Card.Title>{t("Best")}</Card.Title>
                      <Card.Subtitle className={styles.barsearch}>
                        <input
                          className={styles.search}
                          type="text"
                          value={filter}
                          onChange={filterHandler}
                          placeholder="Search... "
                        />
                        <span className="positioni">
                          <i className="bi bi-search d-flex justify-content-end"></i>
                        </span>
                        <div>
                          <ul className={styles.ranking}>
                            {ranking.map((r) => (
                              <li key={r.carId}>
                                <p>{r.car}</p>
                                <p>{r.revenue}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default Home;
