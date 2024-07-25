import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, compose } from 'redux';
import searchForSupplierReducer from './searchForSupplier/ResultSearchCompany/reducer';
import detailCompanyReducer from './searchForSupplier/detailCompany/reducer';

import filterSearchForSupplierReducer from './filterSearchForSupplier/reducer';
import settingConditionSearchReducer from './searchForSupplier/settingConditionSearch/reducer';
import loginReducer from './login/reducer';
import companySearchConditionDetailsReducer from './companySearchConditionDetails/reducer';
import stateButtonReducer from './button/reducer';
import { detailAchievementsReducer } from './searchForSupplier/detailAchievements/reducer';
import { resultSearchCompanyReducer } from './appSearchForSupplier/ResultSearchCompany/reducer';
import conditionSearchCompanyReducer from './appSearchForSupplier/conditionSearchCompany/reducer';
import { appDetailAchievementsReducer } from './appSearchForSupplier/detailAchievement/reducer';
import { authReducer } from './auth/reducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    searchForSupplierReducer,
    detailCompanyReducer,
    loginReducer,
    filterSearchForSupplierReducer,
    companySearchConditionDetailsReducer,
    stateButtonReducer,
    settingConditionSearchReducer,
    conditionSearchCompanyReducer,
    detailAchievementsReducer,
    authReducer,
    // New way to define redux
    resultSearchCompany: resultSearchCompanyReducer,
    appDetailAchievementsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({ reducer: rootReducer, devTools: process.env.NODE_ENV !== 'production' });

export default store;
