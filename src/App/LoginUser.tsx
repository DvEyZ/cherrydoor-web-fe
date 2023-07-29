import React, { useContext, useState } from "react";
import { ApiContext } from "./ApiContext";
import { Link, useNavigate } from "react-router-dom";

export const LoginUser = () => {
    const ctx = useContext(ApiContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);

    const logOut = () => {
        ctx.dropToken();
        navigate('/');
    }

    return(
        <div className="login-user-container">
            <button className={`login-user ${open && 'active'}`} style={{
                    marginLeft: 'auto'
            }} onClick={() => {setOpen(!open)}}>
                <div className="login-user-icon-container">
                    <img src={`/icons/${
                        ctx.getUser().is_admin ? 'admin' : 'web_ui_user'
                    }.png`} alt={ctx.getUser().is_admin ? 'admin' : 'user'} className="login-user-icon"/>
                </div>
            </button>
            <div className={`login-popup-container ${!open && 'hidden'}`}>
                <div>Zalogowano jako <Link to={`/web-ui-users/${ctx.getUser().name}`}>{ctx.getUser().name}</Link></div>
                <button className="logout-button" onClick={() => {logOut()}}>
                    <img src='/icons/logout.png'/>
                    <div>Wyloguj się</div>
                </button>
            </div>
        </div>
    )
}