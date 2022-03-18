/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../Stores/rootReducer';
import { TimetableInstance } from '../../Models/TimetableInstance';
import { Splitter, SplitterOnChangeEvent } from '@progress/kendo-react-layout/dist/npm/splitter/Splitter';
import { SplitterPaneProps } from '@progress/kendo-react-layout';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../Models/Teacher';
import { Button } from '@progress/kendo-react-buttons';

interface IStateProps {
    translate: TranslateFunction;
}

const AddPerson: React.FC = () => {
    const dispatch = useDispatch();
    const { translate } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
        };
    });

    const [teacher, setTeacher] = useState<Teacher>(new TeacherClass());
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([{ size: '50%', min: '20px', collapsible: false, resizable: false }, {}]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    const DeleteCell = (cellProps: GridCellProps) => {
        return (
            <td>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    return (
        <>
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Add Teacher</h2>
                    <p>Name</p>
                    <Input onChange={(e) => e.value && setTeacher({ ...teacher, name: e.value })} />

                    <p>surname</p>
                    <Input onChange={(e) => e.value && setTeacher({ ...teacher, name: e.value })} />

                    <p>Subjects</p>
                    <Grid data={teacher.subjects} style={{ width: '40%' }}>
                        <GridColumn field="name" />
                        <GridColumn cell={DeleteCell} width={30} />
                    </Grid>
                    <Button style={{ marginTop: 10 }}>Add subject</Button>

                    <p>Clases</p>
                    <Grid data={teacher.subjects} style={{ width: '40%' }}>
                        <GridColumn field="name" />
                        <GridColumn cell={DeleteCell} width={30} />
                    </Grid>
                    <Button style={{ marginTop: 10 }}>Add Class</Button>
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Add Student</h2>
                </div>
            </Splitter>
        </>
    );
};

export default AddPerson;
