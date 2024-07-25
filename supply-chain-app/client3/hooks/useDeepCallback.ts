import { DependencyList, useCallback } from 'react';
import useDeepCompareMemoize from './useDeepCompareMemoize';

const useDeepCallback = <T extends Function>(callback: T, dependencies: DependencyList) => {
    return useCallback<T>(callback, useDeepCompareMemoize(dependencies));
};

export default useDeepCallback;
