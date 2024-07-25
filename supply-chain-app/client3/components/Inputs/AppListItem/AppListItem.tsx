import { ListItemText, Theme, makeStyles } from '@material-ui/core';
import { clsx } from 'clsx';
import { FC } from 'react';
interface AppListItemProps {
    /** Title of List Item */
    title: string;
}

const useStyle = makeStyles((theme: Theme) => ({
    customText: {
        '& span': {
            color: theme.palette.text.primary,
        },
    },
    customListItemText: {
        ['& global(.MuiListItemText-root)']: {
            color: '#FFFFFF',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
            margin: 0,
        },
        span: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
        },
    },
}));
const AppListItem: FC<AppListItemProps> = (props) => {
    const styles = useStyle();
    const { title, ...defaultProps } = props;
    return (
        <ListItemText
            className={clsx(styles.customListItemText, styles.customText)}
            primary={title}
            {...defaultProps}
        />
    );
};

export default AppListItem;
