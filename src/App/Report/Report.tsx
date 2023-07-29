import React from "react";

export const Report = (props :{
    content :string,
    onClose :() => any,
}) => {
    return(
        <div style={{display: 'flex'}} className="report ok">
            {props.content}
            <div style={{margin: 'auto'}}/>
            <button onClick={() => {props.onClose()}}>Zamknij</button>
        </div>
    )
}