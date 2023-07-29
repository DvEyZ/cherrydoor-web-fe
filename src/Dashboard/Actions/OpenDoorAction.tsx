import React, { useContext, useState } from "react";
import { ApiContext } from "../../App/ApiContext";

export const OpenDoorAction = (props :{
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const [open, setOpen] = useState<boolean>(false)

    const onOpen = () => {
        if(!open)
            ctx.fetch(`${ctx.url}/access/open`, 'POST').then((_) => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 2000)
            }).catch((e) => {
                props.onError(e)
            })  
    }
    
    return(
        <button className={`box ${open && 'box-door-open'}`} onClick={() => { onOpen() }}>
            <img src='/icons/open.png' alt='' />
            <h2>{ open ? 'Otwarte!' : 'Otwórz drzwi' }</h2>
        </button>
    )
}