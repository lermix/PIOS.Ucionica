import { Student } from './Student';
import { Teacher, TeacherClass } from './Teacher';
import { Subject, SubjectClass } from './Subject';
import { Question } from './Question';

export interface Exam {
    id: number;
    name: string;
    students: Student[];
    teacher: Teacher;
    subject: Subject;
    date: Date;
    questions: Question[];
}

export class ExamClass implements Exam {
    id = 0;
    name = '';
    students = [];
    subject = new SubjectClass();
    teacher = new TeacherClass();
    date = new Date();
    questions = [];
}
