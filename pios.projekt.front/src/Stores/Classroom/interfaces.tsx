import { SchoolClass } from '../../Models/SchoolClass';
import { Student } from '../../Models/Student';
import { Subject } from '../../Models/Subject';
import { Teacher } from '../../Models/Teacher';
import { TimetableRow } from '../../Models/TimetableRow';
import * as actionTypes from './actionTypes';

// STATE
export interface IClassroomState {
    students: Student[];
    subjects: Subject[];
    teachers: Teacher[];
    classrooms: SchoolClass[];
    timetableRows: TimetableRow[];
}

// ACTIONS
interface IGetStudents {
    type: typeof actionTypes.GET_STUDENTS;
    students: Student[];
}

interface IGetSubjects {
    type: typeof actionTypes.GET_SUBJECTS;
    subjects: Subject[];
}

interface IGetTeachers {
    type: typeof actionTypes.GET_TEACHERS;
    teachers: Teacher[];
}

interface IGetClassrooms {
    type: typeof actionTypes.GET_CLASSROOMS;
    classrooms: SchoolClass[];
}

interface IAddOrUpdateStudent {
    type: typeof actionTypes.ADD_OR_UPDATE_STUDENT;
    student: Student;
}
interface IAddOrUpdateSubject {
    type: typeof actionTypes.ADD_OR_UPDATE_SUBJECT;
    subject: Subject;
}

interface IAddOrUpdateTeacher {
    type: typeof actionTypes.ADD_OR_UPDATE_TEACHER;
    teacher: Teacher;
}

interface IAddOrUpdateClassroom {
    type: typeof actionTypes.ADD_OR_UPDTAE_CLASSROOM;
    classroom: SchoolClass;
}

interface IAddTimetableRow {
    type: typeof actionTypes.ADD_TIMETABLE_ROW;
    timetableRow: TimetableRow;
}

interface IDeleteTimetableRow {
    type: typeof actionTypes.DELETE_TIMETABLE_ROW;
    timetableRow: TimetableRow;
}

export type IActionType =
    | IGetStudents
    | IAddOrUpdateStudent
    | IAddOrUpdateSubject
    | IAddOrUpdateTeacher
    | IAddOrUpdateClassroom
    | IGetClassrooms
    | IGetSubjects
    | IGetTeachers
    | IAddTimetableRow
    | IDeleteTimetableRow;
