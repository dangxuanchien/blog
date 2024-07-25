import Router from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAuthentication() {
    const [user, setUser] = useState({
        token: '',
    });
    useEffect(() => {
        const token = localStorage?.getItem('accessToken') || '';
        setUser({
            ...user,
            token: token,
        });
        if (!token) {
            Router.push('/login');
        }
    }, []);
    return user;
}
