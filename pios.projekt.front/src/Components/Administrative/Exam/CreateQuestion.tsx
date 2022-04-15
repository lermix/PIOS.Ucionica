/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridCellProps, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { Splitter } from '@progress/kendo-react-layout';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { KeyValue, Question, QuestionClass } from '../../../Models/Question';
import { addOrUpdateQuestion } from '../../../Stores/Classroom/actions';
import { AppState } from '../../../Stores/rootReducer';

interface IProps {
    questionFromParent: Question | null;
}

interface IStateProps {
    questions: Question[];
}

const CreateQuestion: React.FC<IProps> = ({ questionFromParent }) => {
    const dispatch = useDispatch();
    const { questions } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            questions: state.classroom.question,
        };
    });
    const [question, setQuestion] = useState<Question>(questionFromParent ? questionFromParent : new QuestionClass());
    const [answer, setAnswer] = useState<KeyValue>({ key: 0, value: '' });

    useEffect(() => {
        questionFromParent ? setQuestion(questionFromParent) : setQuestion(new QuestionClass());
    }, [questionFromParent]);

    const DeleteCell = (cellProps: GridCellProps) => {
        return (
            <td
                onClick={() => {
                    const tempAnswers = question.possibleAnswers.filter((e) => e.key !== cellProps.dataItem.key);
                    for (let i = 0; i < tempAnswers.length; i++) {
                        tempAnswers[i].key = i + 1;
                    }
                    setQuestion({ ...question, possibleAnswers: tempAnswers });
                }}
            >
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    return (
        <Splitter>
            <div style={{ marginLeft: 15 }}>
                <h2 style={{ marginTop: 30 }}>Create question</h2>

                <p>Name</p>
                <Input value={question?.name} onChange={(e) => setQuestion({ ...question, name: e.value })} />
                <p> Exam Question</p>
                <Input style={{ width: '90%' }} value={question.examQuestion} onChange={(e) => setQuestion({ ...question, examQuestion: e.value })} />

                <h4>Answers:</h4>
                <Grid
                    data={question.possibleAnswers}
                    onRowClick={(e) => setQuestion({ ...question, correctAnswer: e.dataItem.key })}
                    style={{ width: '90%' }}
                >
                    <GridColumn field={'key'} />
                    <GridColumn field={'value'} />
                    <GridColumn width={30} cell={DeleteCell} />
                </Grid>
                <p>Answer number and answer</p>
                <div style={{ display: 'flex' }}>
                    <Input
                        disabled={true}
                        type={'number'}
                        style={{ width: 70, marginRight: 15 }}
                        min={0}
                        value={question.possibleAnswers.length + 1}
                    />
                    <Input value={answer.value} onChange={(e) => setAnswer({ key: question.possibleAnswers.length + 1, value: e.value })} />
                    <Button
                        onClick={() => {
                            setQuestion({ ...question, possibleAnswers: [...question.possibleAnswers, answer] });
                            setAnswer({ key: question.possibleAnswers.length + 1, value: '' });
                        }}
                    >
                        Add answer
                    </Button>
                </div>

                <h4>Correct answer: {question.correctAnswer}</h4>
                <Button
                    onClick={() => {
                        if (questionFromParent) dispatch(addOrUpdateQuestion(question));
                        else dispatch(addOrUpdateQuestion({ ...question, id: questions.length + 1 }));
                        setQuestion(new QuestionClass());
                    }}
                >
                    Add Question
                </Button>
                <div />
            </div>
        </Splitter>
    );
};

export default CreateQuestion;
