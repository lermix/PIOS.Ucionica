import { Exam } from '../../Models/Exam';
import { ExamResult } from '../../Models/ExamResult';
import { Question } from '../../Models/Question';
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
    exams: Exam[];
    question: Question[];
    examResults: ExamResult[];
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

interface IGetExams {
    type: typeof actionTypes.GET_EXAMS;
    exams: Exam[];
}

interface IGetQuestions {
    type: typeof actionTypes.GET_QUESTIONS;
    questions: Question[];
}

interface IGetExamResult {
    type: typeof actionTypes.GET_EXAM_RESULTS;
    examResults: ExamResult[];
}

interface IAddOrUpdateExam {
    type: typeof actionTypes.ADD_OR_UPDATE_EXAM;
    exam: Exam;
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

interface IAddOrUpdateQuestion {
    type: typeof actionTypes.ADD_OR_UPDTAE_QUESTION;
    question: Question;
}

interface IAddOrUpdateExamResult {
    type: typeof actionTypes.ADD_OR_UPDATE_EXAM_RESULT;
    examResult: ExamResult;
}

interface IDeleteSubject {
    type: typeof actionTypes.DELETE_SUBJECT;
    subjectId: number;
}

interface IDeleteStudent {
    type: typeof actionTypes.DELETE_STUDENT;
    studentId: number;
}

interface IDeleteClassroom {
    type: typeof actionTypes.DELETE_CLASSROOM;
    classroomID: number;
}

interface IDeleteTeacher {
    type: typeof actionTypes.DELETE_TEAHCER;
    teacherId: number;
}

interface IDeleteExam {
    type: typeof actionTypes.DELETE_EXAM;
    examId: number;
}

interface IDeleteQuestion {
    type: typeof actionTypes.DELETE_QUESTION;
    questionId: number;
}

interface IAddTimetableRow {
    type: typeof actionTypes.ADD_TIMETABLE_ROW;
    timetableRow: TimetableRow;
}

interface IDeleteTimetableRow {
    type: typeof actionTypes.DELETE_TIMETABLE_ROW;
    timetableRow: TimetableRow;
}

interface IDeleteExamResult {
    type: typeof actionTypes.DELETE_EXAM_RESULT;
    examResultId: number;
}

export type IActionType =
    | IGetStudents
    | IAddOrUpdateStudent
    | IAddOrUpdateSubject
    | IAddOrUpdateTeacher
    | IAddOrUpdateClassroom
    | IAddOrUpdateExam
    | IAddOrUpdateExamResult
    | IGetClassrooms
    | IGetSubjects
    | IGetTeachers
    | IGetExams
    | IAddTimetableRow
    | IDeleteTimetableRow
    | IDeleteClassroom
    | IDeleteExam
    | IDeleteStudent
    | IDeleteSubject
    | IDeleteTeacher
    | IDeleteQuestion
    | IDeleteExamResult
    | IAddOrUpdateQuestion
    | IGetQuestions
    | IGetExamResult;
