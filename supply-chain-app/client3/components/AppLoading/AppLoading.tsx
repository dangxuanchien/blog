import Backdrop from '@material-ui/core/Backdrop';
import { useLoadingStyle } from './AppLoading.style';
export type LoadingProps = {
    open: boolean;
};
const AppLoading = ({ open }: LoadingProps) => {
    const classes = useLoadingStyle();
    return (
        <>
            <Backdrop style={{ zIndex: 100000, backgroundColor: 'rgb(0, 0, 0, 0.7)' }} open={open}>
                {open ? (
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
                ) : null}
            </Backdrop>
        </>
    );
};

export default AppLoading;
