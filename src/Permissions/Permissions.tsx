import React from "react";
import { Route, Routes } from "react-router-dom";
import { Index } from "../Data/Index";
import { PermissionBriefModel, PermissionBriefSchema, PermissionFullModel, PermissionFullSchema } from "./models";
import { AccessProfileRelDisplay, PermissionBrief, UserRelDisplay } from "./PermissionDisplay";
import { Detail } from "../Data/Detail/Detail";
import { Editor } from "../Data/Editor/Editor";
import { Delete, Edit, RelAdd } from "../Data/Detail/Action";

export const Permissions = () => {
    return(
        <div className="main cdisp">
            <div/>
            <Routes>
                <Route path='/' element={
                    <Index<PermissionBriefModel> name='permissions' url='permissions' title="Uprawnienia" BriefDisplay={PermissionBrief}/>
                } />
                <Route path='@create' element={
                    <Editor<PermissionBriefModel> name='permissions' url='permissions' schema={PermissionBriefSchema} />
                }/>
                <Route path=':resourceId' element={
                    <Detail<PermissionFullModel> name='permissions' url='permissions' schema={PermissionFullSchema} displays={{
                        fieldDisplays: {
                            users: UserRelDisplay,
                            access_profiles: AccessProfileRelDisplay
                        }
                    }} actions={[
                        Edit, Delete,
                        RelAdd('users', 'user', 'Przypisz użytkownika', 'users'),
                        RelAdd('access-profiles', 'access_profile', 'Przypisz profil dostępu', 'access_profiles')
                    ]} />
                } />
                <Route path=':resourceId/edit' element={
                    <Editor<PermissionBriefModel> name='permissions' url='permissions' schema={PermissionBriefSchema} />
                }/>
            </Routes>
        </div>
    )
}