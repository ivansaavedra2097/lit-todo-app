import { LS_TYPES } from "../types";

const AuthBaseURL =  "http://localhost:5000/api/auth";

export const login = async ( email, password ) => {
    try {
        const resp = await fetch(`${AuthBaseURL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if( !resp.ok ) throw new Error( resp.statusText );

        const { user, token } = await resp.json();

        return { user, token }
    } catch (error) {
        throw new Error( error )
    }
}

export const currentUser = async () => {
    try {
        const token = localStorage.getItem(LS_TYPES.token);

        if( !token ) return null;

        console.log({ token })
        const resp = await fetch(`${AuthBaseURL}/current-user`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if( !resp.ok ) throw new Error( resp.statusText );

        const { user } = await resp.json();
        
        return user;
    } catch (error) {
        throw new Error( error );
    }
}