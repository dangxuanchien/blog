import { useAuthentication } from 'hooks/useAuthencation';

//TODO: Refactor when integrate api session
const ProtectedRouter = (props): JSX.Element => {
    const user = useAuthentication();

    if (!user?.token) {
        return <></>;
    }
    return <div>{props.children}</div>;
};
export default ProtectedRouter;
