import moment from 'moment';
import { IComboBoxItem } from '../components/Inputs/ComboBox/ComboBox';

/**
 * Convert string number to float, if stringNum is NaN return null
 * @param stringNum
 * @returns number | null
 */
export const convertStringToFloat = (stringNum: string): number | null => {
    if (stringNum === undefined || stringNum.trim() === '') return null;
    return parseFloat(stringNum);
};

/**
 * Add days to the date
 * @param date
 * @param numberDayAdded
 * @returns new date
 */
export const addDaysToDate = (date: Date, numberDayAdded: number): Date => {
    return new Date(date.getTime() + 3600 * 1000 * 24 * numberDayAdded);
};

/**
 * Convert combobox csv object to combobox object
 * @param data combobox csv data
 * @returns IComboBoxItem[]
 */
export const convertCsvToComboBoxItem = (data: any[]): IComboBoxItem[] => {
    if (data === undefined || data.length === 0) return [];
    return data.map((item) => ({
        text: item[1],
        value: item[2],
    }));
};

/**
 * Get default value for combobox
 * @param data data of a record combobox csv
 * @returns if data is exist: return string of data
 *                      else: return null
 */
export const getComboBoxDefaultValue = (data: any[]) => {
    const defaultItem = data.find((item) => item[4] === 'true');
    if (defaultItem) {
        return defaultItem[2];
    }
    return null;
};

/**
 * Get data for combobox by combobox name
 * @param comboBoxCsv
 * @param comboBoxName
 * @returns Array of combobox data
 */
export const getListComboBoxItemByName = (comboBoxCsv: object[], comboBoxName: string) => {
    return comboBoxCsv.filter((item) => item[0] === comboBoxName);
};

/**
 * Get monday date of the week by date
 * @param date
 * @returns monday date of the week by date
 */
export const getMondayOfWeekByDate = (date: Date): Date => {
    const diffDayOfDateAndMonday = date.getDay() === 0 ? date.getDate() - 6 : date.getDate() - date.getDay() + 1;
    const mondayDate = new Date(date.getTime());
    mondayDate.setDate(diffDayOfDateAndMonday);
    return mondayDate;
};

/**
 * Get week label of the month,
 * format: [month]月[monday date]日週([monday month]/[monday date]-[lastDateOfWeek month]/[lastDateOfWeek date])
 * example: 4月4日週(4/4-4/10)
 * @param date
 * @returns string
 */
export const weekLabelOfTheMonth = (date: Date) => {
    const mondayDate = getMondayOfWeekByDate(date);
    return `${mondayDate.getMonth() + 1}月${mondayDate.getDate()}日週`;
};

/**
 * Create time label by weekly
 * @param periodFrom Date
 * @param periodTo Date
 * @returns string[]
 */
export const createTimeLabelByWeekly = (periodFrom: Date, periodTo: Date): string[] => {
    const result = new Array<string>();
    let mondayDate = getMondayOfWeekByDate(periodFrom);

    if (mondayDate.getMonth() < periodFrom.getMonth() || mondayDate.getFullYear() < periodFrom.getFullYear()) {
        mondayDate = addDaysToDate(mondayDate, 7);
    }

    do {
        result.push(weekLabelOfTheMonth(mondayDate));
        // Create next week label
        mondayDate = addDaysToDate(mondayDate, 7);
    } while (mondayDate <= periodTo);
    return result;
};

/**
 * Convert string to date
 * @param stringDate string date
 * @param format: format of string date, default is 'YYYYMMDD'
 * @returns date
 */
export const convertStringToDate = (stringDate: string, format: string = 'YYYYMMDD'): Date => {
    return moment(stringDate, format).toDate();
};

/**
 * Group data by weekly
 * @param csvData csv data
 * @param timeByWeekly week labels
 * @param caculateItemIndex the index of the field will be calculated in the csv . file
 */
export const groupDataByWeekly = (csvData: object[], timeByWeekly: string[], caculateItemIndex: number) => {
    const dataGroup = {};
    if (csvData.length === 0) return dataGroup;

    timeByWeekly.forEach((value) => {
        dataGroup[value] = 0;
    });

    csvData.forEach((row) => {
        const weekLabelOfRow = weekLabelOfTheMonth(convertStringToDate(row[0]));
        dataGroup[weekLabelOfRow] = dataGroup[weekLabelOfRow] + convertStringToFloat(row[caculateItemIndex]);
    });
    return dataGroup;
};
