import * as actionTypes from './actionTypes';
import { IActionType } from './interfaces';
import { AppState } from '../rootReducer';
import { requests } from '../agent';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Student } from '../../Models/Student';
import { Subject } from '../../Models/Subject';
import { Teacher } from '../../Models/Teacher';
import { SchoolClass } from '../../Models/SchoolClass';

const apiActions = {
    GetStudents: (): Promise<Student[]> => requests.get('Classroom/GetStudents'),
    GetSubjects: (): Promise<Subject[]> => requests.get('Classroom/GetSubjects'),
    GetTeachers: (): Promise<Teacher[]> => requests.get('Classroom/GetTeachers'),
    GetClassrooms: (): Promise<SchoolClass[]> => requests.get('Classroom/GetSchoolClasses'),
    AddOrUpdateStudent: (student: Student): Promise<Student> => requests.post('Classroom/AddStudent', student),
    AddOrUpdateSubject: (subject: Subject): Promise<Subject> => requests.post('Classroom/AddSubject', subject),
    AddOrUpdateTeacher: (teacher: Teacher): Promise<Teacher> => requests.post('Classroom/AddTeacher', teacher),
    AddOrUpdateClassroom: (classroom: SchoolClass): Promise<SchoolClass> => requests.post('Classroom/AddClass', classroom),
};

export const getStudents = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch) => {
    const getStudentsSuccess = (students: Student[]): IActionType => {
        return {
            type: actionTypes.GET_STUDENTS,
            students: students,
        };
    };

    try {
        dispatch(getStudentsSuccess(await apiActions.GetStudents()));
    } catch (error) {
        console.log(error);
    }
};

export const getSubject = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch) => {
    const getSubjectsSuccess = (subjects: Subject[]): IActionType => {
        return {
            type: actionTypes.GET_SUBJECTS,
            subjects: subjects,
        };
    };

    try {
        dispatch(getSubjectsSuccess(await apiActions.GetSubjects()));
    } catch (error) {
        console.log(error);
    }
};

export const GetTeachers = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch) => {
    const GetTeachersSuccess = (teachers: Teacher[]): IActionType => {
        return {
            type: actionTypes.GET_TEACHERS,
            teachers: teachers,
        };
    };

    try {
        dispatch(GetTeachersSuccess(await apiActions.GetTeachers()));
    } catch (error) {
        console.log(error);
    }
};

export const getClassrooms = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch) => {
    const getClassroomsSuccess = (classrooms: SchoolClass[]): IActionType => {
        return {
            type: actionTypes.GET_CLASSROOMS,
            classrooms: classrooms,
        };
    };

    try {
        dispatch(getClassroomsSuccess(await apiActions.GetClassrooms()));
    } catch (error) {
        console.log(error);
    }
};

export const addOrUpdateStudent =
    (student: Student): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const addOrUpdateStudentSuccess = (student: Student): IActionType => {
            return {
                type: actionTypes.ADD_OR_UPDATE_STUDENT,
                student: student,
            };
        };

        try {
            dispatch(addOrUpdateStudentSuccess(await apiActions.AddOrUpdateStudent(student)));
        } catch (error) {
            console.log(error);
        }
    };

export const addOrUpdateSubject =
    (subject: Subject): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const addOrUpdateSubjectSuccess = (subject: Subject): IActionType => {
            return {
                type: actionTypes.ADD_OR_UPDATE_SUBJECT,
                subject: subject,
            };
        };

        try {
            dispatch(addOrUpdateSubjectSuccess(await apiActions.AddOrUpdateSubject(subject)));
        } catch (error) {
            console.log(error);
        }
    };

export const addOrUpdateClassroom =
    (classroom: SchoolClass): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const addOrUpdateClassrooomSuccess = (classroom: SchoolClass): IActionType => {
            return {
                type: actionTypes.ADD_OR_UPDTAE_CLASSROOM,
                classroom: classroom,
            };
        };

        try {
            dispatch(addOrUpdateClassrooomSuccess(await apiActions.AddOrUpdateClassroom(classroom)));
        } catch (error) {
            console.log(error);
        }
    };

export const addOrUpdateTeacher =
    (teacher: Teacher): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const addOrUpdateTeacherSuccess = (teacher: Teacher): IActionType => {
            return {
                type: actionTypes.ADD_OR_UPDATE_TEACHER,
                teacher: teacher,
            };
        };

        try {
            dispatch(addOrUpdateTeacherSuccess(await apiActions.AddOrUpdateTeacher(teacher)));
        } catch (error) {
            console.log(error);
        }
    };
