/* eslint-disable @typescript-eslint/ban-types */
import { ListItem, makeStyles, Box, createStyles, Theme } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
// import { setMenuType } from '../../redux/common/actions';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import { ThemContext } from 'context/ThemeContext';

/**
 * The Interface Props
 * @author Tung Pham Nhat <tung.pham@hitachivantara.com>
 */
interface CustomLinkProps {
    /** The url */
    url?: string;
    children: React.ReactNode;
    style?: Object;
    menuType?: number;
}

/**
 * The Custom Link component atom
 *
 * @component
 * @param {CustomLinkProps} props Props of component
 * @returns Link
 * @author Tung Pham Nhat <tung.pham@hitachivantara.com>
 */
export const CustomLinkNew: FC<CustomLinkProps> = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { getMode } = useContext(ThemContext);
    const useStyle = makeStyles((theme: Theme) =>
        createStyles({
            customLink: {
                '&.MuiListItem-root': {
                    height: '80px',
                    padding: '2px 0px',
                    border: `1px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.primary.light,
                    opacity: getMode === 'light' ? 1 : 0.4,
                    flexDirection: 'column',
                    justifyContent: 'center',
                },
            },
            customLinkContainer: {
                margin: '6px',
            },
            active: {
                borderLeft: `5px solid ${theme.palette.text.primary}`,
                backgroundColor: theme.palette.primary.light,
                '& .MuiListItem-root': {
                    opacity: 1,
                },
            },
        })
    );
    const style = useStyle();

    const handleClick = (e, menuType) => {
        if (menuType) {
            // dispatch(setMenuType(menuType));
        }
    };
    return (
        <Box
            className={clsx(style.customLinkContainer, {
                [style.active]: router.pathname === props.url,
            })}
        >
            <Link href={props.url || '/#'} as={props.url || '/#'}>
                <ListItem
                    button
                    className={style.customLink}
                    onClick={(e) => handleClick(e, props.menuType)}
                    style={props.style}
                >
                    {props.children}
                </ListItem>
            </Link>
        </Box>
    );
};
