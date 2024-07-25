import { BusinessOption } from './types';

export const getValuesCheckedFromBusinessOptions = (businessOptions: BusinessOption[]): string[] => {
    return businessOptions.reduce((acc, item) => {
        if (item.checked) {
            return [...acc, item.value];
        }
        return acc;
    }, [] as string[]);
};
