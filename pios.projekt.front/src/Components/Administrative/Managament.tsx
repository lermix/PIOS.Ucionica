/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../Stores/rootReducer';
import { TimetableInstance } from '../../Models/TimetableInstance';
import { Splitter, SplitterOnChangeEvent } from '@progress/kendo-react-layout/dist/npm/splitter/Splitter';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../Models/Teacher';
import { Button } from '@progress/kendo-react-buttons';
import { Student, StudentClass } from '../../Models/Student';
import { SplitterPaneProps } from '@progress/kendo-react-layout/dist/npm/splitter/SplitterPane';
import { addOrUpdateClassroom, addOrUpdateStudent, addOrUpdateSubject, addOrUpdateTeacher } from '../../Stores/Classroom/actions';
import { Subject, SubjectClass } from '../../Models/Subject';
import { SchoolClass, SchoolClassClass } from '../../Models/SchoolClass';

interface IStateProps {
    translate: TranslateFunction;
    students: Student[];
    teachers: Teacher[];
    subjects: Subject[];
    classrooms: SchoolClass[];
}

const Managament: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, students, teachers, subjects, classrooms } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            students: state.classroom.students,
            teachers: state.classroom.teachers,
            subjects: state.classroom.subjects,
            classrooms: state.classroom.classrooms,
        };
    });

    const [teacher, setTeacher] = useState<Teacher>(new TeacherClass());
    const [student, setStudent] = useState<Student>(new StudentClass());
    const [subject, setSubject] = useState<SubjectClass>(new SubjectClass());
    const [classroom, setClassroom] = useState<SchoolClass>(new SchoolClassClass());
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '50%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '50%', min: '20px', collapsible: false, resizable: false },
    ]);

    const [nestedPanes, setNestedPanes] = React.useState<Array<any>>([{ size: '40%' }, {}, { size: '30%', resizable: false }]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    const onNestedChange = (event: SplitterOnChangeEvent) => {
        setNestedPanes(event.newState);
    };

    const DeleteTeacherSubjectCell = (cellProps: GridCellProps, setTeacher: React.Dispatch<React.SetStateAction<Teacher>>) => {
        return (
            <td onClick={() => setTeacher({ ...teacher, subjects: teacher.subjects.filter((e) => e.id !== cellProps.dataItem.id) })}>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    const DeleteTeacherClassCell = (cellProps: GridCellProps) => {
        return (
            <td onClick={() => setTeacher({ ...teacher, classes: teacher.classes.filter((e) => e.id !== cellProps.dataItem.id) })}>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    const DeleteStudentSubjectCell = (cellProps: GridCellProps) => {
        return (
            <td onClick={() => setStudent({ ...student, subjects: student.subjects.filter((e) => e.id !== cellProps.dataItem.id) })}>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    return (
        <>
            <Splitter panes={panes} onChange={onNestedChange} orientation={'vertical'}>
                <Splitter panes={panes} onChange={onChange}>
                    <div className="pane-content" style={{ marginLeft: 15 }}>
                        <h2>Add Teacher</h2>
                        <p>Name</p>
                        <Input onChange={(e) => e.value && setTeacher({ ...teacher, name: e.value })} />

                        <p>surname</p>
                        <Input onChange={(e) => e.value && setTeacher({ ...teacher, surname: e.value })} />

                        <p>Subjects</p>
                        <Grid data={teacher.subjects} style={{ width: '40%' }}>
                            <GridColumn field="name" />
                            <GridColumn cell={DeleteTeacherSubjectCell} width={30} />
                        </Grid>
                        <Button style={{ marginTop: 10 }}>Add subject</Button>

                        <p>Clases</p>
                        <Grid data={teacher.subjects} style={{ width: '40%' }}>
                            <GridColumn field="name" />
                            <GridColumn cell={DeleteTeacherClassCell} width={30} />
                        </Grid>
                        <Button style={{ marginTop: 10 }}>Add Class</Button>
                        <br />
                        <Button style={{ marginTop: 40 }} onClick={() => dispatch(addOrUpdateTeacher({ ...teacher, id: teachers.length }))}>
                            OK
                        </Button>
                    </div>
                    <div className="pane-content" style={{ marginLeft: 15 }}>
                        <h2>Add Student</h2>
                        <p>Name</p>
                        <Input onChange={(e) => e.value && setStudent({ ...teacher, name: e.value })} />

                        <p>surname</p>
                        <Input onChange={(e) => e.value && setStudent({ ...teacher, surname: e.value })} />

                        <p>Subjects</p>
                        <Grid data={teacher.subjects} style={{ width: '40%' }}>
                            <GridColumn field="name" />
                            <GridColumn cell={DeleteStudentSubjectCell} width={30} />
                        </Grid>
                        <Button style={{ marginTop: 10 }}>Add subject</Button>
                        <br />
                        <Button style={{ marginTop: 40 }} onClick={() => dispatch(addOrUpdateStudent({ ...student, id: students.length }))}>
                            OK
                        </Button>
                    </div>
                </Splitter>
                <Splitter panes={panes} onChange={onChange}>
                    <div className="pane-content" style={{ marginLeft: 15 }}>
                        <h2>Add Subject</h2>
                        <p>Name</p>
                        <Input onChange={(e) => e.value && setSubject({ ...subject, name: e.value })} />
                        <br />
                        <Button style={{ marginTop: 40 }} onClick={() => addOrUpdateSubject({ ...subject, id: subjects.length })}>
                            OK
                        </Button>
                    </div>
                    <div className="pane-content" style={{ marginLeft: 15 }}>
                        <h2>Add Classroom</h2>
                        <p>Name</p>
                        <Input onChange={(e) => e.value && setClassroom({ ...classroom, name: e.value })} />
                        <p>Students</p>
                        <Grid data={teacher.subjects} style={{ width: '40%' }}>
                            <GridColumn field="name" />
                            <GridColumn cell={DeleteStudentSubjectCell} width={30} />
                        </Grid>
                        <Button style={{ marginTop: 10 }}>Add subject</Button>
                        <br />
                        <Button style={{ marginTop: 40 }} onClick={() => addOrUpdateClassroom({ ...classroom, id: classrooms.length })}>
                            OK
                        </Button>
                    </div>
                </Splitter>
            </Splitter>
        </>
    );
};

export default Managament;
