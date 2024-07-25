import { Box, Grid, Tab, Tabs } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchForSupplierContainer } from './SearchForSupplier.style';
import TabPanel from '@/components/Tab/TabPanelContainer';
import { SearchForSupplierCases } from '@/types/index';
import { SearchForSupplierTabName } from './SearchForSupplier.constants';
import useSearchForSupplierTab from './SearchForSupplierTabContext';
import useSupplierDetail from './UseTab/useSupplierDetail';
import useDetailAchievements from './UseTab/useDetailAchievements';
import useRedirectPage from './UseTab/useRedirectPage';
import useReadFilePDF from './UseTab/useReadFilePDF';
import useEnterpriseSearch from './UseTab/useEnterpriseSearch';
import { CornerInfoRadarChart, RadarChartData } from '@/components/Chart/AppRadarChart/AppRadarChart';
import { t } from 'i18next';
import Search from '@/assets/icons/company-search.svg';
/**
 * Render to a tab of component
 *
 * @returns CustomListItem
 */

const SearchForSupplier: FC = () => {
    const style = useSearchForSupplierContainer();
    const {
        tab: { tabId, labelTab, info },
        setTab,
    } = useSearchForSupplierTab();
    const searchResult = useSelector((state: any) => state.searchForSupplierReducer.tableSearchData);
    const [isReloadDetail, setIsReloadDetail] = useState(false);
    const [mediumLine, setMediumLine] = useState([]);
    const dataSearch = useSelector((state: any) => state.filterSearchForSupplierReducer.filters);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTab({
            tabId: newValue,
            labelTab,
            info,
        });
    }
    const handleReloadDetail = (value) => {
        setIsReloadDetail(value);
    };

    const getConditionSearch = () => {
        let typeSearch = '';

        if (
            dataSearch.itemCategoryGroup &&
            dataSearch.itemCategoryGroup.length > 0 &&
            dataSearch.itemCategory &&
            dataSearch.itemCategory.length > 0 &&
            dataSearch.itemName &&
            dataSearch.itemName.length > 0
        ) {
            typeSearch = SearchForSupplierCases.ITEM_NAME;
        } else if (
            dataSearch.itemCategoryGroup &&
            dataSearch.itemCategoryGroup.length > 0 &&
            dataSearch.itemCategory &&
            dataSearch.itemCategory.length > 0
        ) {
            typeSearch = SearchForSupplierCases.CATEGORY;
        } else if (dataSearch.itemCategoryGroup && dataSearch.itemCategoryGroup.length > 0) {
            typeSearch = SearchForSupplierCases.GROUP;
        }
        return typeSearch;
    };

    const convertData = (rawData: RadarChartData): Array<CornerInfoRadarChart> => {
        const { label: companyName, data, companyId } = rawData.datasets[0];
        const labels = rawData.labels;
        const result = data.map((item, index) => ({
            score: item,
            label: labels[index],
            companyName,
            tabId: index,
            companyId,
        }));
        return result;
    };

    const dispatchTab = (tempTabId, infoScore, cornerInfoRadarChart, relevantScore = '') => {
        setTab({
            tabId: tempTabId,
            labelTab: 'detailSupplier.evaluationDetails',
            info: {
                companyName: cornerInfoRadarChart.companyName,
                score: infoScore,
                label: cornerInfoRadarChart.label,
                relevantScore,
                companyId: cornerInfoRadarChart.companyId,
                companyIds: searchResult.map((item) => item.companyId),
                conditionSearch: getConditionSearch(),
            },
        });
    };

    const handleClickRadarChart = (index: number, data) => {
        const cornerInfoRadarChart = convertData(data)[index] as unknown as CornerInfoRadarChart;
        let tempTabId = 1;
        let relevantScore = '';
        setMediumLine(data.datasets[1].data);
        switch (cornerInfoRadarChart.tabId) {
            case 0:
                relevantScore = 'quality_score';
                break;
            case 1:
                relevantScore = 'cost_score';
                break;
            case 2:
                relevantScore = 'delivery_score';
                break;
            default:
                relevantScore = '';
                break;
        }

        if (cornerInfoRadarChart.tabId <= 2) {
            dispatchTab(tempTabId, cornerInfoRadarChart.score, cornerInfoRadarChart, relevantScore);
        }
        if (cornerInfoRadarChart.tabId === 3) {
            tempTabId = 3;
            dispatchTab(tempTabId, cornerInfoRadarChart.score, cornerInfoRadarChart);
        } else if (cornerInfoRadarChart.tabId >= 4 && cornerInfoRadarChart.tabId <= 7 && data) {
            tempTabId = 4;
            const dataScore = {
                companyName: cornerInfoRadarChart.companyName,
                environmentScore: data.datasets[0].data[4],
                laborScore: data.datasets[0].data[5],
                ethicsScore: data.datasets[0].data[6],
                sustainableScore: data.datasets[0].data[7],
            };
            dispatchTab(tempTabId, dataScore, cornerInfoRadarChart);
        }
    };

    const enterpriseSearch = useEnterpriseSearch({
        handleClickRadarChart,
        handleReloadDetail,
        isReloadDetail,
    });

    const supplierDetail = useSupplierDetail({
        handleClickRadarChart,
        handleReloadDetail,
        mediumLine,
    });

    const detailAchievements = useDetailAchievements({
        handleReloadDetail,
    });

    const redirectPage = useRedirectPage({ handleClickRadarChart, mediumLine });

    const readFilePDF = useReadFilePDF({ handleClickRadarChart, mediumLine });

    const MAIN_TABS = {
        [SearchForSupplierTabName.EnterpriseSearch]: enterpriseSearch,
        [SearchForSupplierTabName.SupplierDetail]: supplierDetail,
        [SearchForSupplierTabName.DetailAchievements]: detailAchievements,
        [SearchForSupplierTabName.RedirectPage]: redirectPage,
        [SearchForSupplierTabName.ReadFilePDF]: readFilePDF,
    };

    return (
        <Grid className={style.wrapper} container>
            <Grid
                item
                className={style.left}
                style={{
                    width: tabId === 2 && '420px',
                    minWidth: tabId === 2 && '420px',
                }}
            >
                <Box className={style.subMenuTop} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        className={style.tabs}
                        value={0}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="primary"
                        aria-label="scrollable auto tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#32363e',
                                top: 54,
                                height: 10,
                                width: '61.5px',
                                transition: 'none',
                            },
                        }}
                    >
                        {/* tab index 0 alway display */}
                        {MAIN_TABS[0].controlTab}
                        <Tab
                            className={style.tab}
                            label={
                                <>
                                    {t('searchForSupplierNew.exploreConditions')}
                                    <Search className={style.searchIcon} />
                                </>
                            }
                            value={1}
                        />
                        {tabId !== 0 && MAIN_TABS[tabId].controlTab}
                    </Tabs>
                </Box>
                <Box className={style.subMenuBottom}>
                    <TabPanel tabPanelContent={MAIN_TABS[tabId].controlBar} index={tabId} value={tabId} />
                </Box>
            </Grid>
            <Grid item className={style.right}>
                {/* show main content */}
                <TabPanel tabPanelContent={MAIN_TABS[tabId].content} index={tabId} value={tabId} />
            </Grid>
        </Grid>
    );
};

export default SearchForSupplier;
