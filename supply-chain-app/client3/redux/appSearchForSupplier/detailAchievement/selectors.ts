import { RootState } from '@/redux/store';

const selectOptionDateParameter = (state: RootState) => state.appDetailAchievementsReducer.optionsDate;
const selectDetailAchievementTabParams = (state: RootState) =>
    state.appDetailAchievementsReducer.detailAchievementsTabParams;

export { selectOptionDateParameter, selectDetailAchievementTabParams };
