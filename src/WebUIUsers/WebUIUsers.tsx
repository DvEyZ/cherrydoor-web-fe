import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import { Index } from "../Data/Index"
import { Detail } from "../Data/Detail/Detail"
import { WebUIUserCreateModel, WebUIUserCreateSchema, WebUIUserFullModel, WebUIUserFullSchema } from "./models"
import { Editor } from "../Data/Editor/Editor"
import { Delete, Edit } from "../Data/Detail/Action"

export const WebUIUsers = () => {
    return(
        <div className="main cdisp">
            <div/>
            <Routes>
                <Route path='/' element={
                    <Index<WebUIUserFullModel> name='web-ui-users' url='web-ui-users' title="Użytkownicy panelu" BriefDisplay={WebUIUserBrief}/>
                } />
                <Route path='@create' element={
                    <Editor<WebUIUserCreateModel> name='web-ui-users' url='web-ui-users' schema={WebUIUserCreateSchema} />
                }/>
                <Route path=':resourceId' element={
                    <Detail<WebUIUserFullModel> name='web-ui-users' url='web-ui-users' schema={WebUIUserFullSchema} actions={[
                        Edit, Delete
                    ]}/>
                }/>
                <Route path=':resourceId/edit' element={
                    <Editor<WebUIUserCreateModel> name='web-ui-users' url='web-ui-users' schema={WebUIUserCreateSchema} />
                }/>
            </Routes>
        </div>
    )
}

export const WebUIUserBrief = (props :{
    data :WebUIUserFullModel
}) => {
    return(
        <Link className="box" to={props.data.name}>
            <img src={`/icons/${props.data.is_admin ? 'admin' : 'web_ui_user'}.png`} alt=''/>
            <h3>{props.data.name}</h3>
        </Link>
    )
}