/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Student, StudentClass } from '../../../Models/Student';

import { Subject, SubjectClass } from '../../../Models/Subject';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../../Models/Teacher';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateStudent, addOrUpdateSubject, addOrUpdateTeacher, DeleteSubject } from '../../../Stores/Classroom/actions';
import { SchoolClass } from '../../../Models/SchoolClass';
import { AppState } from '../../../Stores/rootReducer';
import { Splitter, SplitterOnChangeEvent, SplitterPaneProps } from '@progress/kendo-react-layout';
import { DeleteCell } from '../../Shared/DeleteCell';

interface IProps {
    OpenSelect: (list: Student[] | Subject[], func: (data: any[]) => void) => void;
}

interface IStateProps {
    subjects: Subject[];
}

const SubjectEditor: React.FC<IProps> = ({ OpenSelect }) => {
    const dispatch = useDispatch();
    const { subjects } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            subjects: state.classroom.subjects,
        };
    });

    const [selected, setSelected] = useState<Subject | null>(null);
    const [subject, setSubject] = useState<SubjectClass>(new SubjectClass());
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '50%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '50%', min: '20px', collapsible: false, resizable: false },
    ]);

    useEffect(() => {
        setSubject(selected ?? new SubjectClass());
    }, [selected]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    return (
        <>
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Add Subject</h2>
                    <p>Name</p>
                    <Input value={subject.name} onChange={(e) => setSubject({ ...subject, name: e.value })} />
                    <br />
                    <Button
                        style={{ marginTop: 40 }}
                        onClick={() => {
                            if (selected) dispatch(addOrUpdateSubject(subject));
                            else dispatch(addOrUpdateSubject({ ...subject, id: subjects.length }));
                            setSubject(new SubjectClass());
                        }}
                    >
                        OK
                    </Button>
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Existing Subjects</h2>

                    <Grid
                        style={{ width: '30%', marginRight: 15 }}
                        data={subjects}
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
                        <GridColumn width={40} cell={(cellProps) => DeleteCell(cellProps, (dataItem) => dispatch(DeleteSubject(dataItem.id)))} />
                    </Grid>
                    <Button
                        style={{ marginTop: 30 }}
                        onClick={() => {
                            setSubject(new SubjectClass());
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

export default SubjectEditor;
