import { cssConstant } from '@/components/CSSConstant/css.constant';
import DetailCompany from '@/containers/AppSearchForSupplier/ResultSearchCompany/CompanyDetail/DetailCompany';
import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { customCssSubMenuQCD } from './SubMenuQCD.custom.css';

const SubMenuQCD: FC = () => {
    const { t } = useTranslation();
    const { tab } = useSearchForSupplierContext();
    const {
        info: { companyName, label },
    } = tab;
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
                companyName={companyName}
                labelRada={label}
                isVisibleLabelDetail={false}
                customCssDetailCompanyTable={customCssSubMenuQCD}
            />
        </>
    );
};

export default SubMenuQCD;
