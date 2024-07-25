import Loading from '@/components/Loading/Loading';
import { SearchForSupplierTabName } from '@/context/searchForSupplier/types';
import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import SupplierLayout from '@/layouts/SupplierLayout/SupplierLayout';
import React, { useMemo } from 'react';
const SearchCompany = React.lazy(
    () => import('@/containers/AppSearchForSupplier/ConditionSearchCompany/ConditionSearchCompany')
);
const RedirectPage = React.lazy(() => import('@/containers/AppSearchForSupplier/RedirectPage/RedirectPage'));
const SupplierDetail = React.lazy(() => import('@/containers/AppSearchForSupplier/SupplierDetail/SupplierDetail'));
const ReadFilePDF = React.lazy(() => import('@/containers/AppSearchForSupplier/ReadFilePDF/ReadFilePDF'));
const ResultSearchCompany = React.lazy(
    () => import('@/containers/AppSearchForSupplier/ResultSearchCompany/ResultSearchCompany')
);
const DetailAchievement = React.lazy(
    () => import('@/containers/AppSearchForSupplier/DetailAchievement/DetailAchievement')
);
const index = () => {
    const {
        tab: { tabId },
    } = useSearchForSupplierContext();
    // TODO: initial tabs

    const elementTab = useMemo(
        () => ({
            [SearchForSupplierTabName.ResultSearchCompany]: <ResultSearchCompany />,
            [SearchForSupplierTabName.SearchCompany]: <SearchCompany />,
            [SearchForSupplierTabName.DetailAchievements]: <DetailAchievement />,
            [SearchForSupplierTabName.ReadFilePDF]: <ReadFilePDF />,
            [SearchForSupplierTabName.RedirectPage]: <RedirectPage />,
            [SearchForSupplierTabName.SupplierDetail]: <SupplierDetail />,
        }),
        []
    );

    return (
        <SupplierLayout>
            <React.Suspense fallback={<Loading open />}>{elementTab[tabId]}</React.Suspense>
        </SupplierLayout>
    );
};

export default index;
