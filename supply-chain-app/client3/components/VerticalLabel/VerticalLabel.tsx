import React, { FC } from 'react';
import classes from './VerticalLabel.module.scss';

/**
 * The Props Interface
 */
interface VerticalLabelProps {
    /** Text value of label */
    textValue: string;
    /** styles of label */
    styles: React.CSSProperties;
}

/**
 * The Vertical Label component
 *
 * @returns Details Of Vertical Label component
 */
const VerticalLabel: FC<VerticalLabelProps> = (props) => {
    return (
        <div className={classes.verticalLabel} style={props.styles}>
            <p>{props.textValue}</p>
        </div>
    );
};
export default VerticalLabel;
