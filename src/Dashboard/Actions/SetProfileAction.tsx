import React, { useContext, useEffect, useState } from "react";
import { AccessProfileBriefModel } from "../../AccessProfiles/models";
import { ApiContext } from "../../App/ApiContext";
import { Link } from "react-router-dom";

export const SetProfileAction = (props :{
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const [profiles, setProfiles] = useState<AccessProfileBriefModel[]>();
    const [activeProfileName, setActiveProfileName] = useState<string>();


    const fetchActiveProfile = () => {
        setActiveProfileName('break')
    }

    useEffect(() => {
        ctx.fetch(`${ctx.url}/access-profiles`).then((v) => {
            setProfiles(v);
        }).catch((e) => {
            props.onError(e)
        });

        fetchActiveProfile();
    }, [ctx, props]);

    if(activeProfileName && profiles)
    return(
        <Link to='/set-profile' className="box">
            <img src='/icons/access_profile.png' alt=''/>
            <div className="profile-text-container">
                <h2>Ustaw profil dostępu</h2>
                <div className="active-profile-text">
                    Aktywny profil dostępu: <Link to={`/access-profiles/${activeProfileName}`}>{activeProfileName}</Link>
                </div>
            </div>
        </Link>
    )
}