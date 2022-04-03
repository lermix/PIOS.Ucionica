import { SchoolClass } from './SchoolClass';
import { Subject } from './Subject';

export interface Teacher {
    id: number;
    name: string;
    surname: string;
    subjects: Subject[];
    classes: SchoolClass[];
}

export class TeacherClass implements Teacher {
    id = -1;
    name = '';
    surname = '';
    subjects = [];
    classes = [];
}
