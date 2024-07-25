import { TextField as MaterialInput } from '@material-ui/core';

type Props = {
    onChange: () => void;
    value?: string | number;
    label: string;

    labelProps?: { [index: string]: string };
    divProps?: { [index: string]: string };


    [index: string]: any;
};

const Input = (props: Props) => {
    const { onChange, value, label, labelProps = {}, divProps, ...rest } = props;
    return (
        <div {...divProps}>
            <label {...labelProps}>{label}</label>
            <MaterialInput value={value ?? ''} variant="outlined" onChange={onChange} {...rest} />
        </div>
    );
};

export default Input;
