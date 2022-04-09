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
import { TimetableRow } from '../../Models/TimetableRow';

const apiActions = {
    GetStudents: (): Promise<Student[]> => requests.get('Classroom/GetStudents'),
    GetSubjects: (): Promise<Subject[]> => requests.get('Classroom/GetSubjects'),
    GetTeachers: (): Promise<Teacher[]> => requests.get('Classroom/GetTeachers'),
    GetClassrooms: (): Promise<SchoolClass[]> => requests.get('Classroom/GetSchoolClasses'),

    AddOrUpdateStudent: (student: Student): Promise<Student> => requests.post('Classroom/AddStudent', student),
    AddOrUpdateSubject: (subject: Subject): Promise<Subject> => requests.post('Classroom/AddSubject', subject),
    AddOrUpdateTeacher: (teacher: Teacher): Promise<Teacher> => requests.post('Classroom/AddTeacher', teacher),
    AddOrUpdateClassroom: (classroom: SchoolClass): Promise<SchoolClass> => requests.post('Classroom/AddClass', classroom),

    DeleteStudent: (studentId: number): Promise<number> => requests.post(`Classroom/DeleteStudent?studentId=${studentId}`, {}),
    DeleteSubject: (subjectId: number): Promise<number> => requests.post(`Classroom/DeleteSubject?subjectId=${subjectId}`, {}),
    DeleteTeacher: (teacherId: number): Promise<number> => requests.post(`Classroom/DeleteTeacher?teacherId=${teacherId}`, {}),
    DeleteClassroom: (classroomId: number): Promise<number> => requests.post(`Classroom/DeleteClassroom?classroomId=${classroomId}`, {}),

    AddTimetableRow: (timetableRow: TimetableRow): Promise<TimetableRow> => requests.post('Classroom/AddTimetableRow', timetableRow),
    DeleteTimetableRow: (timetableRow: TimetableRow): Promise<TimetableRow> => requests.post('Classroom/DeleteTimetableRow', timetableRow),
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
            const added = await apiActions.AddOrUpdateClassroom(classroom);
            console.log(added);
            dispatch(addOrUpdateClassrooomSuccess(added));
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

export const addTimetableRow =
    (timetableRow: TimetableRow): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const addTimetableRowSuccess = (timetableRow: TimetableRow): IActionType => {
            return {
                type: actionTypes.ADD_TIMETABLE_ROW,
                timetableRow: timetableRow,
            };
        };

        try {
            dispatch(addTimetableRowSuccess(await apiActions.AddTimetableRow(timetableRow)));
        } catch (error) {
            console.log(error);
        }
    };

export const deleteTimetableRow =
    (timetableRow: TimetableRow): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const deleteTimetableRowSuccess = (timetableRow: TimetableRow): IActionType => {
            return {
                type: actionTypes.DELETE_TIMETABLE_ROW,
                timetableRow: timetableRow,
            };
        };

        try {
            dispatch(deleteTimetableRowSuccess(await apiActions.DeleteTimetableRow(timetableRow)));
        } catch (error) {
            console.log(error);
        }
    };

export const DeleteStudent =
    (studentId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const deletetudentSuccess = (studentId: number): IActionType => {
            return {
                type: actionTypes.DELETE_STUDENT,
                studentId: studentId,
            };
        };

        try {
            console.log('Here');
            await apiActions.DeleteStudent(studentId).then((deletedCount) => deletedCount > 0 && dispatch(deletetudentSuccess(studentId)));
        } catch (error) {
            console.log(error);
        }
    };

export const DeleteTeacher =
    (teacherId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const deleteTeacherSuccess = (teacherId: number): IActionType => {
            return {
                type: actionTypes.DELETE_TEAHCER,
                teacherId: teacherId,
            };
        };

        try {
            console.log(teacherId);
            await apiActions.DeleteTeacher(teacherId).then((deletedCount) => deletedCount > 0 && dispatch(deleteTeacherSuccess(teacherId)));
        } catch (error) {
            console.log(error);
        }
    };

export const DeleteSubject =
    (subjectId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const deleteSubjectSuccess = (subjectId: number): IActionType => {
            return {
                type: actionTypes.DELETE_SUBJECT,
                subjectId: subjectId,
            };
        };

        try {
            await apiActions.DeleteSubject(subjectId).then((deletedCount) => deletedCount > 0 && dispatch(deleteSubjectSuccess(subjectId)));
        } catch (error) {
            console.log(error);
        }
    };

export const DeleteClass =
    (classId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        const deleteClassSuccess = (classId: number): IActionType => {
            return {
                type: actionTypes.DELETE_CLASSROOM,
                classroomID: classId,
            };
        };

        try {
            await apiActions.DeleteClassroom(classId).then((deletedCount) => deletedCount > 0 && dispatch(deleteClassSuccess(classId)));
        } catch (error) {
            console.log(error);
        }
    };
