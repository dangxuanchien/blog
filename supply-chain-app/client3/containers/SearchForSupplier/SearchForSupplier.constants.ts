import { CornerInfoRadarChart } from '@/components/Chart/CustomRadarChart/CustomRadarChart';
import { ReactNode } from 'react';

export type OptionDate = {
    startDate: Date;
    endDate: Date;
};

export enum SearchForSupplierTabName {
    EnterpriseSearch,
    SupplierDetail,
    DetailAchievements,
    RedirectPage,
    ReadFilePDF,
}

export type SearchForSupplierTab = {
    tabId: SearchForSupplierTabName;
    labelTab: string;
    info: CornerInfoRadarChart;
};

export type SearchForSupplierTabState = {
    tab: SearchForSupplierTab;
    setTab?: (tab: SearchForSupplierTab) => void;
    resetTab?: (tab: SearchForSupplierTab) => void;
};

export type SearchForSupplierTabContainer = {
    controlTab: ReactNode;
    controlBar: ReactNode;
    content: ReactNode;
};

export const searchForSupplierTabState: SearchForSupplierTabState = {
    tab: {
        tabId: 0,
        labelTab: '',
        info: {
            companyName: '',
            score: 0,
            label: '',
        },
    },
};
