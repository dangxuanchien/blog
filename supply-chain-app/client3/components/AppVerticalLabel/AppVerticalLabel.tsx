import { Box } from '@material-ui/core';
import React, { FC, HTMLAttributes } from 'react';
import { useAppVerticalLabelStyle } from './AppVerticalLabel.style';
interface AppVerticalLabelProps extends HTMLAttributes<HTMLDivElement> {
    textValue: string;
}
const AppVerticalLabel: FC<AppVerticalLabelProps> = (props) => {
    const style = useAppVerticalLabelStyle();
    const { textValue, ...rest } = props;
    return (
        <Box className={style.verticalLabel} {...rest}>
            <p>{textValue}</p>
        </Box>
    );
};
export default AppVerticalLabel;
