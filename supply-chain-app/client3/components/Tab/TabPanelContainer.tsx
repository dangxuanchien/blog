import { Box } from '@material-ui/core';
import React, { FC } from 'react';

interface TabPanelComponentProps {
    tabPanelContent?: React.ReactNode;
    index: number;
    value: number;
}

/**
 * Render to a tab of component
 *
 * @returns CustomListItem
 */
const TabPanel: FC<TabPanelComponentProps> = (props) => {
    return (
        <Box
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
        >
            {props.value === props.index && (
                props.tabPanelContent
            )}
        </Box>
    );
};

export default TabPanel;
