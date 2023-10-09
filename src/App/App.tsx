import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { ApiContext, API_URL } from './ApiContext';
import { NoAuth } from './NoAuth';
import { WithAuth } from './WithAuth';
import * as jose from 'jose'

export const App = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | undefined>();

    const assignToken = (t :string) => {
        localStorage.setItem('token', t);
        setToken(t);
    }
    const dropToken = () => {
        localStorage.removeItem('token');
        setToken(undefined);
        navigate('/');
    }

    useEffect(() => {
        setToken(localStorage.getItem('token')?.toString())
    }, []);

    return (
        <div>
            <header id='header'>
                <Link to='/' className='head'>
                    <img src='/favicon.svg' alt='' />
                    <h1>CHERRYDOOR</h1>
                </Link>
                <div id='lp-container' style={{marginLeft: 'auto'}}></div>
            </header>
            <ApiContext.Provider value={{
                url: API_URL,
                token: token,
                setToken: (t) => {
                    assignToken(t);
                },
                dropToken: () => {
                    dropToken();
                },
                getUser: () => {
                    let c = jose.decodeJwt(token!);
                    return {
                        name: String(c.name),
                        is_admin: Boolean(c.is_admin)
                    }
                },
                fetch: async (url, method = 'GET', body = undefined) => {
                    return fetch(url, {
                        method: method,
                        body: body,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }).then(async (res) => {
                        if(res.status === 401) dropToken();
                        if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`)

                        if(res.status === 204) return null;
                        return res.json()
                    })
                },
            }}>
                <main>
                    {
                        !token && 
                        <NoAuth/>
                    }
                    {
                        token && 
                        <WithAuth/>
                    }
                </main>
            </ApiContext.Provider>
            <footer>
                <p>powered by</p>
                <a className='logo' href='https://wisniowasu.pl'>
                    <img src='https://wisniowasu.pl/static/media/logo_title.03fb8b0c596ea499b73e.png' alt='Wiśniowa'/>
                </a>
                <p>Made by<> </>
                    <a href='https://github.com/Wiktor00Nedew'>Wiktor Nedew</a> &<> </>
                    <a href='https://github.com/AvgLinuxUser'>Sylwia Milewska</a> &<> </>
                    <a href='https://github.com/DvEyZ'>Szymon Kwiręg</a><> </>
                </p>
                wersja 0.0.0
            </footer>
            <div id='popup-container'></div>
        </div>
    );
}