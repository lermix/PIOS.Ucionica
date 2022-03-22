import { Student } from './Student';

export interface SchoolClass {
    id: number;
    name: string;
    students: Student[];
}

export class SchoolClassClass {
    id = 0;
    name = '';
    students = [];
}
