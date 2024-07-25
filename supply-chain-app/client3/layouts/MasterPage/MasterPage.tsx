import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import HeaderNew from './Header/Header';
import LeftMenuNew from './LeftMenu/LeftMenu';
import { useMasterPageStyle } from './MasterPage.style';
/**
 * The Master Page component
 * @param props
 * @returns MasterPageTemplate
 */

//TODO: Rename => MainLayout
const MasterPageNew: FC<{ children: React.ReactNode }> = (props) => {
    const style = useMasterPageStyle();
    return (
        <Box className={style.masterPageNew}>
            <HeaderNew />
            <Box className={style.content}>
                <Box className={style.left}>
                    <LeftMenuNew />
                </Box>
                <Box className={style.right}>{props.children}</Box>
            </Box>
        </Box>
    );
};

export default MasterPageNew;
