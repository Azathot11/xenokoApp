import React from 'react'
import { useForm,useStep } from 'react-hooks-helper'
import TitleT from '../forms/TitleT'
import DriverDoc from '../forms/DriverDoc'
import Review from '../forms/Review'
import Submit from '../forms/Submit'

const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    location: "",
    date: "",
    status: "inactif",
}


const steps = [
   { id:'Title'},
   {id:'documents'},
   {id:'review'},
   {id:'submit'}

]


const MultistepForm = () => {
    const [formData,setForm] = useForm(defaultData)
    const {step,navigation}= useStep({
        steps,
        initialStep:0
    })

    const props = {formData,setForm,navigation}

   switch(step.id){
       case 'Title':
       return <TitleT  {...props}/>
       case 'documents':
        return <DriverDoc {...props}/>
       case 'review':
       return  <Review {...props}/>
       case 'submit':
           return <Submit {...props}/>
   }
    return (
        <div>
            <p></p>
        </div>
    )
}

export default MultistepForm
