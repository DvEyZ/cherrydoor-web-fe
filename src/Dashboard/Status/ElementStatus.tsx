import React from "react";
import { StatusElement } from "./Status";

export const ElementStatus = (props :{
    name :string,
    displayName :string,
    status: StatusElement
}) => {
    return(
        <div className={`box ${
            props.status.status === 'Ok' ? 'ok' : 
            props.status.status === 'Warn' ? 'warning' : 'error'
        }`}>
            <div className="status-icon-container">
                <img src={`/icons/${props.name}.png`} alt='' />
                <img className="status-icon" src={`/icons/${
                    props.status.status === 'Ok' ? 'ok' : 
                    props.status.status === 'Warn' ? 'warning' : 'error'
                }.png`} alt="" />
            </div>
            <h2>{props.displayName}</h2>
            <div>{props.status.message}</div>
        </div>
    )
}