import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';
import { classroomReducer } from './Classroom/reducer';

export const rootReducer = combineReducers({
    localize: localizeReducer,
    classroom: classroomReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
