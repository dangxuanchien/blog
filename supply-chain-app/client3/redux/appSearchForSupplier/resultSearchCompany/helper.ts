import { TypeSearch } from '@/utils/enum';

export const getTypeSearch = (itemName: string[], itemCategory: string[], itemCategoryGroup: string[]) => {
    let typeSearch: TypeSearch;
    switch (true) {
        case itemCategoryGroup?.length > 0 && itemCategory?.length > 0 && itemName.length > 0:
            typeSearch = TypeSearch.ITEM_NAME;
            break;
        case itemCategoryGroup?.length > 0 && itemCategory?.length > 0:
            typeSearch = TypeSearch.CATEGORY;
            break;
        case itemCategoryGroup?.length > 0:
            typeSearch = TypeSearch.GROUP;
            break;
        default:
            break;
    }
    return typeSearch;
};
