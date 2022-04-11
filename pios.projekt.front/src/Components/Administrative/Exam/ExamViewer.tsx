import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Exam } from '../../../Models/Exam';
import { Question, QuestionClass } from '../../../Models/Question';

interface IProps {
    exam: Exam;
}

const ExamViewer: React.FC<IProps> = ({ exam }) => {
    const dispatch = useDispatch();

    const [question, setQuestion] = useState<Question>(new QuestionClass());

    return (
        <>
            <h4 style={{ fontWeight: 'bold' }}>{exam.name}</h4>
            {exam.questions.map((q, i) => {
                <h4 key={i}>{q.examQuestion}</h4>;
                <select key={i}>
                    {q.possibleAnswers.map((a) => {
                        <option key={a.key}>{a.value}</option>;
                    })}
                    ;
                </select>;
            })}
        </>
    );
};

export default ExamViewer;
