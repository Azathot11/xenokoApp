import {useState,useEffect,useContext} from "react";
import ReactPaginate from "react-paginate";
import classes from "./TabC.module.css";
import GlobalFilter from "./GlobalFilter";
import axios from "axios";
import { useDebounce } from 'usehooks-ts'
import AuthContext from "../Store/Auth";
import {Spinner} from "react-bootstrap";
import {useTranslation} from 'react-i18next'
import useWindowDimensions from "../Pages/Bridge/Dimensions";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TabC = ({ trig, viewData, drivers, headers,del,doc,handlePageClick}) => {
  const {t} = useTranslation()
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
    colSpanSIZE= 6
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
    }
  }

  useEffect(()=>{
    setLoading(true)
    axios.post(` http://xenoko-api.tejiz-dev.de/user/searchDrivers`,{fname:query,lname:queryL,telephone:queryT},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      setResult(res.data.drivers)
      setLoading(false)
    }).catch((err)=>{
       console.log('error')
    })

  },[ debouncedValue,debouncedValueL,debouncedValueT])

      const handlePageClick2 = () => {};
    return (
        <>
      <div className={classes.reseting}>
        <div  className={classes.table_wrapperCC}>
        <table className={classes.fl_tableC}>
          <thead>
              <tr>
              {headers.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
           
            <tr className={classes.searchRow}>
            <th colspan={colSpanSIZE}><GlobalFilter  values={query}  filterH={ handleChange} placeholder={t('SearchPH8')}/></th>
              <th  colspan='2'  className={classes.firstColumnC}><GlobalFilter  values={queryL}  filterH={  handleChangeO} placeholder={t('SearchPH9')}/></th>
              <th  colspan='1' className={classes.firstColumnC}><GlobalFilter   values={queryT}  filterH={ handleChangeT}  placeholder={t('SearchPH10')}/></th>
            </tr>
          </thead>
         {loading ?<th colspan='5' > <Spinner animation="border" variant="secondary" /> </th>: !filter ? <tbody>
          {drivers.length === 0 ? <tr  title={t('details')}><td colspan="5" className={classes.Tempty}>{t('result')}</td></tr >:drivers.map((x)=>(<tr key={x._id} className={classes.trP}  title={t('details')}>
              <td onClick={(event) =>viewData(event, x)}>{x.fname} </td>
              <td onClick={(event) =>viewData(event, x)}>{x.lname}</td>
              <td onClick={(event) => viewData(event, x)}>{x.telephone1}</td>
              <td  onClick={(event) => viewData(event, x)}>{x.email}</td>
              <td className={classes.icons} >
              <span  className={classes.doc} onClick={(event) => doc(event, x)} title={t('AddDoc')}><i class="far fa-folder" ></i></span>
              <span  className={classes.pencil } onClick={(event)=>trig(event,x)} title={t('EditAction')}><i className="bi bi-pencil-square pencil"></i></span>
              <span  className={classes.trash} onClick={(event) => del(event, x)}  title={t('deleteAction')}><i className="bi bi-trash trash"></i></span>
                    
                </td>
           </tr>))} 
          </tbody> :<tbody>
          {result.length === 0 ? <tr><td colspan="5" className={classes.Tempty}>{t('result')}</td></tr>:result.map((x)=>(<tr key={x._id} className={classes.trP} title={t('details')}>
              <td onClick={(event) =>viewData(event, x)}>{x.fname} </td>
              <td onClick={(event) =>viewData(event, x)}>{x.lname}</td>
              <td onClick={(event) => viewData(event, x)}>{x.telephone}</td>
              <td  onClick={(event) => viewData(event, x)}>{x.email}</td>
              <td className={classes.icons} >
              <span  className={classes.doc} onClick={(event) => doc(event, x)}title={t('AddDoc')}><i class="far fa-folder" ></i></span>
              <span  className={classes.pencil } onClick={(event)=>trig(event,x)} title={t('EditAction')}><i className="bi bi-pencil-square pencil"></i></span>
              <span  className={classes.trash} onClick={(event) => del(event, x)}  title={t('deleteAction')}><i className="bi bi-trash trash"></i></span>
                    
                </td>
           </tr>))} 
          </tbody>}
          <tfoot>
            
          </tfoot>
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

export default TabC
