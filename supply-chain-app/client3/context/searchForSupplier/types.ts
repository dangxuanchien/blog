import { AppCornerInfoRadarChart, CornerInfoRadarChart } from '@/components/Chart/AppRadarChart/AppRadarChart';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export enum SearchForSupplierTabName {
    SearchCompany,
    ResultSearchCompany,
    SupplierDetail,
    DetailAchievements,
    RedirectPage,
    ReadFilePDF,
}

export type SearchForSupplierTab = {
    tabId: SearchForSupplierTabName;
    labelTab: string;
    info: AppCornerInfoRadarChart;
    mediumLine?: any[];
};

export type SearchForSupplierTabState = {
    tab: SearchForSupplierTab;
    setTab: Dispatch<SetStateAction<SearchForSupplierTab>>;
    resetTab: (tab: SearchForSupplierTab) => void;
    navigateTab: (tabId: SearchForSupplierTabName) => void;
};

export type SearchForSupplierTabContainer = {
    controlTab: ReactNode;
    controlBar: ReactNode;
    content: ReactNode;
};
