import { Student } from './Student';
import { TimetableRow } from './TimetableRow';

export interface SchoolClass {
    id: number;
    name: string;
    students: Student[];
    timetableRows: TimetableRow[];
}

export class SchoolClassClass implements SchoolClass {
    id = 0;
    name = '';
    students = [];
    timetableRows = [];
}
