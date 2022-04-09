/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Student } from '../../../Models/Student';

import { Subject } from '../../../Models/Subject';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../../Models/Teacher';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateTeacher, DeleteTeacher } from '../../../Stores/Classroom/actions';
import { SchoolClass } from '../../../Models/SchoolClass';
import { AppState } from '../../../Stores/rootReducer';
import { Splitter, SplitterOnChangeEvent, SplitterPaneProps } from '@progress/kendo-react-layout';
import { DeleteCell } from '../../Shared/DeleteCell';

interface IProps {
    OpenSelect: (list: Student[] | Subject[], func: (data: any[]) => void) => void;
}

interface IStateProps {
    teachers: Teacher[];
    subjects: Subject[];
    classrooms: SchoolClass[];
}

const TeacherEditor: React.FC<IProps> = ({ OpenSelect }) => {
    const dispatch = useDispatch();
    const { teachers, subjects, classrooms } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            teachers: state.classroom.teachers,
            subjects: state.classroom.subjects,
            classrooms: state.classroom.classrooms,
        };
    });

    const [selected, setSelected] = useState<Teacher | null>(null);
    const [teacher, setTeacher] = useState<Teacher>(new TeacherClass());
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '30%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '70%', min: '20px', collapsible: false, resizable: false },
    ]);

    useEffect(() => {
        setTeacher(selected ?? new TeacherClass());
    }, [selected]);

    const DeleteTeacherSubjectCell = (cellProps: GridCellProps) => {
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

    const SubjectsCell = (cellProps: GridCellProps) => {
        return <td>{cellProps.dataItem.subjects.map((e: Subject) => e.name.substring(0, 3) + ' ')}</td>;
    };

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    return (
        <>
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Add Teacher</h2>
                    <p>Name</p>
                    <Input value={teacher.name} onChange={(e) => e.value && setTeacher({ ...teacher, name: e.value })} />

                    <p>surname</p>
                    <Input value={teacher.surname} onChange={(e) => e.value && setTeacher({ ...teacher, surname: e.value })} />

                    <p>Subjects</p>
                    <Grid data={teacher.subjects} style={{ width: '70%' }}>
                        <GridColumn field="name" />
                        <GridColumn cell={DeleteTeacherSubjectCell} width={30} />
                    </Grid>
                    <Button
                        style={{ marginTop: 10 }}
                        onClick={() =>
                            OpenSelect(
                                subjects.filter((e) => !teacher.subjects.includes(e)),
                                (data) => setTeacher({ ...teacher, subjects: [...teacher.subjects, ...data] }),
                            )
                        }
                    >
                        Add subject
                    </Button>

                    <p>Classroms</p>
                    <Grid data={teacher.classes} style={{ width: '70%' }}>
                        <GridColumn field="name" />
                        <GridColumn cell={DeleteTeacherClassCell} width={30} />
                    </Grid>
                    <Button
                        style={{ marginTop: 10 }}
                        onClick={() =>
                            OpenSelect(
                                classrooms.filter((e) => !teacher.classes.includes(e)),
                                (data) => setTeacher({ ...teacher, classes: [...teacher.classes, ...data] }),
                            )
                        }
                    >
                        Add classroom
                    </Button>
                    <br />
                    <Button
                        style={{ marginTop: 40 }}
                        onClick={() => {
                            if (selected) dispatch(addOrUpdateTeacher(teacher));
                            else dispatch(addOrUpdateTeacher({ ...teacher, id: teachers.length + 1 }));
                            setTeacher(new TeacherClass());
                        }}
                    >
                        OK
                    </Button>
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Existing teachers</h2>
                    <Grid
                        data={teachers}
                        onRowClick={(event) => setSelected(event.dataItem)}
                        rowRender={(row, rowProps) =>
                            React.cloneElement(
                                row,
                                { ...({ style: rowProps.dataItem.id === selected?.id ? { backgroundColor: 'lightBlue' } : {} } as any) },
                                row.props.children,
                            )
                        }
                    >
                        <GridColumn field="name" />
                        <GridColumn field="surname" />
                        <GridColumn title="Subjects" cell={SubjectsCell} />
                        <GridColumn width={40} cell={(cellProps) => DeleteCell(cellProps, (dataItem) => dispatch(DeleteTeacher(dataItem.id)))} />
                    </Grid>
                    <Button
                        style={{ marginTop: 30 }}
                        onClick={() => {
                            setTeacher(new TeacherClass());
                            setSelected(null);
                        }}
                    >
                        Clear form
                    </Button>
                </div>
            </Splitter>
        </>
    );
};

export default TeacherEditor;
