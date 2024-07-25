import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import _isEqual from 'lodash/isEqual';

export function useDeepEffect(effectFunc: EffectCallback, deps: DependencyList) {
    // 1° Step
    const isFirst = useRef(true);
    const prevDeps = useRef(deps);

    useEffect(() => {
        // 2° Step
        const isSame = prevDeps.current.every((obj, index) => _isEqual(obj, deps[index]));

        // 3° Step
        if (isFirst.current || !isSame) {
            effectFunc();
        }
        // 4° Step
        isFirst.current = false;
        prevDeps.current = deps;
    }, deps);
}
