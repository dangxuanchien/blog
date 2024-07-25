import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
export function useLoadingStyle(): ClassNameMap {
    const useStyles = makeStyles(() =>
        createStyles({
            spinner: {
                width: '80px',
                height: '80px',
                position: 'relative',
                '& > div': {
                    width: ' 100%',
                    height: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: '0',
                    animation: '$loading 1200ms linear infinite',
                 
                },
                '& > div::after': {
                    content: '""',
                    width: '8px',
                    height: ' 24px',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                },
                '& > div:nth-child(1)': {
                    transform: 'rotate(30deg)',
                    animationDelay: '200ms',
                },
                '& > div:nth-child(2)': {
                    transform: 'rotate(60deg)',
                    animationDelay: '300ms',
                },
                '& > div:nth-child(3)': {
                    transform: 'rotate(90deg)',
                    animationDelay: '400ms',
                },
                '& > div:nth-child(4)': {
                    transform: 'rotate(120deg)',
                    animationDelay: '500ms',
                },
                '& >  div:nth-child(5)': {
                    transform: 'rotate(150deg)',
                    animationDelay: '600ms',
                },
                '& > div:nth-child(6)': {
                    transform: 'rotate(180deg)',
                    animationDelay: '700ms',
                },
                '& > div:nth-child(7) ': {
                    transform: 'rotate(210deg)',
                    animationDelay: '800ms',
                },
                '& > div:nth-child(8)': {
                    transform: 'rotate(240deg)',
                    animationDelay: '900ms',
                },
                '& > div:nth-child(9)': {
                    transform: 'rotate(270deg)',
                    animationDelay: '1000ms',
                },
                '& > div:nth-child(10)': {
                    transform: 'rotate(300deg)',
                    animationDelay: '1000ms',
                },
                '& > div:nth-child(11)': {
                    transform: 'rotate(330deg)',
                    animationDelay: '1100ms',
                },
               
            },
            '@keyframes loading': {
                '0%': {
                    opacity: 1,
                },
                '8.3%': {
                    opacity: 0.7,
                },
                '100%': {
                    opacity: 0.1,
                },
            },
        })
    );
    return useStyles();
}
