import { Grid } from '@material-ui/core';
import { useCallback } from 'react';

import CompanyTable from '@/containers/AppSearchForSupplier/ResultSearchCompany/CompanyTable/CompanyTable';
import { useSearchResultStyle } from '@/containers/AppSearchForSupplier/ResultSearchCompany/ResultSearchCompany.style';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectControlDisplay } from '@/redux/appSearchForSupplier/resultSearchCompany/selector';
import CompanyCompare from './CompanyCompare/CompanyCompare';
import DetailCompany from './CompanyDetail/DetailCompany';

const ResultSearchCompanyTemp = () => {
    // Style
    const classes = useSearchResultStyle();

    // Selector
    const controlDisplay = useAppSelector(selectControlDisplay);

    const {
        compareDisplay: { isDisplayTrust, isDisplayPrice },
    } = controlDisplay;

    const renderCompare = useCallback(() => {
        if (isDisplayTrust) {
            return <DetailCompany isShowMediumLine={true} isShowLabelScore={true} />;
        } else if (isDisplayPrice) {
            return <CompanyCompare />;
        } else {
            return <></>;
        }
    }, [isDisplayTrust, isDisplayPrice]);

    return (
        <Grid className={classes.container} container direction="column" alignItems="center">
            <Grid className={classes.containerContent}>
                <CompanyTable />
                <Grid className={classes.containerComparison} style={{ height: 10 }}>
                    <Grid className={classes.containerChart}>{renderCompare()}</Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResultSearchCompanyTemp;
