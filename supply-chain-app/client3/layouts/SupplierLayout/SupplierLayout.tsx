import Search from '@/assets/icons/company-search.svg';
import EvaluationDetails from '@/assets/icons/evaluation-details.svg';
import ParameterDetail from '@/assets/icons/parameter-details.svg';
import TabPanel from '@/components/Tab/TabPanelContainer';
import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import { Box, Grid, Tab, Tabs } from '@material-ui/core';
import { ReactNode, SVGProps, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useSupplierLayoutStyles from './SupplerLayout.style';
import { SearchForSupplierTabName } from '@/context/searchForSupplier/types';
import SubMenuQCD from './ControlBar/SubMenuQCD/SubMenuQCD';
import SearchConditionControlBar from './ControlBar/SearchConditionControlBar/SearchConditionControlBar';
import DetailAchievementsControlBar from './ControlBar/DetailAchievementsControlBar/DetailAchievementsControlBar';
import appMemo from '@/utils/appMemo';

const SupplierLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const classes = useSupplierLayoutStyles();
    const { t } = useTranslation();

    // Context
    const {
        tab: { tabId, labelTab },
        navigateTab,
    } = useSearchForSupplierContext();

    const renderControlTab = () => {
        let Icon: (props: SVGProps<any>) => JSX.Element = Search;
        switch (tabId) {
            case SearchForSupplierTabName.ReadFilePDF:
            case SearchForSupplierTabName.RedirectPage:
            case SearchForSupplierTabName.SupplierDetail:
                Icon = EvaluationDetails;
                break;
            case SearchForSupplierTabName.DetailAchievements:
                Icon = ParameterDetail;
                break;
            default:
                return null;
        }
        return (
            tabId !== Number(SearchForSupplierTabName.SearchCompany) &&
            tabId !== Number(SearchForSupplierTabName.ResultSearchCompany) && (
                <Tab
                    className={classes.tab}
                    value={tabId}
                    label={
                        <>
                            {t(labelTab)}
                            <Icon className={classes.searchIcon} />
                        </>
                    }
                />
            )
        );
    };

    const renderControlBar = () => {
        let ControlBar = SubMenuQCD;
        switch (tabId) {
            case SearchForSupplierTabName.SearchCompany:
            case SearchForSupplierTabName.ResultSearchCompany:
                ControlBar = SearchConditionControlBar;
                break;
            case SearchForSupplierTabName.RedirectPage:
            case SearchForSupplierTabName.ReadFilePDF:
            case SearchForSupplierTabName.SupplierDetail:
                ControlBar = SubMenuQCD;
                break;
            case SearchForSupplierTabName.DetailAchievements:
                ControlBar = DetailAchievementsControlBar;
                break;
            default:
                return <></>;
        }
        return <ControlBar />;
    };
    return (
        <Grid className={classes.wrapper} container>
            <Grid
                item
                className={classes.left}
                style={{
                    minWidth: tabId === SearchForSupplierTabName.SupplierDetail ? '518px' : '',
                }}
            >
                <Box className={classes.subMenuTop} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        className={classes.tabs}
                        value={tabId}
                        onChange={(_, value: SearchForSupplierTabName) => navigateTab(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="primary"
                        aria-label="scrollable auto tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#32363e',
                                top: 54,
                                height: 12,
                                width: '61.5px',
                                transition: 'none',
                            },
                        }}
                    >
                        {/* tab index 0 alway display */}
                        <Tab
                            className={classes.tab}
                            value={
                                tabId === SearchForSupplierTabName.SearchCompany
                                    ? SearchForSupplierTabName.SearchCompany
                                    : SearchForSupplierTabName.ResultSearchCompany
                            }
                            label={
                                <>
                                    {t('searchForSupplierNew.exploreConditions')}
                                    <Search className={classes.searchIcon} />
                                </>
                            }
                        />
                        {renderControlTab()}
                    </Tabs>
                </Box>
                <Box className={classes.subMenuBottom}>
                    <TabPanel
                        tabPanelContent={
                            <Box className={classes.containerColumnForm}>
                                <>{renderControlBar()}</>
                            </Box>
                        }
                        index={tabId}
                        value={tabId}
                    />
                </Box>
            </Grid>
            <Grid item className={classes.right}>
                {/* show main content */}
                <TabPanel tabPanelContent={children} index={tabId} value={tabId} />
            </Grid>
        </Grid>
    );
};

export default appMemo(SupplierLayout);
