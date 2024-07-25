import { Tab } from '@material-ui/core';
import { SearchForSupplierTabContainer } from '../SearchForSupplier.constants';
import SearchMenuBar from '../ControlBar/SearchMenuBar/SearchMenuBar';
import { useSearchForSupplierContainer } from '../SearchForSupplier.style';
import { useTranslation } from 'react-i18next';
import useSearchForSupplierTab from '../SearchForSupplierTabContext';
import EvaluationDetails from '@/assets/icons/evaluation-details.svg';
import SubMenuQCD from '../ControlBar/SubMenuQCD/SubMenuQCD';
import RedirectPage from '../TabContent/RedirectPage/RedirectPage';

type useRedirectPageProps = {
    handleClickRadarChart: any;
    mediumLine: any;
};

const useRedirectPage = ({
    handleClickRadarChart,
    mediumLine,
}: useRedirectPageProps): SearchForSupplierTabContainer => {
    const style = useSearchForSupplierContainer();
    const { t } = useTranslation();
    const {
        tab: { tabId, labelTab },
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
                    mediumLine={mediumLine}
                    handleClickRadarChart={handleClickRadarChart}
                />
            </SearchMenuBar>
        ),
        content: <RedirectPage />,
    };
};

export default useRedirectPage;
