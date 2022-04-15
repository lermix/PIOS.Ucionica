import { Button } from '@progress/kendo-react-buttons';
import { RadioButton, RadioButtonChangeEvent } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Exam } from '../../../Models/Exam';
import { ExamResult } from '../../../Models/ExamResult';
import { KeyValue, Question, QuestionClass } from '../../../Models/Question';
import { VerifiedUser } from '../../../Models/User';
import { addOrUpdateExam, addOrUpdateExamResult } from '../../../Stores/Classroom/actions';
import { AppState } from '../../../Stores/rootReducer';

interface IProps {
    exam: Exam;
    isEditing: boolean;
}

interface IStateProps {
    verifiedUser: VerifiedUser;
    examResults: ExamResult[];
    exams: Exam[];
}

const ExamViewer: React.FC<IProps> = ({ exam, isEditing }) => {
    const dispatch = useDispatch();
    const { verifiedUser, examResults, exams } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            verifiedUser: state.security.verifiedUser,
            examResults: state.classroom.examResults,
            exams: state.classroom.exams,
        };
    });

    //Key question id, value answer id
    const [selectedAnswers, setsSlectedAnswers] = useState<KeyValue[]>([]);
    const [examState, setExamState] = useState<Exam | null>(exam);

    useEffect(() => {
        setExamState(exam);
    }, [exam]);

    const upateSelectedAnswers = (radioProps: RadioButtonChangeEvent, questionId: number) => {
        if (selectedAnswers.find((e) => e.key === questionId)) {
            const temp = selectedAnswers;
            temp.forEach((e, i) => {
                if (e.key === questionId) temp[i].value = radioProps.value.toString();
            });
            setsSlectedAnswers([...temp]);
        } else {
            setsSlectedAnswers([...selectedAnswers, { key: questionId, value: radioProps.value.toString() }]);
        }
    };

    const submitAnswer = () => {
        if (examState) {
            let correct = 0;
            selectedAnswers.forEach((e) => {
                console.log(
                    'Question',
                    examState.questions.find((q) => q.id === e.key),
                );
                console.log(e.value);
                if (examState.questions.find((q) => q.id === e.key)?.correctAnswer === Number(e.value)) {
                    console.log('INC');
                    correct += 1;
                }
            });

            const examResult: ExamResult = {
                examId: examState.id,
                numOfCorrectAnswers: correct,
                studentId: verifiedUser.id,
                id: examResults.length + 1,
            };
            dispatch(addOrUpdateExamResult(examResult));
            dispatch(addOrUpdateExam({ ...examState, students: examState.students.filter((s) => s.id !== verifiedUser.id) }));
            setExamState(null);
        }
    };

    return (
        <>
            <h4 style={{ fontWeight: 'bold' }}>{examState?.name}</h4>
            {examState?.questions.map((q, i) => (
                <div key={i}>
                    <h4 key={i}>{q.examQuestion}</h4>
                    {q.possibleAnswers.map((a) => (
                        <>
                            <RadioButton
                                key={a.key}
                                value={a.key}
                                checked={selectedAnswers.find((e) => e.key === q.id)?.value === a.key.toString() ?? false}
                                label={a.value}
                                onChange={(e) => upateSelectedAnswers(e, q.id)}
                            />
                            <br />
                        </>
                    ))}
                </div>
            ))}
            {!isEditing && examState && (
                <Button style={{ marginTop: 30 }} onClick={() => submitAnswer()}>
                    Submit
                </Button>
            )}
        </>
    );
};

export default ExamViewer;
