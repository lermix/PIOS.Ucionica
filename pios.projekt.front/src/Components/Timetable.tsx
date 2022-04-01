/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { TimetableRow } from '../Models/TimetableRow';
import { AppState } from '../Stores/rootReducer';

interface IStateProps {
    translate: TranslateFunction;
    timetableRows: TimetableRow[];
}

const Timetable: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, timetableRows } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            timetableRows: state.classroom.timetableRows,
        };
    });

    return (
        <>
            <Grid data={timetableRows}>
                <GridColumn field="fromHour" />
                <GridColumn field="toHour" />
                <GridColumn field="monday.name" />
                <GridColumn field="tuesday.name" />
                <GridColumn field="wednesday.name" />
                <GridColumn field="thursday.name" />
                <GridColumn field="friday.name" />
            </Grid>
        </>
    );
};

export default Timetable;
