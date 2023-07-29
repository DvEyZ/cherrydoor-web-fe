import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Portal } from 'react-portal';
import { LoginUser } from "./LoginUser";
import { Users } from "../Users/Users";
import { Permissions } from "../Permissions/Permissions";
import { WebUIUsers } from "../WebUIUsers/WebUIUsers";
import { AccessProfiles } from "../AccessProfiles/AccessProfiles";

export const WithAuth = () => {
    return(
        <>
            <Portal node={document && document.querySelector('#lp-container')}>
                <LoginUser/>
            </Portal>
            <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/web-ui-users/*' element={<WebUIUsers/>}/>
                <Route path='/users/*' element={<Users/>}/>
                <Route path='/permissions/*' element={<Permissions/>}/>
                <Route path='/access-profiles/*' element={<AccessProfiles/>}/>
            </Routes>
        </>
    )
}