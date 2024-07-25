import { FunctionComponent, memo } from 'react';
import _isEqual from 'lodash/isEqual';
type propsAreEqual<P> = (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean;

const deepPropsAreEqual: propsAreEqual<any> = (prevProps, nextProps) => {
    return _isEqual(prevProps, nextProps);
};
const appMemo = <P extends object>(Component: FunctionComponent<P>, propsAreEqual?: propsAreEqual<P>) => {
    if (propsAreEqual === undefined) {
        propsAreEqual = deepPropsAreEqual;
    }
    return memo(Component, propsAreEqual);
};

export default appMemo;
