import classes from './Loading.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import { usePromiseTracker } from 'react-promise-tracker';
export type LoadingProps = {
    open?: boolean;
};

const Loading = ({ open }: LoadingProps) => {
    const { promiseInProgress } = usePromiseTracker();
    const visibleLoading = open || promiseInProgress;
    return (
        <>
            {visibleLoading && (
                <Backdrop style={{ zIndex: 10000, backgroundColor: 'rgb(0, 0, 0, 0.7)' }} open>
                    <div className={classes.spinner}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Backdrop>
            )}
        </>
    );
};

export default Loading;
