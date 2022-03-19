import { Student } from './Student';

export interface SchoolClass {
    id: number;
    name: string;
    student: Student[];
}
