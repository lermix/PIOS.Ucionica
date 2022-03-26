/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../Stores/rootReducer';
import { TimetableInstance } from '../../Models/TimetableInstance';
import { Splitter, SplitterOnChangeEvent } from '@progress/kendo-react-layout/dist/npm/splitter/Splitter';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../Models/Teacher';
import { Button } from '@progress/kendo-react-buttons';
import { Student, StudentClass } from '../../Models/Student';
import { SplitterPaneProps } from '@progress/kendo-react-layout/dist/npm/splitter/SplitterPane';
import { addOrUpdateClassroom, addOrUpdateStudent, addOrUpdateSubject, addOrUpdateTeacher } from '../../Stores/Classroom/actions';
import { Subject, SubjectClass } from '../../Models/Subject';
import { SchoolClass, SchoolClassClass } from '../../Models/SchoolClass';
import { Window } from '@progress/kendo-react-dialogs';

interface IProps {
    items: Student[] | Subject[];
}

const Managament: React.FC<IProps> = ({ items }) => {
    return (
        <>
            <Window>
                <Grid data={items}>
                    <GridColumn field="name" />
                </Grid>
            </Window>
        </>
    );
};

export default Managament;
