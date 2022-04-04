import {useState,useEffect,useContext,useCallback,} from 'react'
import AuthContext from '../Store/Auth';
import Photo from '../Pages/Bridge/Photo';
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import Image3 from '../Images/Avatar.png'
import { FaBirthdayCake } from "react-icons/fa";
import {MdAccountCircle} from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import classes from './Cdetail.module.css'
import Modal from 'react-modal'
import{ FaTimesCircle} from 'react-icons/fa'
import {GiPayMoney} from 'react-icons/gi'
import axios from 'axios'
import { toast } from "react-toastify";
import Badge from '@mui/material/Badge';
import {useTranslation} from 'react-i18next'
import Rmodal from "../UI/Rmodal";
const Cdetail = (props) => {
    const {t} = useTranslation()
    const [detail,setDetail]=useState([])
    const [profile,setProfile] =useState([])
    const[ documents,setDocments] =useState()
    const [error,setError] =useState('')
    const [iID,setId]= useState('')
    const AuthCtx = useContext(AuthContext);
    // const [modalIsopen,setModalIsOpen] = useState(false)
    const [modal2,setModal2]=useState(false)
    const [modal,setModal]=useState(false)
    const [Pmodal,setPmodal] = useState(false)
    const [loadpic,setLoadPic] = useState('')

    const notify=()=>{
        toast.success('Deleted succesfully',{autoClose:2000})
     }


     const loadImageHandler =(value)=>{
      setPmodal(true)
       setLoadPic(value)

     }
   
     const ViewDataHandler =useCallback(() => {
   
    axios.get(` http://xenoko-api.tejiz-dev.de/user/detail-driver/${props.transfer}`,
    {headers: { 
   
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
        
      setDetail(res.data.Driver);
      setProfile(res.data.Driver.profile)
      setDocments(res.data.Driver.documents)
      if(!res.ok){
        throw new Error('Something went wrong')
    }
      
    }).catch((err)=>{
        setError(err.message)
    })
    
  },[AuthCtx.token,props.transfer]);

  useEffect(()=>{
      ViewDataHandler()
  },[ViewDataHandler])
 

  
    const toggleModalHandler=()=>{
        setModal(true)
    }
    const closeToggleModalHandler =()=>{
        setModal(false)
      }
      
    let date = new Date(detail.birthDate);
   
    let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
   
    const ConfirmDeleteDocHandler=()=>{
  
        fetch(
            ` http://xenoko-api.tejiz-dev.de/user/deleteDoc-driver/${props.transfer}`,
            {
              method: "DELETE",
              headers: { 
                  Authorization: "Bearer " + AuthCtx.token, 
                  "Content-Type": "application/json" },
              body: JSON.stringify({
                documentId:iID
              }),
            }
          ).then((res) => {
          if(res.status === 200){
            notify()
           setModal2(false)
           ViewDataHandler()
           
          }
          if(!res.ok){
              throw new Error('Something went wrong')
          }
        }).catch((err)=>{
            setError(err.message)
        });
        
      };
      const cancelModalHandler=()=>{
        setModal2(false)
      }
     
     
    return (
      <div className={classes._formm}>
        <Rmodal setPmodal={setPmodal} Pmodal={Pmodal} loadpic={loadpic} />
        <Modal
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          className={classes.Modal}
          overlayClassName={classes.Overlay}
        >
          <Photo
            close={closeToggleModalHandler}
            fetching={ViewDataHandler}
            links={` http://xenoko-api.tejiz-dev.de/user/profileDriver/${props.transfer}`}
          />
        </Modal>
        {modal2 && (
          <Modal
            close={cancelModalHandler}
            isOpen={modal2}
            onRequestClose={() => setModal2(false)}
            className={classes.Modal2}
            overlayClassName={classes.Overlay2}
          >
            <div className={classes.errMessageCon}>
              <div className={classes.topp}>
                <span className={classes.delIC}>
                  {" "}
                  <i className="bi bi-trash trash"></i>
                </span>
                <h4>Delete</h4>
                <h6>Do you want to delete?</h6>
              </div>
            </div>
            <div className={classes.bottom}>
              <div className={classes.line} />
            </div>
            <div className={classes.CbtnCon}>
              <button className={classes.btnModal} onClick={cancelModalHandler}>
                Cancel
              </button>
              <button
                className={classes.btnModal2}
                onClick={ConfirmDeleteDocHandler}
              >
                Confirm
              </button>
            </div>
          </Modal>
        )}
        <div className={classes._boxP}>
          <span onClick={props.onClick} className={classes.faicon}>
            {" "}
            <FaTimesCircle />{" "}
          </span>
          <div className={classes._textP}>
            <p>Chauffeur Info</p>
          </div>
        </div>
        <div className={classes.infos}>
          <div className={classes.photo}>
            {!profile  ?  <img src={Image3} alt="" />: 
              <img
              onClick ={()=>{
                loadImageHandler(profile);
              }}
                src={" http://xenoko-api.tejiz-dev.de/" + profile}
                alt=""
              />
             
            }
            <div className={classes.editIcon}>
              <span className={classes.eye} onClick={toggleModalHandler}>
                <i className="bi bi-pencil-square"></i>
              </span>
              <span className={classes.trash}>
                <i className="bi bi-trash"></i>
              </span>
            </div>
          </div>
        </div>

        <div className={classes._lineP}></div>

        <div className={classes._infosP}>
          <div className={classes._dataP}>
            <MdAccountCircle />
            <p>
              {detail.fname} {detail.lname}
            </p>
          </div>
          <div className={classes._dataP}>
            <MdEmail />
            <p>{detail.email}</p>
          </div>
          <div className={classes._dataP}>
            <BsFillTelephoneFill />
            <p> {detail.telephone1} </p>
          </div>
          <div className={classes._dataP}>
            <BsFillTelephoneFill />
            <p> {detail.telephone2} </p>
          </div>
          <div className={classes._dataP}>
            <BsFillTelephoneFill />
            <p> {detail.telephone3} </p>
          </div>
          {/* <div className={classes._dataP}>
                    <AiFillCar/>
                    <p>20</p>
                </div> */}
          <div className={classes._dataP}>
            <GiPositionMarker />
            <p>{detail.address}</p>
          </div>

          <div className={classes._dataP}>
            <FaBirthdayCake />
            <p>{dateMDY}</p>
          </div>
        </div>
        <div className={classes._lineP}></div>
        <div className={classes._dataP}>
          <div>
            <i className="fas fa-money-bill"></i> {t('Salary')}
          </div>

          <p>{detail.salary}</p>
        </div>
        <div className={classes._dataP}>
          <div>
            <i className="fas fa-hand-holding-usd"></i> {t('Loans')}
          </div>
          <p>{detail.loan}</p>
        </div>
        
        <div className={classes._dataP}>
          <div> <GiPayMoney />  {t('Debt')}</div>
         
          <p>{detail.remains}</p>
        </div>
        <div className={classes._lineP}></div>
      
        {documents ? (
          documents.map((x) => (
            x.notify  ? <Badge badgeContent   color='error'>
            <div className={classes._cardD} key={props.transfer}>
              <div className={classes.docInfo}>
                <div className={classes._front1}>{t('Docname2')}: {x.name}</div>
                <div className={classes._front1}>
                  date exp :{" "}
                  {`${new Date(x.expiry).getDate()}/${
                    new Date(x.expiry).getMonth() + 1
                  }/${new Date(x.expiry).getFullYear()}`}
                </div>
              </div>
              <div className={classes._cardD2}>
                <div className={classes._front}>
                  <div className={classes._photoCard}>
                    <img
                     style={{cursor:"pointer"}}
                     onClick={()=>{loadImageHandler(x.frontImage)}}
                      src={" http://xenoko-api.tejiz-dev.de/" + x.frontImage} alt='' 
                    />
                  </div>
                  <p>Image (front) </p>
                </div>
                <div className={classes._front}>
                  <div className={classes._photoCard}>
                    <img
                       style={{cursor:"pointer"}}
                       onClick={()=>{loadImageHandler(x.backImage)}}
                      src={"  http://xenoko-api.tejiz-dev.de/" + x.backImage} alt=''
                    />
                  </div>
                  <p>Image (Back) </p>
                </div>
              </div>
              <div
                className={classes.docInfo2}
                onClick={() => {
                  setId(x._id);
                  setModal2(true);
                }}
              >
                {" "}
                <p>{t('Delete')}</p>
              </div>
              <div className={classes._lineP}></div>
            </div>
            </Badge>: <div className={classes._cardD} key={props.transfer}>
              <div className={classes.docInfo}>
                <div className={classes._front1}>{t('Docname2')}: {x.name}</div>
                <div className={classes._front1}>
                  date exp :{" "}
                  {`${new Date(x.expiry).getDate()}/${
                    new Date(x.expiry).getMonth() + 1
                  }/${new Date(x.expiry).getFullYear()}`}
                </div>
              </div>
              <div className={classes._cardD2}>
                <div className={classes._front}>
                  <div className={classes._photoCard}>
                    <img
                    style={{cursor:"pointer"}}
                       onClick={()=>{ loadImageHandler(x.frontImage)}}
                      src={" http://xenoko-api.tejiz-dev.de/" + x.frontImage} alt=''
                    />
                  </div>
                  <p>Image (front) </p>
                </div>
                <div className={classes._front}>
                  <div className={classes._photoCard}>
                    <img
                     style={{cursor:"pointer"}}
                     onClick={()=>{loadImageHandler(x.backImage)}}
                      src={"  http://xenoko-api.tejiz-dev.de/" + x.backImage} alt=''
                    />
                  </div>
                  <p>Image (Back) </p>
                </div>
              </div>
              <div
                className={classes.docInfo2}
                onClick={() => {
                  setId(x._id);
                  setModal2(true);
                }}
              >
                {" "}
                <p>{t('Delete')}</p>
              </div>
              <div className={classes._lineP}></div>
            </div>
          ))
        ) : (
          <div className={classes._cardD} key={props.transfer}>
            <div className={classes._front}>
              <div className={classes._photoCard}></div>
              <p>Front </p>
            </div>
            <div className={classes._front}>
              <div className={classes._photoCard}></div>
              <p>Back </p>
            </div>

            <div className={classes._lineP}></div>
          </div>
        )}
      </div>
    );
}

export default Cdetail
