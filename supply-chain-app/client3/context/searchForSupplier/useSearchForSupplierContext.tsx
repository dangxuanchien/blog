import appMemo from '@/utils/appMemo';
import { ReactNode, createContext, useContext, useState } from 'react';
import { SearchForSupplierTabName, SearchForSupplierTabState } from './types';

const initialState: SearchForSupplierTabState = {
    tab: {
        tabId: SearchForSupplierTabName.SearchCompany,
        labelTab: 'searchForSupplierNew.exploreConditions',
        info: {
            companyName: '',
            score: 0,
            label: '',
        },
        mediumLine: [],
    },
    resetTab(tab) {},
    setTab(value) {},
    navigateTab(tabId) {},
};

const SearchForSupplierTabContext = createContext(initialState);

export const SearchForSupplierTabProvider: React.FC<{ children: ReactNode }> = appMemo(({ children }) => {
    const [tab, setTab] = useState(initialState.tab);
    const resetTab = () => setTab(initialState.tab);

    const navigateTab = (tabId: SearchForSupplierTabName) => {
        let labelTab: string = '';
        switch (tabId) {
            case SearchForSupplierTabName.SearchCompany:
            case SearchForSupplierTabName.ResultSearchCompany:
                labelTab = 'searchForSupplierNew.exploreConditions';
                break;
            default:
                labelTab = 'detailSupplier.evaluationDetails';
                break;
        }
        setTab((prev) => ({ ...prev, labelTab, tabId }));
    };

    const value: SearchForSupplierTabState = {
        tab,
        setTab,
        resetTab,
        navigateTab,
    };
    return <SearchForSupplierTabContext.Provider value={value}>{children}</SearchForSupplierTabContext.Provider>;
});

const useSearchForSupplierContext = () => {
    const context = useContext(SearchForSupplierTabContext);
    if (context === undefined) {
        throw new Error(' SearchForSupplierTab must be used within SearchForSupplierTabContext');
    }

    return context;
};

export default useSearchForSupplierContext;
