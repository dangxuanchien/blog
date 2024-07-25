/* eslint-disable @typescript-eslint/ban-types */
import { ListItemText, Theme, makeStyles } from '@material-ui/core';
import { clsx } from 'clsx';
import { FC } from 'react';
import classes from './CustomListItem.module.scss';
interface CustomListItemTextProps {
    /** Title of List Item */
    title: string;
    style?: Object;
}
const useStyle = makeStyles((theme: Theme) => ({
    customText: {
        '& span': {
            color: theme.palette.text.primary,
        },
    },
}));
/**
 * The Page Transition Menu
 *
 * @returns CustomListItem
 */
const CustomListItem: FC<CustomListItemTextProps> = (props) => {
    const style = useStyle();
    return (
        <ListItemText
            className={clsx(classes.customListItemText, style.customText)}
            primary={props.title}
            style={props.style}
        />
    );
};

export default CustomListItem;
