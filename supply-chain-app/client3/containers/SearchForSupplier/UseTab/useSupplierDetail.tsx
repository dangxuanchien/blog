import { Tab } from '@material-ui/core';
import { SearchForSupplierTabContainer } from '../SearchForSupplier.constants';
import SearchMenuBar from '../ControlBar/SearchMenuBar/SearchMenuBar';
import { useSearchForSupplierContainer } from '../SearchForSupplier.style';
import { useTranslation } from 'react-i18next';
import useSearchForSupplierTab from '../SearchForSupplierTabContext';
import EvaluationDetails from '@/assets/icons/evaluation-details.svg';
import SubMenuQCD from '../ControlBar/SubMenuQCD/SubMenuQCD';
import DetailSupplier from '../TabContent/SupplierDetail/SupplierDetail';
import { Partial } from 'lodash';

interface useSupplierDetailProps {
    handleReloadDetail: any;
    handleClickRadarChart: any;
    mediumLine: any;
}

const useSupplierDetail = ({
    handleReloadDetail,
    handleClickRadarChart,
    mediumLine,
}: useSupplierDetailProps): SearchForSupplierTabContainer => {
    const style = useSearchForSupplierContainer();
    const { t } = useTranslation();
    const {
        tab: { tabId, labelTab, info },
    } = useSearchForSupplierTab();

    return {
        controlTab: (
            <Tab
                className={style.tab}
                value={tabId}
                label={
                    <>
                        {t(labelTab)}
                        <EvaluationDetails className={style.searchIcon} />
                    </>
                }
            />
        ),
        controlBar: (
            <SearchMenuBar>
                <SubMenuQCD
                    // labelRada={info.label}
                    mediumLine={mediumLine}
                    handleClickRadarChart={handleClickRadarChart}
                />
            </SearchMenuBar>
        ),
        content: <DetailSupplier supplierInfo={info} handleReloadDetail={(e: boolean) => handleReloadDetail(e)} />,
    };
};

export default useSupplierDetail;
