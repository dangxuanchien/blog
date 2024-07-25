import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import SliderForSearch from './SliderForSearch/SliderForSearch';

interface SearchSliderProps {
    className?: string;
    handleWeightChange: (value) => void;
    handleSoresChange: (value) => void;
    handleSubmit: (value) => void;
}
const SearchSlider: FC<SearchSliderProps> = (props) => {
    // const { getHidden } = useContext(HiddenContext);
    const { filters, percents } = useSelector((state: any) => state.filterSearchForSupplierReducer);

    return (
        <>
            <SliderForSearch
                {...props}
                handleSoresChange={props.handleSoresChange}
                weightMaster={percents}
                handleWeightChange={props.handleWeightChange}
                handleSubmit={props.handleSubmit}
                valueScores={filters}
            />
        </>
    );
};

export default SearchSlider;
