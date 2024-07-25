import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import { Box } from '@material-ui/core';
import { useSupplierDetailStyle } from './SupplierDetail.style';
import CorporateTrustEvaluationDetails from './SupplierDetail/CorporateTrustEvaluationDetails/CorporateTrustEvaluationDetails';
import ScoreTransition from './SupplierDetail/ScoreTransition/ScoreTransition';

export interface CompanyParameters {
    companyId?: string;
    score?: number;
    parameter?: string;
    companyScoreList?: number[];
}

const SupplierDetail = () => {
    // Context
    const {
        tab: { info },
    } = useSearchForSupplierContext();

    // Styles
    const classes = useSupplierDetailStyle();

    return (
        <Box className={classes.wrapper}>
            <CorporateTrustEvaluationDetails supplierInfo={info} />
            <ScoreTransition supplierInfo={info} />
        </Box>
    );
};
export default SupplierDetail;
