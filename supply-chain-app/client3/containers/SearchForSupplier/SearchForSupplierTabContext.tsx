import { ReactNode, createContext, useContext, useState } from 'react';
import { searchForSupplierTabState } from './SearchForSupplier.constants';

type SearchForSupplierTabProviderProps = {
    children: ReactNode;
};

const SearchForSupplierTabContext = createContext(searchForSupplierTabState);

export const SearchForSupplierTabProvider = ({ children }: SearchForSupplierTabProviderProps) => {
    const [tab, setTab] = useState(searchForSupplierTabState.tab);
    const resetTab = () => setTab(searchForSupplierTabState.tab);
    const value = {
        tab,
        setTab,
        resetTab,
    };
    return <SearchForSupplierTabContext.Provider value={value}>{children}</SearchForSupplierTabContext.Provider>;
};

const useSearchForSupplierTab = () => {
    const context = useContext(SearchForSupplierTabContext);

    if (context === undefined) {
        throw new Error(' SearchForSupplierTab must be used within SearchForSupplierTabContext');
    }

    return context;
};

export default useSearchForSupplierTab;
