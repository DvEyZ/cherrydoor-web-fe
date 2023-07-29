import React from "react"
import { Route, Routes } from "react-router-dom"
import { Index } from "../Data/Index"
import { AccessProfileBriefModel, AccessProfileBriefSchema, AccessProfileFullModel, AccessProfileFullSchema } from "./models"
import { Detail } from "../Data/Detail/Detail"
import { AccessProfileBrief, ColorDisplay, PermissionRelDisplay } from "./AccessProfileDisplay"
import { Delete, Edit, RelAdd } from "../Data/Detail/Action"
import { Editor } from "../Data/Editor/Editor"

export const AccessProfiles = () => {
    return(
        <div className="main cdisp">
            <div/>
            <Routes>
                <Route path='/' element={
                    <Index<AccessProfileBriefModel> name='access-profiles' url='access-profiles' title="Profile dostępu" BriefDisplay={AccessProfileBrief}/>
                } />
                <Route path='@create' element={
                    <Editor<AccessProfileBriefModel> name='access-profiles' url='access-profiles' schema={AccessProfileBriefSchema} />
                }/>
                <Route path=':resourceId' element={
                    <Detail<AccessProfileFullModel> name='access-profiles' url='access-profiles' schema={AccessProfileFullSchema} displays={{
                        fieldDisplays: {
                            color: ColorDisplay,
                            permissions: PermissionRelDisplay
                        }
                    }} actions={[
                        Edit, Delete,
                        RelAdd('permissions', 'permission', 'Powiąż z uprawnieniem', 'permissions')
                    ]}/>
                } />
                <Route path=':resourceId/edit' element={
                    <Editor<AccessProfileBriefModel> name='access-profiles' url='access-profiles' schema={AccessProfileBriefSchema} />
                }/>
            </Routes>
        </div>
    )
}