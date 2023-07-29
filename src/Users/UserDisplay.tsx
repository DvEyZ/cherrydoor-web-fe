import React, { useContext, useRef, useState } from "react"
import { AccessCodeModel, UserBriefModel } from "./models"
import { Link } from "react-router-dom"
import { ValueDisplay } from "../Data/Detail/ValueDisplay"
import { PermissionBriefModel } from "../Permissions/models"
import { ApiContext } from "../App/ApiContext"
import { ActionDef } from "../Data/Detail/Action"

export const UserBrief = (props :{
    data :UserBriefModel
}) => {
    return(
        <Link className="box user-box" to={props.data.name}>
            <img src='/icons/user.png' alt=''/>
            <h3>{props.data.name}</h3>
            <div>{props.data.full_name}</div>
            <div>{props.data.role}</div>
        </Link>
    )
}

export const AccessCodesDisplay :ValueDisplay = (props :{
    value :AccessCodeModel[],
    resourceId :string,
    refresh: () => any,
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const onDelete = (id :number) => {
        ctx.fetch(`${ctx.url}/users/${props.resourceId}/access-codes/${id}`, 'DELETE').then(() => {
            props.refresh();
        }).catch((e) => {
            props.onError(e);
        })
    }

    return(
        <div className="access-code-display">
            <h3 className="acd-field">Kody dostępu</h3>
            <div className="rel-value">
                {
                    props.value.map((v,i) => 
                        <div className="rd-container" key={i}>
                            <div className="acd-code box list-box">
                                <img src='/icons/card.png' alt=""/>
                                <div>{v.code}</div>
                            </div>
                            <button className="rd-button" onClick={() => {onDelete(v.id)}}>
                                <img src='/icons/delete.png' alt=""/>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export const PermissionRelDisplay :ValueDisplay = (props :{
    value :PermissionBriefModel[],
    resourceId :string,
    refresh :() => any,
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const onDelete = (id :number) => {
        ctx.fetch(`${ctx.url}/users/${props.resourceId}/permissions/${id}`, 'DELETE').then(() => {
            props.refresh();
        }).catch((e) => {
            props.onError(e);
        })
    }

    return(
        <div className="rel-display permission-rel-display">
            <h3>Uprawnienia</h3>
            <div className="rel-value">
                {
                    props.value.map((v,i) =>
                        <div className="rd-container" key={i}>
                            <Link to={`/permissions/${v.name}`} className="box list-box">
                                <img src='/icons/permission.png' alt=''/>
                                <div>{v.name}</div>
                            </Link>
                            <button className="rd-button" onClick={() => {onDelete(v.id)}}>
                                <img src='/icons/delete.png' alt=""/>
                            </button>
                        </div>
                        
                    )
                }
            </div>
        </div>
    )
}

export const AccessCodeAddAction = <DataModel extends {
    id :number
},>(props :{
    url :string,
    resourceId :string,
    data :DataModel,
    onComplete :() => any,
    onError :(e :Error) => any
}) => {
    const ctx = useContext(ApiContext);
    const [open, setOpen] = useState<boolean>(false);
    const codeInput = useRef<HTMLInputElement>(null);

    const onOpen = () => {
        setOpen(!open);
    }

    const onRelAdd = () => {
        let body = {
            code :codeInput.current!.value,
            user: props.data.id
        }

        ctx.fetch(`${ctx.url}/${props.url}/${props.resourceId}/access-codes`, 'POST', JSON.stringify(body)).then(() => {
            props.onComplete()
        }).catch((e) => {
            props.onError(e)
        })
    }

    return(
        <div className="action-container rel-container box list-box">
            <div className="action-container-inner">
                <img src={`/icons/card.png`} alt=''/>
                <div>Dodaj kod dostępu ręcznie</div>
                <div style={{margin:'auto'}}/>
                <button className="grad-button" onClick={() => {onOpen();}}>{open ? 'Zamknij' : 'Rozwiń'}</button>
            </div>
            {
                open &&
                <div className="rel-form">
                    <input type="text" className="rel-select" ref={codeInput}/>
                    <button className="grad-button" onClick={() => {onRelAdd()}}>Dodaj</button>
                </div>
            }
        </div>
    )
}

export const AccessCodeAdd :ActionDef = {
    action: AccessCodeAddAction,
    onCompletePopup: 'Dodano.',
    then: 'refresh'
} 