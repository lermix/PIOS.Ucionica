/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Window } from '@progress/kendo-react-dialogs';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Exam, ExamClass } from '../../../Models/Exam';
import { AppState } from '../../../Stores/rootReducer';
import { Input } from '@progress/kendo-react-inputs';
import ManagamentWindow from '../ClassSelectWindow';
import { Student } from '../../../Models/Student';
import { Teacher } from '../../../Models/Teacher';
import { Subject } from '../../../Models/Subject';
import { Splitter } from '@progress/kendo-react-layout';
import { Question } from '../../../Models/Question';
import { addOrUpdateExam } from '../../../Stores/Classroom/actions';

interface IStateProps {
    exams: Exam[];
    students: Student[];
    teachers: Teacher[];
    subjects: Subject[];
    questions: Question[];
}

const CreateExam: React.FC = () => {
    const dispatch = useDispatch();
    const { exams, students, teachers, subjects, questions } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            exams: state.classroom.exams,
            students: state.classroom.students,
            teachers: state.classroom.teachers,
            subjects: state.classroom.subjects,
            questions: state.classroom.question,
        };
    });

    const [exam, setExam] = useState<Exam>(new ExamClass());
    const [selected, setSelected] = useState<Exam | null>();
    const [windowView, setWindowView] = useState<number>(0);

    const rowRenderMultiple = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps, array: any[]) => {
        const isSelected = array.includes(rowProps.dataItem);
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    const rowRenderSingleItem = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps, compareToId: number) => {
        const isSelected = rowProps.dataItem.id === compareToId;
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    const onRowClick = (rowProps: GridRowClickEvent) => {
        if (exam.students.find((e) => e.id === rowProps.dataItem.id))
            setExam({ ...exam, students: [...exam.students.filter((e) => e.id !== rowProps.dataItem.id)] });
        else setExam({ ...exam, students: [...exam.students, rowProps.dataItem] });
    };

    return (
        <Splitter>
            <div style={{ marginLeft: 15 }}>
                {windowView === 0 && (
                    <>
                        <p>Name</p>
                        <Input value={selected?.name} onChange={(e) => setExam({ ...exam, name: e.value })} />
                        <br /> <br />
                        <p>Students</p>
                        <Grid data={exam.students}>
                            <GridColumn field="name" />
                            <GridColumn field="surname" />
                        </Grid>
                        <Button style={{ marginTop: 15 }} onClick={() => setWindowView(1)}>
                            Add student
                        </Button>
                        <br /> <br />
                        <p>Questions:</p>
                        <Grid data={exam.questions}>
                            <GridColumn field="name" />
                            <GridColumn field="surname" />
                        </Grid>
                        <Button style={{ marginTop: 15 }} onClick={() => setWindowView(4)}>
                            Add Question
                        </Button>
                        <br /> <br />
                        <div style={{ display: 'flex' }}>
                            <p>
                                Teacher: <b>{exam.teacher.name + ' ' + exam.teacher.surname}</b>
                            </p>
                            <Button style={{ marginLeft: 30, height: 25, marginTop: 10 }} onClick={() => setWindowView(2)}>
                                Select teacher
                            </Button>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <p>
                                Subject: <b>{exam.subject.name}</b>
                            </p>
                            <Button style={{ marginLeft: 30, height: 25, marginTop: 10 }} onClick={() => setWindowView(3)}>
                                Select subject
                            </Button>
                        </div>
                        <p>Date:</p>
                        <DatePicker defaultValue={new Date()} format="dd/MM/yyyy" />
                        <br />
                        <br />
                        <Button onClick={() => dispatch(addOrUpdateExam(exam))}>Add Exam</Button>
                    </>
                )}
                {windowView === 1 && (
                    <div>
                        <Grid data={students} onRowClick={onRowClick} rowRender={(row, rowProps) => rowRenderMultiple(row, rowProps, exam.students)}>
                            <GridColumn field="name" />
                            <GridColumn field="surname" />
                        </Grid>
                        <Button onClick={() => setWindowView(0)}>Back</Button>
                    </div>
                )}
                {windowView === 2 && (
                    <>
                        <Grid
                            data={teachers}
                            onRowClick={(e) => setExam({ ...exam, teacher: e.dataItem })}
                            rowRender={(row, rowProps) => rowRenderSingleItem(row, rowProps, exam.teacher.id)}
                        >
                            <GridColumn field="name" />
                            <GridColumn field="surname" />
                        </Grid>
                        <Button onClick={() => setWindowView(0)}>Back</Button>
                    </>
                )}
                {windowView === 3 && (
                    <>
                        <Grid
                            data={subjects}
                            onRowClick={(e) => setExam({ ...exam, subject: e.dataItem })}
                            rowRender={(row, rowProps) => rowRenderSingleItem(row, rowProps, exam.subject.id)}
                        >
                            <GridColumn field="name" />
                        </Grid>
                        <Button onClick={() => setWindowView(0)}>Back</Button>
                    </>
                )}
                {windowView === 4 && (
                    <>
                        <Grid
                            data={questions}
                            onRowClick={(e) => setExam({ ...exam, questions: [...exam.questions, e.dataItem] })}
                            rowRender={(row, rowProps) => rowRenderMultiple(row, rowProps, exam.questions)}
                        >
                            <GridColumn field="name" />
                        </Grid>
                        <Button onClick={() => setWindowView(0)}>Back</Button>
                    </>
                )}
            </div>
        </Splitter>
    );
};

export default CreateExam;
