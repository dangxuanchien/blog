import { Tab } from '@material-ui/core';
import { OptionDate, SearchForSupplierTabContainer } from '../SearchForSupplier.constants';
import SearchMenuBar from '../ControlBar/SearchMenuBar/SearchMenuBar';
import { useSearchForSupplierContainer } from '../SearchForSupplier.style';
import { useTranslation } from 'react-i18next';
import useSearchForSupplierTab from '../SearchForSupplierTabContext';
import ParameterDetail from '@/assets/icons/parameter-details.svg';
import DetailAchievements from '../ControlBar/DetailAchivementsControlBar/DetailAchivements';
import DateRangePicker from '@/components/Inputs/DateRangePicker/DateRangePicker';
import DetailParameter from '../TabContent/DetailAchievements/DetailParameter';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect, useState } from 'react';
import moment from 'moment';

type useDetailAchievementsProps = {
    handleReloadDetail: any;
};

const useDetailAchievements = ({ handleReloadDetail }: useDetailAchievementsProps): SearchForSupplierTabContainer => {
    const style = useSearchForSupplierContainer();
    const { t } = useTranslation();
    const {
        tab: { tabId },
    } = useSearchForSupplierTab();
    const { detailAchievementsTabParams } = useAppSelector((state) => state.detailAchievementsReducer);
    const [showChart, setShowChart] = useState(false);
    const [dataSelected, setDataSelected] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [optionDate, setOptionDate] = useState<OptionDate>({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        endDate: new Date(),
    });

    const dataSelect = (data, startDate, endDate) => {
        setDataSelected(data);
        const startDay = startDate || optionDate.startDate;
        const endDay = endDate || optionDate.endDate;
        const dataChart = data.map((item) => {
            if (item.selected) {
                const test = item.chartData.filter((element) => {
                    if (moment(element.x).isBetween(moment(startDay), moment(endDay))) {
                        return element;
                    }
                });
                return {
                    id: item.id,
                    parameter: item.parameter,
                    selected: item.selected,
                    chartData: test,
                };
            }
            return [];
        });
        setShowChart(true);
        setDataChart(dataChart);
    };

    useEffect(() => {
        setShowChart(false);
        setOptionDate({
            startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            endDate: new Date(),
        });
    }, [tabId]);

    return {
        controlTab: (
            <Tab
                className={style.tab}
                value={tabId}
                label={
                    <>
                        {t('achievementDetails.title')}
                        <ParameterDetail className={style.searchIcon} />
                    </>
                }
            />
        ),
        controlBar: (
            <SearchMenuBar>
                <DetailAchievements dataSelected={dataSelect} dataParameter={detailAchievementsTabParams} />
                <DateRangePicker
                    value={[optionDate.startDate, optionDate.endDate]}
                    onChange={({ startDate, endDate }) => {
                        setOptionDate({
                            startDate,
                            endDate,
                        });
                        dataSelect(dataSelected, startDate, endDate);
                    }}
                />
            </SearchMenuBar>
        ),
        content: showChart && (
            <DetailParameter handleReloadDetail={(e: boolean) => handleReloadDetail(e)} data={dataChart} />
        ),
    };
};

export default useDetailAchievements;
