export interface Subject {
    id: number;
    name: string;
}

export class SubjectClass implements Subject {
    id = 0;
    name = 'classroom';
}
