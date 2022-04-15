/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolClass } from '../Models/SchoolClass';
import { TimetableRow } from '../Models/TimetableRow';
import { VerifiedUser, VerifiedUserClass } from '../Models/User';
import { AppState } from '../Stores/rootReducer';

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

    const timetableCell = (cellProps: GridCellProps) => {
        if (cellProps.field)
            return <td>{cellProps.dataItem[cellProps.field].subject.name + ' - ' + cellProps.dataItem[cellProps.field].teacher.surname}</td>;
        else return <td></td>;
    };

    return (
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
    );
};

export default Timetable;
