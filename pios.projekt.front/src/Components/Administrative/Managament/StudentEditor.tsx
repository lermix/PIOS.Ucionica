/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Student, StudentClass } from '../../../Models/Student';

import { Subject } from '../../../Models/Subject';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../../Models/Teacher';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateStudent, addOrUpdateTeacher, DeleteStudent } from '../../../Stores/Classroom/actions';
import { SchoolClass } from '../../../Models/SchoolClass';
import { AppState } from '../../../Stores/rootReducer';
import { Splitter, SplitterOnChangeEvent, SplitterPaneProps } from '@progress/kendo-react-layout';
import { DeleteCell } from '../../Shared/DeleteCell';

interface IProps {
    OpenSelect: (list: Student[] | Subject[], func: (data: any[]) => void) => void;
}

interface IStateProps {
    students: Student[];
    subjects: Subject[];
}

const StudentEditor: React.FC<IProps> = ({ OpenSelect }) => {
    const dispatch = useDispatch();
    const { students, subjects } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            students: state.classroom.students,
            subjects: state.classroom.subjects,
        };
    });

    const [selected, setSelected] = useState<Student | null>(null);

    const [student, setStudent] = useState<Student>(new StudentClass());
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '50%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '50%', min: '20px', collapsible: false, resizable: false },
    ]);

    useEffect(() => {
        setStudent(selected ?? new StudentClass());
    }, [selected]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
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
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    {' '}
                    <h2>Add Student</h2>
                    <p>Name</p>
                    <Input value={student.name} onChange={(e) => setStudent({ ...student, name: e.value })} />
                    <p>surname</p>
                    <Input value={student.surname} onChange={(e) => setStudent({ ...student, surname: e.value })} />
                    <p>Subjects</p>
                    <Grid data={student.subjects} style={{ width: '40%' }}>
                        <GridColumn field="name" />
                        <GridColumn cell={DeleteStudentSubjectCell} width={30} />
                    </Grid>
                    <Button
                        style={{ marginTop: 10 }}
                        onClick={() =>
                            OpenSelect(
                                subjects.filter((e) => !student.subjects.includes(e)),
                                (data) => setStudent({ ...student, subjects: [...student.subjects, ...data] }),
                            )
                        }
                    >
                        Add subject
                    </Button>
                    <br />
                    <Button
                        style={{ marginTop: 40 }}
                        onClick={() => {
                            if (selected) dispatch(addOrUpdateStudent(student));
                            else dispatch(addOrUpdateStudent({ ...student, id: students.length + 1 }));
                            setStudent(new StudentClass());
                        }}
                    >
                        OK
                    </Button>
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Existing Students</h2>
                    <Grid
                        style={{ width: '90%', marginRight: 15 }}
                        data={students}
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
                        <GridColumn width={40} cell={(cellProps) => DeleteCell(cellProps, (dataItem) => dispatch(DeleteStudent(dataItem.id)))} />
                    </Grid>
                    <Button
                        style={{ marginTop: 30 }}
                        onClick={() => {
                            setStudent(new StudentClass());
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

export default StudentEditor;
