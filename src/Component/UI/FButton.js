import React from 'react'
import styles from './FButton.module.css'

const FButton = (props) => {
    return (
        <div className={`${styles.addB} ${props.className}`} onClick={props.onClick} title={props.title}>
            {props.children}
        </div>
    )
}

export default FButton
