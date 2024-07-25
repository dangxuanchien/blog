import { DependencyList, useMemo } from 'react';
import useDeepCompareMemoize from './useDeepCompareMemoize';

const useDeepMemo = <T>(callback: () => T, dependencies: DependencyList) => {
    return useMemo<T>(callback, useDeepCompareMemoize(dependencies));
};

export default useDeepMemo;
