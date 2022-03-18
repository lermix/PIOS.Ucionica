import { Subject } from './Subject';

export interface Student {
    id: number;
    name: string;
    surname: string;
    subjects: Subject[];
}
