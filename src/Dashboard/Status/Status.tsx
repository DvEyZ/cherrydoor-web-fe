import React from "react";
import './Status.css'
import { ElementStatus } from "./ElementStatus";

export interface StatusResponse {
    controller :StatusElement,
    lock :StatusElement,
    rfid :StatusElement,
    led :StatusElement,
    speaker :StatusElement,
    wifi :StatusElement
}

export interface StatusElement {
    status :'Ok' | 'Warn' | 'Err',
    message :string
}

export const Status = (props :{
    status :StatusResponse
}) => {
    return(
        <div className="status-container">
            <ElementStatus name="controller" displayName="Mikrokontroler" status={props.status.controller}/>
            <ElementStatus name="lock" displayName="Zamek" status={props.status.lock}/>
            <ElementStatus name="rfid" displayName="Czytnik kart" status={props.status.rfid}/>
            <ElementStatus name="led" displayName="Diody LED" status={props.status.led}/>
            <ElementStatus name="speaker" displayName="Głośnik" status={props.status.speaker}/>
            <ElementStatus name="wifi" displayName="Wi-Fi" status={props.status.wifi}/>
        </div>
    )
}