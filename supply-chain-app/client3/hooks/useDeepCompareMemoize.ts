import _isEqual from 'lodash/isEqual';
import { useRef } from 'react';

const useDeepCompareMemoize = <T>(value: T):T => {
    const ref = useRef<T>(value);
    if (!_isEqual(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
};

export default useDeepCompareMemoize;
