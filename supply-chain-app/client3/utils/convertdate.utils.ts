import { format } from 'date-fns';

/**
 * Convert  date
 * @param dateString
 * @returns new date
 */
export const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year}.${month}.${day}`;
};

export class DateUtils {
    static dateLib = new Date();
    static formatDate = 'yyyy/MM/dd';

    /**
     * It converts a date to a string with dots instead of slashes
     * @param {Date | string} date - Date | string - The date to be formatted.
     * @description  params date string must be from  'yyyy/MM/dd'
     * @example date = 2022/10/10
     * @returns A string
     */

    static toDotString = (date: Date | string) => {
        const data = format(new Date(date), this.formatDate);
        return String(data).replaceAll('/', '.');
    };
}
