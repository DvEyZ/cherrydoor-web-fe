import React from "react"
import './Error.css'

export const ErrorReport = (props :{
    error :Error,
    onClose :() => any,
}) => {
    return(
        <div style={{display: 'flex'}} className="report error">
            {props.error.message}
            <div style={{margin: 'auto'}}/>
            <button onClick={() => {props.onClose()}}>Zamknij</button>
        </div>
    )
}