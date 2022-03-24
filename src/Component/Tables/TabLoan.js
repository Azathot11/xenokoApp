import {useState,useEffect,useCallback,useContext} from 'react'
import classes from './TabLoan.module.css'
import AuthContext from '../Store/Auth'
import ReactPaginate from "react-paginate";
import {Spinner} from "react-bootstrap";
import { useDebounce } from 'usehooks-ts'
import axios from "axios";
import GlobalFilter from "./GlobalFilter";
import { useTranslation } from 'react-i18next';
import useWindowDimensions from '../Pages/Bridge/Dimensions';
const TabLoan = ({loans,del,edit}) => {
    const {t} = useTranslation();
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
    const headers =[t('Date'),t('firstname'),t('Latsname'),t('Motif'),t('Amount'),t('Action')]
    const {width } = useWindowDimensions();
  
    let colSpanSIZE = 3
    if(width < 548){
      colSpanSIZE= 6
    }
    const handleChange =(e)=>{
        console.log(e.target.value)
        setQuery(e.target.value)
        if( e.target.value.trim().length > 0){
          setFilter(true)
        }else{
          setFilter(false)     
        }
      
      }
    
      const handleChangeO =(e)=>{
          console.log(e.target.value)
        setQueryL(e.target.value)
        if( e.target.value.trim().length > 0){
          setFilter(true)
        }else{
          setFilter(false)     
        }
      
      }
    //   const handleChangeT =(e)=>{
    //     setQueryT(e.target.value)
    //     if( e.target.value.trim().length > 0){
    //       setFilter(true)
    //       setLoading(true)
    //       setMessage('')
    //     }
    //   }

    useEffect(()=>{
      setLoading(true)
        console.log(query)
        axios.post(` http://xenoko-api.tejiz-dev.de/user/searchLoan`,{fname:query,lname:queryL},
        {headers: {  
          Authorization: "Bearer " + AuthCtx.token,
      },})
        .then((res)=>{

          if(res.status === 200){
            setResult(res.data.loans)
            setLoading(false)
          }
          
          console.log(res.data)
          // alert(JSON.stringify(res.data.proprietors, null, 2));
         
        }).catch((err)=>{
          if(err.response){
          setLoading(false)
          setResult([])
          }
        })
      },[ debouncedValue,debouncedValueL])
 
     // ,debouncedValueT

  const handlePageClick = () => {};
    return (
        <>
           <div className={classes.resetingL}>
               <div  className={classes.table_wrapperL}>
                <table className={classes.fl_tableL}>
                <thead>
                    <tr>
                    {headers.map((headerItem, index) => (
                        <th key={index}>{headerItem.toUpperCase()}</th>
                    ))}
                    </tr>
                    <tr className={classes.searchRowL}>
            <th colspan='3'><GlobalFilter  values={query}  filterH={ handleChange} placeholder={t('SearchPH8')}/></th>
              <th  colspan='3'  ><GlobalFilter  values={queryL}  filterH={  handleChangeO} placeholder={t('SearchPH9')}/></th>
            </tr>
                </thead>
               {loading ?<th colspan='6' > <Spinner animation="border" variant="secondary" /> </th>:!filter ? <tbody>
                    {loans.length === 0 ?<tr><td colspan="6" className={classes.TemptyL}>{t('result')}</td></tr> : loans.map((x) => (
                    <tr key={x._id} >
                         <td>{ 
                             `${new Date(x.date).getFullYear()}/${new Date(x.date).getMonth()+1}/${new Date(x.date).getDate()}`
                            }</td>
                             <td   className={classes.trp}>{x.driver.fname}</td>
                            <td   className={classes.trp}> {x.driver.lname}</td>
                         
                            <td   className={classes.trp}>{x.reason}</td>
                            <td   className={classes.trp}>{x.amount}</td>
                       
                        <td className={classes.iconsL}>
                            <span className={classes.pencilL} onClick={(event) => edit(event, x)} title={t('EditAction')}
                            >
                                <i className="bi bi-pencil-square pencil"></i>
                            </span>
                            
                            <span className={classes.trashL}onClick={(event) => del(event, x)} title={t('deleteAction')}>
                                <i className="bi bi-trash trash"></i>
                            </span>
                           
                        </td>
                    </tr>
                    ))}
                </tbody> :<tbody>
                    {result.length === 0 ?<tr><td colspan="6" className={classes.Tempty}>{t('result')}</td></tr>: result.map((x) => (
                    
                    <tr key={x._id} >
                      <td>{ 
                      `${new Date(x.date).getFullYear()}/${new Date(x.date).getMonth()+1}/${new Date(x.date).getDate()}`
                     }</td>
                      <td   className={classes.trp}>{x.driver.fname}</td>
                     <td   className={classes.trp}> {x.driver.lname}</td>
                     
                     <td   className={classes.trp}>{x.reason}</td>
                     <td   className={classes.trp}>{x.amount}</td>
                
                 <td className={classes.iconsL}>
                     <span className={classes.pencilL} onClick={(event) => edit(event, x)}
                     >
                         <i className="bi bi-pencil-square pencil"></i>
                     </span>
                     
                     <span className={classes.trashL}onClick={(event) => del(event, x)}>
                         <i className="bi bi-trash trash"></i>
                     </span>
                    
                 </td>
             </tr>
                    ))}
                </tbody>}
                </table>
                <ReactPaginate
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
                />
                </div>
                </div> 
        </>
    )
}

export default TabLoan
