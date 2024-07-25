import { useAuthentication } from 'hooks/useAuthencation';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

//TODO: Refactor when integrate api session
const PublicPageRouter = (props): JSX.Element => {
    const router = useRouter();
    const user = useAuthentication();
    useEffect(() => {
        if (user?.token && router?.pathname === '/login') {
            Router.push('/searchforsupplier');
        }
    }, [user?.token]);
    if (user?.token && router?.pathname === '/login') {
        return <></>;
    }
    return <div>{props.children}</div>;
};
export default PublicPageRouter;
