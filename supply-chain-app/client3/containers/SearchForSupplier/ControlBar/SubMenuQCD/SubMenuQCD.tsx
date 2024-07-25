import { cssConstant } from '@/components/CSSConstant/css.constant';
import { Box, Typography } from '@material-ui/core';
import { useAppSelector } from '@/hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DetailCompany from '../../DetailCompany/DetailCompany';
import { customCss } from './SubMenuQCD.style';
import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import useOnClickRadarChart from '@/hooks/useOnClickRadarChart';
import useSearchForSupplierTab from '../../SearchForSupplierTabContext';

interface SubMenuQCDProps {
    className?: string;
    mediumLine?: Array<number>;
    handleClickRadarChart?: any;
}

const SubMenuQCD: FC<SubMenuQCDProps> = (props) => {
    const { mediumLine, handleClickRadarChart } = props;
    const { t } = useTranslation();
    const dataDetailsTable = useAppSelector((state) => state.detailCompanyReducer.detailsTable);
    const {
        tab: { info: companyInfo },
    } = useSearchForSupplierTab();
    const [detailSupplier, setDetailSupplier] = useState([]);

    const getSupplierDetail = (companyName: string, rawData = []) =>
        rawData.filter((item) => item['companyName'] === companyName);

    useEffect(() => {
        setDetailSupplier(getSupplierDetail(companyInfo.companyName, dataDetailsTable));
    }, [companyInfo]);

    return (
        <>
            <Box padding={1}>
                <Typography
                    component={'h3'}
                    style={{ paddingBottom: 24, fontWeight: 'bold', fontSize: `${cssConstant.font.mainTitle}` }}
                >
                    {t('detailSupplier.businessIntelligence')}
                </Typography>
            </Box>
            <DetailCompany
                dataSupplierDetail={detailSupplier}
                customCss={customCss}
                labelRada={companyInfo.label}
                mediumLine={mediumLine}
            />
        </>
    );
};

export default SubMenuQCD;
