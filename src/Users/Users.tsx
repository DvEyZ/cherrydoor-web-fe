import React from "react";
import { Route, Routes } from "react-router-dom";
import { Index } from "../Data/Index";
import { UserBriefModel, UserFullSchema, UserFullModel, UserBriefSchema } from "./models";
import { AccessCodeAdd, AccessCodeRegister, AccessCodesDisplay, PermissionRelDisplay, UserBrief } from "./UserDisplay";
import { Detail } from "../Data/Detail/Detail";
import './Users.css'
import { Editor } from "../Data/Editor/Editor";
import { Delete, Edit, RelAdd } from "../Data/Detail/Action";

export const Users = () => {
    return(
        <div className="main cdisp">
            <div/>
            <Routes>
                <Route path='/' element={
                    <Index<UserBriefModel> name='users' url='users' title="Użytkownicy" BriefDisplay={UserBrief} paginate/>
                } />
                <Route path='@create' element={
                    <Editor<UserBriefModel> name='users' url='users' schema={UserBriefSchema} />
                }/>
                <Route path=':resourceId' element={
                    <Detail<UserFullModel> name='users' url='users' schema={UserFullSchema} displays={{
                        fieldDisplays: {
                            access_codes: AccessCodesDisplay,
                            permissions: PermissionRelDisplay
                        }
                    }} actions={[
                        Edit, Delete, 
                        RelAdd('permissions', 'permission', 'Nadaj uprawnienie', 'permissions'),
                        AccessCodeAdd,
                        AccessCodeRegister
                    ]} />
                }/>
                <Route path=':resourceId/edit' element={
                    <Editor<UserBriefModel> name='users' url='users' schema={UserBriefSchema}/>
                }/>
            </Routes>
        </div>
    )
}