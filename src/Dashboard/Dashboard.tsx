import React, { useContext, useEffect, useState } from "react";
import './Dashboard.css'
import { Link } from "react-router-dom";
import { ApiContext } from "../App/ApiContext";
import { Status, StatusResponse } from "./Status/Status";
import { ErrorReport } from "../App/Report/ErrorReport";
import { Loading } from "../App/Loading";
import { OpenDoorAction } from "./Actions/OpenDoorAction";
import { SetProfileAction } from "./Actions/SetProfileAction";
import { LoadingError } from "../App/LoadingError";

export const Dashboard = () => {
    const ctx = useContext(ApiContext);

    const [status, setStatus] = useState<StatusResponse>();
    const [fatal, setFatal] = useState<Error>();
    const [error, setError] = useState<Error>();
    const [loaded, setLoaded] = useState<boolean>();

    const onActionError = (e :Error) => {
        setError(e);
    }

    useEffect(() => {
        ctx.fetch(`${ctx.url}/status`).then((v) => {
            setStatus(v);
            setLoaded(true);
        }).catch((e) => {
            setFatal(e);
            setLoaded(true);
        })
    }, [ctx]);


    if(!loaded) return <Loading/>

    if(fatal) return <LoadingError error={fatal}/>

    if(status && !fatal)
    return(
        <>
            {
                error && <ErrorReport error={error} onClose={() => {setError(undefined)}}/>
            }
            <div className="main dashboard">
                <div className="manage">
                    <h1>Zarządzanie</h1>
                    <div className="manage">
                        <Link to='/web-ui-users' className="box">
                            <img src="/icons/web_ui_user.png" alt=''/>
                            <h2>Dostęp do panelu</h2>
                        </Link>
                        <Link to='/users' className="box">
                            <img src="/icons/user.png" alt=''/>
                            <h2>Użytkownicy</h2>
                        </Link>
                        <Link to='/permissions' className="box">
                            <img src="/icons/permission.png" alt=''/>
                            <h2>Uprawnienia</h2>
                        </Link>
                        <Link to='/access-profiles' className="box">
                            <img src="/icons/access_profile.png" alt=''/>
                            <h2>Profile dostępu</h2>
                        </Link>
                        <Link to='/schedule' className="box disabled">
                            <img src='/icons/schedule.png' alt=""/>
                            <h2>Harmonogram profilów</h2>
                        </Link>
                        <Link to='/logs' className="box disabled">
                            <img src="/icons/logs.png" alt=''/>
                            <h2>Logi</h2>
                        </Link>
                        <Link to='/docs' className="box disabled">
                            <img src="/icons/docs.png" alt=''/>
                            <h2>Dokumentacja</h2>
                        </Link>
                    </div>
                </div>
                <div>
                    <h1>Status</h1>
                    <Status status={status}/>
                </div>
                <div>
                    <h1>Akcje</h1>
                    <div className="actions">
                        <OpenDoorAction onError={(e) => {onActionError(e)}}/>
                        <SetProfileAction onError={(e) => {onActionError(e)}}/>
                    </div>
                </div>
            </div>
        </>
    )
}