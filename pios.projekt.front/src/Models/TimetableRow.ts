import { TimetableItem } from './TimetableItem';

export interface TimetableRow {
    id: number;
    classroomId: number;
    fromHour: number;
    toHour: number;
    monday: TimetableItem | null;
    tuesday: TimetableItem | null;
    wednesday: TimetableItem | null;
    thursday: TimetableItem | null;
    friday: TimetableItem | null;
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
