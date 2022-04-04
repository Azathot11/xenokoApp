import {useState,useEffect,useContext} from "react";
import AuthContext from "../Store/Auth";
import ReactPaginate from "react-paginate";
import classes from "./TabVi.module.css";
import GlobalFilter from "./GlobalFilter";
import axios from "axios";
import { useDebounce } from 'usehooks-ts'
import { useHistory } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../Pages/Bridge/Dimensions";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const TabVi = ({ trig,  cars, headers ,del,doc, addRe,handlePageClick}) => {
  const {t}= useTranslation();
  const [filter,setFilter]=useState(false)
  const [query,setQuery] = useState('')
  const [queryL,setQueryL] = useState('')
  const [queryT,setQueryT] = useState('')
  const [result,setResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')
  const AuthCtx= useContext(AuthContext)
  const debouncedValue = useDebounce(query, 2000)
  const debouncedValueL = useDebounce(queryL, 2000)
  const debouncedValueT = useDebounce(queryT, 2000)
  const {width } = useWindowDimensions();
  let colSpanSIZE = 2
  if(width < 548){
    colSpanSIZE= 5
  }
 const history =useHistory()
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
    setQueryL(e.target.value)
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
    }else{
      setFilter(false)     
    }
  }

  useEffect(()=>{

    setLoading(true)
    axios.post(` http://xenoko-api.tejiz-dev.de/user/searchCars`,{brand:query,immatriculation:queryL,chassis:queryT},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
    
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      setResult(res.data.cars)
      setLoading(false)
    }).catch((err)=>{
       console.log('error')
    })

  },[ debouncedValue,debouncedValueL,debouncedValueT])
   const handlePageClick2 = (event,value) => {
     console.log(value)
   };
    return (
        <>
           <div className={classes.reseting}>
         
               <div  className={classes.table_wrapperVV}>
                <table className={classes.fl_tableV}>
                <thead>
             
              
                    <tr>
                    {headers.map((headerItem, index) => (
                        <th key={index}>{headerItem.toUpperCase()}</th>
                    ))}
                    </tr>
                    <tr className={classes.searchRow}>
                    <th   colSpan={colSpanSIZE}><GlobalFilter  values={queryL}  filterH={  handleChangeO} placeholder={t('SearchPH4')}/></th>
              <th colSpan='2' className={classes.firstColumnV}><GlobalFilter  values={query}  filterH={ handleChange} placeholder={t('SearchPH5')}/></th>
              <th colSpan='1'><GlobalFilter  values={queryT}  filterH={ handleChangeT}   placeholder={t('SearchPH6')}/></th>
             
            </tr>
                </thead>
               {loading ?<th colspan='5' > <Spinner animation="border" variant="secondary" /> </th>:!filter ? <tbody>
                    {cars.length === 0 ?<tr><td colspan="5" className={classes.Tempty}>{t('result')}</td></tr> : cars.map((x) => (
                    <tr key={x._id} title={t('details')}>
                             <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}>{x.immatriculation}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}> {x.brand}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}>{x.chassis}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}>{x.status}</td>
                       
                        <td className={classes.iconsVV}>
                             <span  className={classes.docVV} onClick={(event) => doc(event, x)} title={t('AddDoc')}><i class="far fa-folder"></i></span>
                             <span  className={classes.docVV} onClick={(event) => addRe(event, x)} title={t('Addrev')}><i class="bi bi-cash-coin"></i></span>
                            <span className={classes.pencilVV} onClick={(event) => trig(event, x)} title={t('EditAction')}
                            >
                                <i className="bi bi-pencil-square pencil"></i>
                            </span>
                            
                            <span className={classes.trashVV}onClick={(event) => del(event, x)} title={t('deleteAction')}>
                                <i className="bi bi-trash trash"></i>
                            </span>
                           
                        </td>
                    </tr>
                    ))}
                </tbody> :<tbody>
                    {result.length === 0 ?<tr><td colspan="5" className={classes.Tempty}>{t('result')}</td></tr>: result.map((x) => (
                    <tr title={t('details')} key={x._id} onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}} className={classes.trp}>
                             <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}>{x.immatriculation}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}> {x.brand}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}>{x.chassis}</td>
                            <td onClick={()=>{history.push(`/bridge/voiture/detail/${x._id}/subOne`)}}  className={classes.trp}>{x.status}</td>
                       
                        <td className={classes.iconsVV}>
                             <span  className={classes.docVV} onClick={(event) => doc(event, x)}><i class="far fa-folder"></i></span>
                             <span  className={classes.docVV} onClick={(event) => addRe(event, x)}><i class="bi bi-cash-coin"></i></span>
                            <span className={classes.pencilVV} onClick={(event) => trig(event, x)}
                            >
                                <i className="bi bi-pencil-square pencil"></i>
                            </span>
                            
                            <span className={classes.trashVV}onClick={(event) => del(event, x)}>
                                <i className="bi bi-trash trash"></i>
                            </span>
                           
                        </td>
                    </tr>
                    ))}
                </tbody>}
                </table>
                {!filter ? <Stack spacing={2} direction="column" alignItems="end" >
          <Pagination count={10} size="large"  onChange={handlePageClick} />
        </Stack> :<Stack spacing={2} direction="column" alignItems="end" >
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
                previousClassName={"page-link"}
                nextClassName={"page-item"}
                nextClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                /> */}
                </div>
                </div> 
        </>
    )
}

export default TabVi
