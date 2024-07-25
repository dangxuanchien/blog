import { createContext } from 'react';

const ThemContext = createContext({
    getMode: 'light',
    setMode: (getMode: string) => {},
});


export {ThemContext};