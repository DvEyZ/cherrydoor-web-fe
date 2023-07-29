import React, { useContext } from "react"
import { AccessProfileBriefModel } from "./models"
import { Link } from "react-router-dom"
import { ValueDisplay } from "../Data/Detail/ValueDisplay"
import { PermissionBriefModel } from "../Permissions/models"
import { ApiContext } from "../App/ApiContext"

export const AccessProfileBrief = (props :{
    data :AccessProfileBriefModel
}) => {
    return(
        <Link className="box" to={props.data.name}>
            <img src='/icons/access_profile.png' alt=''/>
            <h3>{props.data.name}</h3>
            <div>{props.data.description}</div>
        </Link>
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
        ctx.fetch(`${ctx.url}/access-profiles/${props.resourceId}/permissions/${id}`, 'DELETE').then(() => {
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

export const ColorDisplay :ValueDisplay = (props :{
    value :string,
    resourceId :string,
    refresh :() => any,
    onError: (e :Error) => any
}) => {
    return(
        <div className="value-display string-display" style={{ 
            paddingTop: '2px',
            paddingBottom: '2px'
        }}>
            <div className="field">Kolor</div>
            <div className="value" style={{
                display: 'flex',
                columnGap: '4px'
            }}>
                <div className="probe" style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: props.value
                }}></div>
                {props.value}
            </div>
        </div>
    )
}