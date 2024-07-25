import { FC, memo } from 'react';
import SearchButton from './SearchButton/SearchButton';
import SearchCondition from './SearchCondition/SearchCondition';
import SearchSlider from './SearchSlider/SearchSlider';

const SearchConditionControlBar: FC = () => {
    return (
        <>
            <SearchButton />
            <SearchCondition />
            <SearchSlider />
        </>
    );
};

export default memo(SearchConditionControlBar);
