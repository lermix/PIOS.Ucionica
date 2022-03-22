import { Subject } from './Subject';

export interface Student {
    id: number;
    name: string;
    surname: string;
    subjects: Subject[];
}

export class StudentClass implements Student {
    id = 0;
    name = '';
    surname = '';
    subjects = [];
}
