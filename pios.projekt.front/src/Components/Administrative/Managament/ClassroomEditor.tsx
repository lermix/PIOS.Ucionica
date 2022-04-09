/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';

import { Student } from '../../../Models/Student';

import { Subject } from '../../../Models/Subject';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateClassroom, DeleteClass } from '../../../Stores/Classroom/actions';
import { SchoolClass, SchoolClassClass } from '../../../Models/SchoolClass';
import { AppState } from '../../../Stores/rootReducer';
import { Splitter, SplitterOnChangeEvent, SplitterPaneProps } from '@progress/kendo-react-layout';
import { DeleteCell } from '../../Shared/DeleteCell';

interface IProps {
    OpenSelect: (list: Student[] | Subject[], func: (data: any[]) => void) => void;
}

interface IStateProps {
    students: Student[];
    classrooms: SchoolClass[];
}

const ClassroomEditor: React.FC<IProps> = ({ OpenSelect }) => {
    const dispatch = useDispatch();
    const { students, classrooms } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            students: state.classroom.students,
            classrooms: state.classroom.classrooms,
        };
    });

    const [selected, setSelected] = useState<SchoolClass | null>(null);
    const [classroom, setClassroom] = useState<SchoolClass>(new SchoolClassClass());
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '30%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '70%', min: '20px', collapsible: false, resizable: false },
    ]);

    useEffect(() => {
        setClassroom(selected ?? new SchoolClassClass());
    }, [selected]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    const DeleteClassroomStudenttCell = (cellProps: GridCellProps) => {
        return (
            <td onClick={() => setClassroom({ ...classroom, students: classroom.students.filter((e) => e.id !== cellProps.dataItem.id) })}>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    return (
        <>
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Add Classroom</h2>
                    <p>Name</p>
                    <Input value={classroom.name} onChange={(e) => setClassroom({ ...classroom, name: e.value })} />
                    <p>Students</p>
                    <Grid data={classroom.students} style={{ width: '90%' }}>
                        <GridColumn field="name" />
                        <GridColumn field="surname" />
                        <GridColumn cell={DeleteClassroomStudenttCell} width={30} />
                    </Grid>
                    <Button
                        style={{ marginTop: 10 }}
                        onClick={() =>
                            OpenSelect(
                                students.filter((e) => !classrooms.find((c) => c.students.find((s) => s.id === e.id))),
                                (data) => setClassroom({ ...classroom, students: [...(classroom.students ?? []), ...data] }),
                            )
                        }
                    >
                        Add student
                    </Button>
                    <br />
                    <Button
                        style={{ marginTop: 40 }}
                        onClick={() => {
                            if (selected) dispatch(addOrUpdateClassroom(classroom));
                            else dispatch(addOrUpdateClassroom({ ...classroom, id: classrooms.length + 1 }));
                            setClassroom(new SchoolClassClass());
                        }}
                    >
                        OK
                    </Button>{' '}
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Existing Classrooms</h2>

                    <div style={{ display: 'flex' }}>
                        <Grid
                            style={{ width: '30%', marginRight: 15 }}
                            data={classrooms}
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
                            <GridColumn width={40} cell={(cellProps) => DeleteCell(cellProps, (dataItem) => dispatch(DeleteClass(dataItem.id)))} />
                        </Grid>
                        {selected && (
                            <Grid style={{ width: '60%' }} data={classrooms.find((e) => e.id === selected.id)?.students}>
                                <GridColumn field="name" />
                                <GridColumn field="surname" />
                            </Grid>
                        )}
                    </div>

                    <Button
                        style={{ marginTop: 30 }}
                        onClick={() => {
                            setClassroom(new SchoolClassClass());
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

export default ClassroomEditor;
