import { error } from "console";
import React from "react";

export const LoadingError = (props :{
    error :Error
}) => {
    return(
        <div className="l-error-container">
            <div className="l-error">
                <h2>Wystąpił błąd.</h2>
                <div>{props.error.message}</div>
            </div>
        </div>
    )
}