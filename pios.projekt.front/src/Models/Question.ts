export interface Question {
    id: number;
    examId: number;
    name: string;
    examQuestion: string;
    possibleAnswers: KeyValue[];
    correctAnswer: number;
}

export interface KeyValue {
    key: number;
    value: string;
}

export class QuestionClass implements Question {
    id = 0;
    examId = 0;
    name = '';
    examQuestion = '';
    possibleAnswers = [];
    correctAnswer = 0;
}
