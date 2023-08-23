import React, { useContext, useEffect, useState } from "react";
import { AccessProfileBriefModel } from "../../AccessProfiles/models";
import { ApiContext } from "../../App/ApiContext";
import { Link } from "react-router-dom";

export const SetProfileAction = (props :{
    onError: (e :Error) => any
}) => {
    const ctx = useContext(ApiContext);

    const [profiles, setProfiles] = useState<AccessProfileBriefModel[]>();
    const [activeProfile, setActiveProfile] = useState<{name :string}>();

    useEffect(() => {
        ctx.fetch(`${ctx.url}/access-profiles`).then((v) => {
            setProfiles(v);
        }).catch((e) => {
            props.onError(e)
        });

        ctx.fetch(`${ctx.url}/active-profile`).then((v) => {
            setActiveProfile(v);
        }).catch((e) => {
            props.onError(e);
        })
    }, [ctx, props]);

    const onSelectProfile = (e :React.ChangeEvent<HTMLSelectElement>) => {
        ctx.fetch(`${ctx.url}/active-profile`, 'POST', JSON.stringify({
            name: e.target.value
        })).then((v) => {
            ctx.fetch(`${ctx.url}/active-profile`).then((v) => {
                setActiveProfile(v);
            }).catch((e) => {
                props.onError(e);
            })
        }).catch((e) => {
            props.onError(e)
        })
    }

    if(activeProfile && profiles)
    return(
        <div className="box">
            <img src='/icons/access_profile.png' alt=''/>
            <div className="profile-text-container">
                <h2>Ustaw profil dostępu</h2>
                <div className="active-profile-text">
                    Aktywny profil dostępu: <Link to={`/access-profiles/${activeProfile.name}`}>{activeProfile.name}</Link>
                </div>
            </div>
            <div style={{margin: 'auto'}}></div>
            <select onChange={(e) => { onSelectProfile(e) }} value={activeProfile.name}>
                {
                    profiles.map((v,i) => 
                        <option key={i} value={v.name}>{v.name}</option>
                    )
                }
            </select>
        </div>
    )
}