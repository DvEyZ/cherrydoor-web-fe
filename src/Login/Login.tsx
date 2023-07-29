import React, { useContext, useState } from "react";
import { ApiContext } from "../App/ApiContext";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { ErrorReport } from "../App/Report/ErrorReport";

interface AuthResponse {
    token :string
}

export const Login = () => {
    const ctx = useContext(ApiContext);
    const navigate = useNavigate();

    const [error, setError] = useState<Error>();

    const onSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        let data = new FormData(e.currentTarget);
        let body = {
            name: data.get('name')?.toString(),
            password: data.get('password')?.toString()
        }

        ctx.fetch(`${ctx.url}/auth`, 'POST', JSON.stringify(body)).then((v :AuthResponse) => {
            ctx.setToken(v.token);
            navigate('/');
        }).catch((e) => {
            setError(e);
        });
    }

    return(
        <>
            {
                error && <ErrorReport error={error} onClose={() => {setError(undefined)}}/>
            }
            <div className="form-container">
                <form className="form" onSubmit={(e) => {onSubmit(e)}}>
                    <div>
                        <label htmlFor='name'>Nazwa użytkownika</label>
                    </div>
                    <div>
                        <input type='text' id='name' name='name' required/>
                    </div>
                    
                    <div>
                        <label htmlFor='password'>Hasło</label>
                    </div>
                    <div>
                        <input type='password' id='password' name='password' required/>
                    </div>

                    <div/>
                    <input type="submit" value="Zaloguj się"/>
                </form>
            </div>
        </>
    )
}