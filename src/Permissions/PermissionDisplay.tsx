import React, { useContext } from "react"
import { PermissionBriefModel } from "./models"
import { Link } from "react-router-dom"
import { ValueDisplay } from "../Data/Detail/ValueDisplay"
import { UserBriefModel } from "../Users/models"
import { AccessProfileBriefModel } from "../AccessProfiles/models"
import { ApiContext } from "../App/ApiContext"

export const PermissionBrief = (props :{
    data :PermissionBriefModel
}) => {
    return(
        <Link className="box" to={props.data.name}>
            <img src='/icons/permission.png' alt=''/>
            <h3>{props.data.name}</h3>
            <div>{props.data.description}</div>
        </Link>
    )
}

export const UserRelDisplay :ValueDisplay = (props :{
    value :UserBriefModel[],
    resourceId :string,
    refresh :() => any,
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const onDelete = (id :number) => {
        ctx.fetch(`${ctx.url}/permissions/${props.resourceId}/users/${id}`, 'DELETE').then(() => {
            props.refresh();
        }).catch((e) => {
            props.onError(e);
        })
    }

    return(
        <div className="rel-display permission-rel-display">
            <h3>Użytkownicy</h3>
            <div className="rel-value">
                {
                    props.value.map((v,i) =>
                        <div className="rd-container" key={i}>
                            <Link to={`/users/${v.name}`} className="box list-box" key={i}>
                                <img src='/icons/user.png' alt=''/>
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

export const AccessProfileRelDisplay :ValueDisplay = (props :{
    value :AccessProfileBriefModel[],
    resourceId :string,
    refresh :() => any,
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const onDelete = (id :number) => {
        ctx.fetch(`${ctx.url}/permissions/${props.resourceId}/access-profiles/${id}`, 'DELETE').then(() => {
            props.refresh();
        }).catch((e) => {
            props.onError(e);
        })
    }

    return(
        <div className="rel-display permission-rel-display">
            <h3>Profile dostępu</h3>
            <div className="rel-value">
                {
                    props.value.map((v,i) =>
                        <div className="rd-container" key={i}>
                            <Link to={`/access-profiles/${v.name}`} className="box list-box">
                                <img src='/icons/access_profile.png' alt=''/>
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