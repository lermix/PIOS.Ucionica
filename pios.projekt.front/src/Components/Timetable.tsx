/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Stores/rootReducer';
import { TimetableInstance } from '../Models/TimetableInstance';

interface IStateProps {
    translate: TranslateFunction;
}

const Timetable: React.FC = () => {
    const dispatch = useDispatch();
    const { translate } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
        };
    });

    const tempData: TimetableInstance[] = [
        { id: 0, fromHour: 8, toHour: 9, monday: 'Mat', tuesday: 'fiz', wednesday: 'mat', thursday: 'bio', friday: 'hrv' },
        { id: 1, fromHour: 9, toHour: 10, monday: 'Mat', tuesday: 'Hrv', wednesday: 'Pov', thursday: 'Teh', friday: 'hrv' },
    ];

    return (
        <>
            <Grid data={tempData}>
                <GridColumn field="fromHour" />
                <GridColumn field="toHour" />
                <GridColumn field="monday" />
                <GridColumn field="tuesday" />
                <GridColumn field="wednesday" />
                <GridColumn field="thursday" />
                <GridColumn field="friday" />
            </Grid>
        </>
    );
};

export default Timetable;
