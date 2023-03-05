import {combineReducers, configureStore} from '@reduxjs/toolkit';
import gameReducer from './reducers/GameReducer/GameSlice';
import fieldReducer from './reducers/FieldReducer/FieldSlice';

const rootReducer = combineReducers({
    game: gameReducer,
    field: fieldReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
