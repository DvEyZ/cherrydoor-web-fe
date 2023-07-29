import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Landing } from "../Landing/Landing";
import { Portal } from "react-portal";

export const NoAuth = () => {
    return(
        <>
            <Portal node={document && document.getElementById('header')}>
                <div style={{marginLeft:'auto'}}/>
            </Portal>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </>
    )
}