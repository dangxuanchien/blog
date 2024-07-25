import { Option } from '@/types';

export const getValuesFromOptions = (options: Option[]) => {
    return options.map((option) => option.value);
};
