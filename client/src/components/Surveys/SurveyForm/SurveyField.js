import React from 'react'

const SurveyField=(props)=>{

    return(
        <div className="col-md-6 col-sm-12 col-xs-12">
            <label>{props.label}</label>
            <input {...props.input}/>
        </div>
    )
}

export default SurveyField