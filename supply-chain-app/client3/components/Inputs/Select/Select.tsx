import { Select as MaterialSelect } from '@material-ui/core';
import { ReactElement } from 'react';

type Props = {
    options: { text: string | number; value: string | number }[];
    onChange: () => void;
    value: string | number;
    label: string;
    divClass?: string;
    IconComponent?: (..._: any[]) => ReactElement;
    labelProps?: { [index: string]: string };
    [index: string]: any;
    divStyle: any;
};

const Select = (props: Props) => {
    const { onChange, divClass, divStyle, IconComponent, value, label, labelProps = {}, options, ...rest } = props;
    return (
        <div className={divClass} style={{ ...divStyle }}>
            <label {...labelProps}>{label}</label>
            <MaterialSelect style={{}} native value={value} onChange={onChange} IconComponent={IconComponent} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </MaterialSelect>
        </div>
    );
};

export default Select;
