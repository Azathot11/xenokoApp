import styled  from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {NavLink} from 'react-router-dom'
import image1 from '../Images/xenoko.svg'

export const SidebarContainer=styled.aside`
    position:fixed;
    z-index:999;
    width:100%;
    height:100%;
    background:#000;
    dispaly:grid;
    align-items:center;
    overflow: auto;
    top:0;
    left:0;
    transition: 0.3s ease-in;
    opacity: ${({resNav }) => (resNav ? '100%':'0')};
    left: ${({resNav }) => (resNav ? '0' : '-100%')};
`
export const CloseIcon=styled(AiOutlineArrowLeft )`
color: #81C53F;
font-size:30px;
font-weight:bold;
cursor:pointer;
`
export const IconsLogo=styled.div`


`
export const Xenoko= styled.img`
display:flex;
justify-content:flex-end;
width:150px
`
export const Icon= styled.div`
display:flex;
align-items:center;

`


export const SidebarWrapper=styled.div`
   
`
export const EditIcon=styled.div`
position: absolute;
    display: flex;
    justify-content: center;
  
    color: #FFFFFF;
    font-size: 20px;
    z-index: 2;
    opacity: 0;
    transition: .5s ease;
`
export const NavBarPicture=styled.div`
 
   position: relative;
    padding-top:5rem;
    margin-left: 20px;
    display:flex;
    align-items:center
   
`

export const Nav= styled.nav`

`
export const SidebarMenu=styled.ul`
    text-decoration:none;
    padding-top:4rem;
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows: repeat(7,80px);
    
    @media sreen only and(max-width:480px){
        gride-template-rows: repeat(7,60px);
    }
`

export const  SidebarLink= styled(NavLink)`
text-decoration:none;
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 4rem;
    height: 100%;
    cursor: pointer;
    &:hover{
    color: #9BBF40;
    text-decoration:none;
    }
    &.active {
        color: #9BBF40;
    }
`


export const NavBtn=styled.div`
    display: flex;
    align-items: center;
`

export const NavBtnLink=styled(NavLink)`
    border-radius: 4px;
    background:  #DBAB26;
    padding: 10px 80px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    
   
    border-radius:45px;
    &:hover {
        text-decoration:none;
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

`