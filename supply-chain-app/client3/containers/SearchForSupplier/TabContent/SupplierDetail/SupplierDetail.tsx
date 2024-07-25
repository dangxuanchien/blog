import { CornerInfoRadarChart } from '@/components/Chart/CustomRadarChart/CustomRadarChart';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC, useEffect } from 'react';
import CorporateTrustEvaluationDetails from './CorporateTrustEvaluationDetails/CorporateTrustEvaluationDetails.component';
import ScoreTransition from './ScoreTransition/ScoreTransition';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
            minWidth: '800px',
            height: '100%',
            minHeight: '800px',
            padding: '0 21px 0 10px',
        },
    })
);

type DetailSupplierProps = {
    supplierInfo: CornerInfoRadarChart;
    handleReloadDetail: any;
};

export interface CompanyParameters {
    companyId?: string;
    score?: number;
    parameter?: string;
    companyScoreList?: number[];
}

const DetailSupplier: FC<DetailSupplierProps> = ({ supplierInfo, handleReloadDetail }) => {
    const style = useStyles();

    useEffect(() => {
        handleReloadDetail(true);
    });

    return (
        <Box className={style.wrapper}>
            <CorporateTrustEvaluationDetails supplierInfo={supplierInfo} />
            <ScoreTransition supplierInfo={supplierInfo} />
        </Box>
    );
};

export default DetailSupplier;
