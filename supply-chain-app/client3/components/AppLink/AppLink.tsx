import { ListItem, Box, ListItemProps } from '@material-ui/core';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import { useAppLinkStyle } from './AppLink.style';
interface AppLinkProps extends ListItemProps {
    /** The url */
    url?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}
/**
 * The Custom Link component atom
 *
 * @component
 * @param {AppLinkProps} props Props of component
 * @returns Link
 */
export const AppLink: FC<AppLinkProps> = (props) => {
    const { url, children, style } = props;
    const router = useRouter();
    const styleClass = useAppLinkStyle();
    return (
        <Box
            className={clsx(styleClass.customLinkContainer, {
                [styleClass.active]: router.pathname === url,
            })}
        >
            <Link href={url || '/#'} as={url || '/#'}>
                <ListItem button className={styleClass.customLink} style={style}>
                    {children}
                </ListItem>
            </Link>
        </Box>
    );
};
