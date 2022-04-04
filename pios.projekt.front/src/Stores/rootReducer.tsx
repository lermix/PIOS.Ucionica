import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';
import { classroomReducer } from './Classroom/reducer';
import { securityReducer } from './Security/reducer';

export const rootReducer = combineReducers({
    localize: localizeReducer,
    classroom: classroomReducer,
    security: securityReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
