import SearchForSupplier from 'containers/SearchForSupplier/SearchForSupplier';
import { SearchForSupplierTabProvider } from '@/containers/SearchForSupplier/SearchForSupplierTabContext';
import React from 'react';

/**
 * The component
 * @returns Component
 * @author Minh Huynh <minh.huynh@hitachi.com>
 */
export function index(): JSX.Element {
    return (
        <SearchForSupplierTabProvider>
            <SearchForSupplier />
        </SearchForSupplierTabProvider>
    );
}

export default index;
