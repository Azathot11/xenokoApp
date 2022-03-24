import React, { Fragment,useState, useContext, useEffect,useRef,useCallback} from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import classes from "./PDetailCarV.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../Store/Auth";
import {Spinner } from "react-bootstrap";
import GlobalFilter from "../Tables/GlobalFilter";
import axios from "axios";
import { useDebounce } from 'usehooks-ts'
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next'
import useWindowDimensions from "../Pages/Bridge/Dimensions";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PDetailCarsV = (props) => {
  const {t} = useTranslation()
  const [filter,setFilter]=useState(false)
  const [query,setQuery] = useState('')
  const [queryO,setQueryO] = useState('')
  const [queryT,setQueryT] = useState('')
  const [result,setResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')
  const debouncedValue = useDebounce(query, 2000)
  const debouncedValueO = useDebounce(queryO, 2000)
  const debouncedValueT = useDebounce(queryT, 2000)
  const [cars, setCars] = useState([]);
  const componentIsMounted = useRef(true)
  const params = useParams();
  const AuthCtx = useContext(AuthContext);
  const history =useHistory()
  const headers = [t('Immatriculation'),t('Brand'),t('Chassis'), t( "Model"), t("Status"), ];
  const {width } = useWindowDimensions();
  
  let colSpanSIZE = 2
  if(width < 568){
    colSpanSIZE= 3
  }
 
  const handleChange =(e)=>{
    setQuery(e.target.value)
    
    if( e.target.value.trim().length > 0){
      
      setFilter(true)
      setMessage('')
    }else{
      setFilter(false)     
    }
  
  }

  const handleChangeO =(e)=>{
  
    setQueryO(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setMessage('')
    }else{
      setFilter(false)     
    }
  
  }
  const handleChangeT =(e)=>{
  
    setQueryT(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setMessage('')
    }
  }

  useEffect(()=>{
    setLoading(true)
    axios.post(` http://xenoko-api.tejiz-dev.de/user/searchProprietorCars/${props.id}`,{immatriculation:query,brand:queryO,chassis:queryT},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
  
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      setResult(res.data.cars)
      setLoading(false)
    }).catch((err)=>{
     
    })

  },[ debouncedValue,debouncedValueO,debouncedValueT])


  

   // fetching Logic ///////////////////////////////
  //http://192.168.100.74:4040/user/proprietor
  const fetChing = useCallback( async (infos) => {
    try {
      const res = await fetch(` http://xenoko-api.tejiz-dev.de/user/detail-proprietor/${props.id}`, {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      if(componentIsMounted.current){
        //data.cars
        // console.log(data.proprietor.cars)
        setCars(data.proprietor.cars);
      }
      return ()=>{
        componentIsMounted = false
      }
     
   
    } catch (err) {}
  },[]);

useEffect(()=>{
  fetChing()
},[fetChing])
  
  // end of fetching Logic ///////////////////////////

  const handlePageClick = () => {};
  const handlePageClick2 = () => {};
  
  
  return (
    <>
       <div className={classes.reseting}>
            <div  className={classes.table_wrapperv} >
                <table className={classes.fl_tableV} >
                <thead>
                    <tr>
                    {headers.map((headerItem, index) => (
                        <th key={index}>{headerItem.toUpperCase()}</th>
                    ))}
                    </tr>
              <tr className={classes.searchRow}>
              <th colSpan={colSpanSIZE}><GlobalFilter  values={query}  filterH={handleChange} placeholder={t('SearchPH4')}/></th>
              <th colSpan='2' className={classes.firstColumnv}><GlobalFilter  values={queryO}  filterH={handleChangeO} placeholder={t('SearchPH5')}/></th>
              <th colSpan='1'><GlobalFilter  values={queryT}  filterH={handleChangeT}  placeholder={t('SearchPH6')}/></th>
              {/* <th></th>
              <th></th> */}
            </tr>
                </thead>
              {loading ?<th colSpan='5' > <Spinner animation="border" variant="secondary" /></th>:!filter ? <tbody>
                    {cars.length === 0 ?<tr><td colSpan="5" className={classes.Tempty}>{t('result')}</td></tr>: cars.map((x) => (
                    <tr className={classes.linkC} key={x._id} 
                     >
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}>{x.immatriculation}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}> {x.brand}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}>{x.chassis}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}} > {x.model}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}} className={classes.disappear}>{x.status}</td>
                    </tr>
                    ))}
                </tbody> :<tbody>
                    {result.length === 0 ?<tr><td colSpan="5" className={classes.Tempty}>{t('result')}</td></tr>: result.map((x) => (
                    <tr className={classes.linkC} key={x._id} >
                              <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}>{x.immatriculation}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}> {x.brand}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}>{x.chassis}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}> {x.model}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}} className={classes.disappear}>{x.status}</td>
                    </tr>
                    ))}
                </tbody>}
                </table>
                {!filter ? <Stack spacing={2} direction="column" alignItems="end" >
          <Pagination count={10} size="large"  onChange={handlePageClick} />
        </Stack> : <Stack spacing={2} direction="column" alignItems="end" >
          <Pagination count={10} size="large"  onChange={handlePageClick2} />
        </Stack>}
                {/* <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={20}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-end"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                /> */}
                </div>
            </div>
    </>
  );
}

export default PDetailCarsV

