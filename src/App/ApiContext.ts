import React from "react";

interface LoggedUser {
    name :string,
    is_admin :boolean
}

export interface IApiContext {
    url :string,
    token :string | undefined,
    setToken(t :string) :any,
    dropToken() :any,
    getUser() :LoggedUser,
    fetch(
        url :string, 
        method? :'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS',
        body? :string
    ) :Promise<any>,
};

export const ApiContext = React.createContext<IApiContext>({
    url: '',
    token: undefined,
    
    setToken: async () => {},
    dropToken: async () => {},
    getUser: () => { return {
        name: 'simo',
        is_admin: true
    }},
    fetch: async () => {},
});

export const API_URL = process.env.REACT_APP_API_URL!;