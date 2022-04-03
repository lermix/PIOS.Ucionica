import { Subject } from './Subject';
import { Teacher } from './Teacher';

export interface TimetableItem {
    subject: Subject | null;
    teacher: Teacher | null;
}
