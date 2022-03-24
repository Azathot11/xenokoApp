import React from 'react';
import classes from './VoitureF.module.css';



const VoitureF = React.forwardRef((props,ref) => {

    return (
        <div className={classes.form} ref={ref}>
            
                <div className={classes.title_box}>
                        <button onClick={props.onClick}></button>
                    <div className={classes.title_text}> 
                        <p>Voiture Info</p>
                    </div>
                </div>

                <div className={classes.personal}>
                    <p>Photo de Voiture</p>
                </div>

                
                <div className={classes.data_form}>
                    <form>
                        
                            <label htmlFor="photodumoteur">Photo du moteur</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                            <label htmlFor="photomallearrierre">Photo de la malle arrière</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                            <label htmlFor="photoavant">Photo de la position avant</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                            <label htmlFor="photoarriere">Photo de la position arrère</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                            <label htmlFor="photoavant">Photo de la position avant</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>
                            
                            <label htmlFor="photoavant">Photo de la position avant</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                            <label htmlFor="photointerieuravant">Photo de l'intérieur avant</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                            <label htmlFor="photointerieurarriere">Photo de l'intérieur arrière</label><br></br>
                            <div className={classes.inputs}>
                                <input type="button" value="Choose a file"/>
                                <div className={classes.name}><p>{/*nom du fichier uploaded*/}</p></div>
                            </div>

                    </form>
                </div>
                <div className={classes.line}></div>
                <div className={classes.footer}>
                    <button>Cancel</button>
                    <button>Next</button>
                </div>
        </div>
    )
})
export default VoitureF;