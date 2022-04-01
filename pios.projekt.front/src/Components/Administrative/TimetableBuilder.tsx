/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolClass } from '../../Models/SchoolClass';
import { Subject } from '../../Models/Subject';
import { TimetableRow, TimetableRowClass } from '../../Models/TimetableRow';
import { AppState } from '../../Stores/rootReducer';
import ClassSelectWindow from './ClassSelectWindow';

interface IStateProps {
    translate: TranslateFunction;
    timetableRows: TimetableRow[];
    classrooms: SchoolClass[];
    subjects: Subject[];
}

const TimetableBuilder: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, timetableRows, subjects } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            timetableRows: state.classroom.timetableRows,
            classrooms: state.classroom.classrooms,
            subjects: state.classroom.subjects,
        };
    });

    const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
    const [classSelectVisible, setClassSelectVisible] = useState<boolean>(false);
    const [timetableRow, setTimetableRow] = useState<TimetableRow>(new TimetableRowClass());
    const [timetableRowsState, setTimetableRowsState] = useState<TimetableRow[]>(timetableRows);

    return (
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
            <div style={{ display: 'flex', width: '100%', marginBottom: 30 }}>
                <Input style={{ width: '14.28%' }} onChange={(e) => setTimetableRow({ ...timetableRow, fromHour: Number(e.value) })} />
                <Input style={{ width: '14%' }} onChange={(e) => setTimetableRow({ ...timetableRow, toHour: Number(e.value) })} />
                <DropDownList
                    style={{ width: '14%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, monday: e.value })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.28%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, tuesday: e.value })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.1%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, wednesday: e.value })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.1%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, thursday: e.value })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.28%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, friday: e.value })}
                    textField={'name'}
                />
            </div>
            <Button style={{ marginLeft: '90%', marginBottom: 30 }} onClick={() => setTimetableRowsState([...timetableRowsState, timetableRow])}>
                Add
            </Button>
            <Grid data={timetableRowsState}>
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

export default TimetableBuilder;
