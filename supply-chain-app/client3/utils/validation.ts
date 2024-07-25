import isRegExp from 'lodash/isRegExp';

export class Validation {
    static validateRequire(value?: any): boolean {
        return value !== undefined && value !== null;
    }

    static validateRegex(value: string, regex: RegExp): boolean {
        return isRegExp(regex) && regex.test(value);
    }
}
