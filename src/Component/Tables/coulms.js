import React,{useEffect} from 'react'
import styles from  './Colums.module.css'


export const Columns = [
    {
        Header:'#',
        accessor:'id'
    }, {
        Header:'IMMATRICULATION',
        accessor:'IMMATRICULATION'
    },
    {
        Header:'MODEL',
        accessor:'Model'
    },
    {
        Header:'CHASSIS',
        accessor:'chassis'
    },
    {
        Header:'STATUS',
        accessor:'STATUS'
    },
    {
        Header:'Actions',
        Cell: row =>(
            <div className={styles.divIcon}>
               <span><i class="bi bi-eye"></i></span>
                <span><i class="bi bi-pen"></i></span>
                <span><i class="bi bi-trash"></i></span>
            </div>
        )
        
    },
]
export const ColumnTwo=[
    {
        Header:'#',
        accessor:'_id'
    }, 
    {
        Header:'FIRST NAME',
        accessor:'firstName'
    },
     
    {
        Header:'EMAIL',
        accessor:'email'
    },
    {
        Header:'TEL',
        accessor:'telephone'
    },
    {
        Header:'Actions',
        Cell: row =>(
            <div className={styles.divIcon}>
                <span><i class="bi bi-eye"></i></span>
                <span><i class="bi bi-pen"></i></span>
                <span><i class="bi bi-trash"></i></span>
            </div>
        )
        
    },
]

export const ColumnThree=[
    {
        Header:'#',
        accessor:'id'
    }, {
        Header:'PROPRIETAIRE',
        accessor:'Proprietaires'
    },
    {
        Header:'IMATTRICULATION',
        accessor:'IMMATRICULATION'
    },
    {
        Header:'EMAIL',
        accessor:'Email'
    },
    {
        Header:'TEL',
        accessor:'Tel'
    },
    {
        Header:'Actions',
        Cell: row =>(
            <div className={styles.divIcon}>
               <span><i class="bi bi-eye"></i></span>
                <span><i class="bi bi-pen"></i></span>
                <span><i class="bi bi-trash"></i></span>
            </div>
        )
        
    },
]
export const ColumnP=[
    {
        Header:'#',
        Footer:'Id',
        accessor:'id'
    }, {
        Header:'IMMATRICULATION',
        accessor:'IMMATRICULATION'
    },
    {
        Header:'DATE',
        accessor:'DATE'
    },
    {
        Header:'FAILURES',
        accessor:'FAILURE'
    },
    {
        Header:'PRPRIETAIRE',
        accessor:'PROPRIETAIRE'
    },
    {
        Header:'CHAUFFEURS',
        accessor:'CHAUFFEUR'
    },
    {
        Header:'PRIX',
        accessor:'PRIX'
    },
   
    
    {
        Header:'Actions',
        Cell: row =>(
            <div className={styles.divIcon}>
                <span><i class="bi bi-eye"></i></span>
                <span><i class="bi bi-pen"></i></span>
                <span><i class="bi bi-trash"></i></span>
            </div>
        )
        
    },
]


export const ColumnPret=[
    {
        Header:'#',
        Footer:'Id',
        accessor:'id'
    }, 
    {
        Header:'CHAUFFEURS',
        accessor:'CHAUFFEUR'
    },
    {
        Header:'DATE',
        accessor:'DATE'
    },
    {
        Header:'MOTIF',
        accessor:'MOTIF'
    },
    {
        Header:'SOMME',
        accessor:'SOMME'
    },
    
    
    {
        Header:'Actions',
        Cell: row =>(
            <div className={styles.divIcon}>
                <span><i class="bi bi-eye"></i></span>
                <span><i class="bi bi-pen"></i></span>
                <span><i class="bi bi-trash"></i></span>
            </div>
        )
        
    },
]

export const ColumnDoc=[
    {
        Header:'#',
        Footer:'Id',
        accessor:'id'
    }, 
    {
        Header:'DOC-AVT',
        accessor:'DOCUMENT'
    },
    {
        Header:'DOC-AR',
        accessor:'DOCUMENT-A'
    },
    {
        Header:'IMATTRICULATION',
        accessor:'IMATTRICULATION'
    },
    {
        Header:'DATE',
        accessor:'DATE'
    },
    {
        Header:'PRIX',
        accessor:'PRIX'
    },
    
    
    
    {
        Header:'Actions',
        Cell: row =>(
            <div className={styles.divIcon}>
                <span><i class="bi bi-eye"></i></span>
                <span><i class="bi bi-pen"></i></span>
                <span><i class="bi bi-trash"></i></span>
            </div>
        )
        
    },
]