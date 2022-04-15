/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolClass } from '../../Models/SchoolClass';
import { Subject } from '../../Models/Subject';
import { Teacher } from '../../Models/Teacher';
import { TimetableRow, TimetableRowClass } from '../../Models/TimetableRow';
import { addOrUpdateClassroom, addTimetableRow } from '../../Stores/Classroom/actions';
import { AppState } from '../../Stores/rootReducer';
import ClassSelectWindow from './ClassSelectWindow';

interface IStateProps {
    translate: TranslateFunction;
    timetableRows: TimetableRow[];
    classrooms: SchoolClass[];
    subjects: Subject[];
    teachers: Teacher[];
}

const TimetableBuilder: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, timetableRows, subjects, teachers } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            timetableRows: state.classroom.timetableRows,
            classrooms: state.classroom.classrooms,
            subjects: state.classroom.subjects,
            teachers: state.classroom.teachers,
        };
    });

    const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
    const [classSelectVisible, setClassSelectVisible] = useState<boolean>(false);
    const [timetableRow, setTimetableRow] = useState<TimetableRow>(new TimetableRowClass());
    const [timetableRowsState, setTimetableRowsState] = useState<TimetableRow[]>(selectedClass?.timetableRows ?? []);

    useEffect(() => {
        selectedClass && setTimetableRowsState(selectedClass?.timetableRows);
    }, [selectedClass]);

    const onSaveToDatabase = () => {
        if (selectedClass && timetableRows) dispatch(addOrUpdateClassroom({ ...selectedClass, timetableRows: timetableRowsState }));
    };

    const timetableCell = (cellProps: GridCellProps) => {
        if (cellProps.field)
            return <td>{cellProps.dataItem[cellProps.field].subject.name + ' - ' + cellProps.dataItem[cellProps.field].teacher.surname}</td>;
        else return <td></td>;
    };

    const deleteCell = (cellProps: GridCellProps) => {
        return (
            <td onClick={() => setTimetableRowsState(timetableRowsState.filter((e) => e.id !== cellProps.dataItem.id))}>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

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
                <Input
                    type={'number'}
                    style={{ width: '14.28%' }}
                    onChange={(e) => setTimetableRow({ ...timetableRow, fromHour: Number(e.value) })}
                />
                <Input type={'number'} style={{ width: '14%' }} onChange={(e) => setTimetableRow({ ...timetableRow, toHour: Number(e.value) })} />
                <DropDownList
                    style={{ width: '14%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, monday: { subject: e.value, teacher: null } })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.28%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, tuesday: { subject: e.value, teacher: null } })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.1%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, wednesday: { subject: e.value, teacher: null } })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.1%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, thursday: { subject: e.value, teacher: null } })}
                    textField={'name'}
                />
                <DropDownList
                    style={{ width: '14.28%' }}
                    data={subjects}
                    onChange={(e) => setTimetableRow({ ...timetableRow, friday: { subject: e.value, teacher: null } })}
                    textField={'name'}
                />
            </div>
            <div style={{ display: 'flex', width: '100%', marginBottom: 30 }}>
                <Input
                    style={{ width: '14.28%', visibility: 'hidden' }}
                    onChange={(e) => setTimetableRow({ ...timetableRow, fromHour: Number(e.value) })}
                />
                <Input
                    style={{ width: '14%', visibility: 'hidden' }}
                    onChange={(e) => setTimetableRow({ ...timetableRow, toHour: Number(e.value) })}
                />
                {timetableRow.monday?.subject && (
                    <DropDownList
                        style={{ width: '14%' }}
                        data={teachers.filter((e) => e.subjects.find((x) => x.id == timetableRow.monday?.subject?.id))}
                        value={timetableRow.monday.teacher}
                        onChange={(e) =>
                            timetableRow.monday &&
                            setTimetableRow({ ...timetableRow, monday: { subject: timetableRow.monday.subject, teacher: e.value } })
                        }
                        textField={'name'}
                    />
                )}
                {timetableRow.tuesday?.subject && (
                    <DropDownList
                        style={{ width: '14%' }}
                        data={teachers.filter((e) => e.subjects.find((x) => x.id == timetableRow.tuesday?.subject?.id))}
                        value={timetableRow.tuesday.teacher}
                        onChange={(e) =>
                            timetableRow.tuesday &&
                            setTimetableRow({ ...timetableRow, tuesday: { subject: timetableRow.tuesday.subject, teacher: e.value } })
                        }
                        textField={'name'}
                    />
                )}
                {timetableRow.wednesday?.subject && (
                    <DropDownList
                        style={{ width: '14%' }}
                        data={teachers.filter((e) => e.subjects.find((x) => x.id == timetableRow.wednesday?.subject?.id))}
                        value={timetableRow.wednesday.teacher}
                        onChange={(e) =>
                            timetableRow.wednesday &&
                            setTimetableRow({ ...timetableRow, wednesday: { subject: timetableRow.wednesday.subject, teacher: e.value } })
                        }
                        textField={'name'}
                    />
                )}
                {timetableRow.thursday?.subject && (
                    <DropDownList
                        style={{ width: '14%' }}
                        data={teachers.filter((e) => e.subjects.find((x) => x.id == timetableRow.thursday?.subject?.id))}
                        value={timetableRow.thursday.teacher}
                        onChange={(e) =>
                            timetableRow.thursday &&
                            setTimetableRow({ ...timetableRow, thursday: { subject: timetableRow.thursday.subject, teacher: e.value } })
                        }
                        textField={'name'}
                    />
                )}
                {timetableRow.friday?.subject && (
                    <DropDownList
                        style={{ width: '14%' }}
                        data={teachers.filter((e) => e.subjects.find((x) => x.id == timetableRow.friday?.subject?.id))}
                        value={timetableRow.friday.teacher}
                        onChange={(e) =>
                            timetableRow.friday &&
                            setTimetableRow({ ...timetableRow, friday: { subject: timetableRow.friday.subject, teacher: e.value } })
                        }
                        textField={'name'}
                    />
                )}
            </div>
            <Button
                style={{ marginLeft: '90%', marginBottom: 30 }}
                onClick={() => setTimetableRowsState([...timetableRowsState, { ...timetableRow, id: timetableRowsState.length + 1 }])}
            >
                Add
            </Button>
            <Grid data={timetableRowsState}>
                <GridColumn field="fromHour" />
                <GridColumn field="toHour" />
                <GridColumn field="monday" cell={timetableCell} />
                <GridColumn field="tuesday" cell={timetableCell} />
                <GridColumn field="wednesday" cell={timetableCell} />
                <GridColumn field="thursday" cell={timetableCell} />
                <GridColumn field="friday" cell={timetableCell} />
                <GridColumn width={30} cell={deleteCell} />
            </Grid>

            <Button onClick={() => onSaveToDatabase()}>Save to database</Button>
        </>
    );
};

export default TimetableBuilder;
