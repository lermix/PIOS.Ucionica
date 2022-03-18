import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';

export const rootReducer = combineReducers({
    localize: localizeReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
