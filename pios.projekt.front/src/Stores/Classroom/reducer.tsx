import { IActionType, IClassroomState } from './interfaces';
import * as actionTypes from './actionTypes';

const initialState: IClassroomState = {
    students: [],
    classrooms: [],
    subjects: [],
    teachers: [],
    timetableRows: [],
};

// REDUCER
export function classroomReducer(state: IClassroomState = initialState, action: IActionType): IClassroomState {
    const tempStudents = state.students;
    const tempSubjects = state.subjects;
    const tempTeachers = state.teachers;
    const tempClassrooms = state.classrooms;
    switch (action.type) {
        case actionTypes.GET_STUDENTS:
            return {
                ...state,
                students: action.students,
            };

        case actionTypes.GET_TEACHERS:
            return {
                ...state,
                teachers: action.teachers,
            };

        case actionTypes.GET_SUBJECTS:
            return {
                ...state,
                subjects: action.subjects,
            };

        case actionTypes.GET_CLASSROOMS:
            return {
                ...state,
                classrooms: action.classrooms,
            };

        case actionTypes.ADD_OR_UPDATE_STUDENT:
            if (state.students.find((e) => e.id == action.student.id)) {
                tempStudents.forEach((e) => {
                    if (e.id === action.student.id) e = action.student;
                });
                return {
                    ...state,
                    students: tempStudents,
                };
            } else
                return {
                    ...state,
                    students: [...tempStudents, action.student],
                };
        case actionTypes.ADD_OR_UPDATE_SUBJECT:
            if (state.subjects.find((e) => e.id == action.subject.id)) {
                tempSubjects.forEach((e) => {
                    if (e.id === action.subject.id) e = action.subject;
                });
                return {
                    ...state,
                    subjects: tempSubjects,
                };
            } else
                return {
                    ...state,
                    subjects: [...tempSubjects, action.subject],
                };
        case actionTypes.ADD_OR_UPDATE_TEACHER:
            if (state.teachers.find((e) => e.id == action.teacher.id)) {
                tempTeachers.forEach((e) => {
                    if (e.id === action.teacher.id) e = action.teacher;
                });
                return {
                    ...state,
                    teachers: tempTeachers,
                };
            } else
                return {
                    ...state,
                    teachers: [...tempTeachers, action.teacher],
                };
        case actionTypes.ADD_OR_UPDTAE_CLASSROOM:
            if (state.classrooms.find((e) => e.id == action.classroom.id)) {
                tempClassrooms.forEach((e) => {
                    if (e.id === action.classroom.id) e = action.classroom;
                });
                return {
                    ...state,
                    classrooms: tempClassrooms,
                };
            } else
                return {
                    ...state,
                    classrooms: [...tempClassrooms, action.classroom],
                };
        case actionTypes.ADD_TIMETABLE_ROW:
            return {
                ...state,
                timetableRows: [...state.timetableRows, action.timetableRow],
            };
        case actionTypes.DELETE_TIMETABLE_ROW:
            return {
                ...state,
                timetableRows: state.timetableRows.filter((e) => e.id !== action.timetableRow.id),
            };

        default:
            return state;
    }
}
