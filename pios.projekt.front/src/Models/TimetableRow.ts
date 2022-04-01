import { Subject } from './Subject';

export interface TimetableRow {
    id: number;
    classroomId: number;
    fromHour: number;
    toHour: number;
    monday: Subject | null;
    tuesday: Subject | null;
    wednesday: Subject | null;
    thursday: Subject | null;
    friday: Subject | null;
}

export class TimetableRowClass implements TimetableRow {
    id = 0;
    classroomId = 0;
    fromHour = 0;
    toHour = 0;

    monday = null;
    tuesday = null;
    wednesday = null;
    thursday = null;
    friday = null;
}
