/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolClass } from '../Models/SchoolClass';
import { TimetableRow } from '../Models/TimetableRow';
import { VerifiedUser, VerifiedUserClass } from '../Models/User';
import { AppState } from '../Stores/rootReducer';
import ClassSelectWindow from './Administrative/ClassSelectWindow';

interface IStateProps {
    translate: TranslateFunction;
    classes: SchoolClass[];
    verifiedUser: VerifiedUser;
}

const Timetable: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, classes, verifiedUser } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            classes: state.classroom.classrooms,
            verifiedUser: state.security.verifiedUser,
        };
    });

    const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
    const [classSelectVisible, setClassSelectVisible] = useState<boolean>(false);

    const timetableCell = (cellProps: GridCellProps) => {
        if (cellProps.field) {
            if (cellProps.dataItem[cellProps.field].teacher.id === verifiedUser.id)
                return (
                    <td style={{ backgroundColor: 'darkblue', color: 'white' }}>
                        {cellProps.dataItem[cellProps.field].subject.name + ' - ' + cellProps.dataItem[cellProps.field].teacher.surname}
                    </td>
                );
            else return <td>{cellProps.dataItem[cellProps.field].subject.name + ' - ' + cellProps.dataItem[cellProps.field].teacher.surname}</td>;
        } else return <td></td>;
    };

    return (
        <>
            {verifiedUser.roles?.includes('Teacher') && (
                <>
                    {classSelectVisible && <ClassSelectWindow onClose={() => setClassSelectVisible(false)} setState={setSelectedClass} />}
                    <div style={{ display: 'flex' }}>
                        <p style={{ height: 30, width: 100, backgroundColor: 'gray', color: 'white', borderRadius: 10, textAlign: 'center' }}>
                            {selectedClass?.name}
                        </p>
                        <Button style={{ height: 30, marginTop: 14, marginLeft: 30 }} onClick={() => setClassSelectVisible(true)}>
                            Select class
                        </Button>
                    </div>
                    <Grid data={selectedClass?.timetableRows}>
                        <GridColumn field="fromHour" />
                        <GridColumn field="toHour" />
                        <GridColumn field="monday" cell={timetableCell} />
                        <GridColumn field="tuesday" cell={timetableCell} />
                        <GridColumn field="wednesday" cell={timetableCell} />
                        <GridColumn field="thursday" cell={timetableCell} />
                        <GridColumn field="friday" cell={timetableCell} />
                    </Grid>
                </>
            )}
            {!verifiedUser.roles?.includes('Teacher') && (
                <>
                    <Grid data={classes.find((e) => e.students.find((s) => s.id === verifiedUser.id))?.timetableRows}>
                        <GridColumn field="fromHour" />
                        <GridColumn field="toHour" />
                        <GridColumn field="monday" cell={timetableCell} />
                        <GridColumn field="tuesday" cell={timetableCell} />
                        <GridColumn field="wednesday" cell={timetableCell} />
                        <GridColumn field="thursday" cell={timetableCell} />
                        <GridColumn field="friday" cell={timetableCell} />
                    </Grid>
                </>
            )}
        </>
    );
};

export default Timetable;
