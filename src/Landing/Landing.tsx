import React from "react";
import './Landing.css'
import { Link } from "react-router-dom";

export const Landing = () => {
    return(
        <div className="main landing">
            <Link to='/' className="disabled box">
                <img src='/icons/pinpad.png' alt=''/>
                <h2>Wprowadź kod</h2>
                <div>Jeżeli otrzymał_ś kod jednorazowy.</div>
            </Link>
            <Link to='/login' className="box">
                <img src='/icons/access.png' alt=''/>
                <h2>Zaloguj się</h2>
                <div>Jeżeli jesteś administratorem i chcesz uzyskać dostęp do panelu administracyjnego.</div>
            </Link>
        </div>
    )
}