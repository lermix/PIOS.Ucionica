/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Stores/rootReducer';
import { Splitter, SplitterOnChangeEvent } from '@progress/kendo-react-layout/dist/npm/splitter/Splitter';
import { Input } from '@progress/kendo-react-inputs';
import { Teacher, TeacherClass } from '../../../Models/Teacher';
import { Button } from '@progress/kendo-react-buttons';
import { Student, StudentClass } from '../../../Models/Student';
import { SplitterPaneProps } from '@progress/kendo-react-layout/dist/npm/splitter/SplitterPane';
import { addOrUpdateClassroom, addOrUpdateStudent, addOrUpdateSubject, addOrUpdateTeacher } from '../../../Stores/Classroom/actions';
import { Subject, SubjectClass } from '../../../Models/Subject';
import { SchoolClass, SchoolClassClass } from '../../../Models/SchoolClass';
import ManagamentWindow from './ManagamentWindow';
import TeacherEditor from './TeacherEditor';
import StudentEditor from './StudentEditor';
import SubjectEditor from './SubjectEditor';
import ClassroomEditor from './ClassroomEditor';
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from '@progress/kendo-react-layout';

interface IStateProps {
    translate: TranslateFunction;
    students: Student[];
    teachers: Teacher[];
    subjects: Subject[];
    classrooms: SchoolClass[];
}

const Managament: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, students, teachers, subjects, classrooms } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            students: state.classroom.students,
            teachers: state.classroom.teachers,
            subjects: state.classroom.subjects,
            classrooms: state.classroom.classrooms,
        };
    });

    const [windowVisible, setWindowVisible] = useState<boolean>(false);
    const [fill, setFill] = useState(() => (data: any[]) => console.error('Fill func not set'));
    const [windowData, setWindowData] = useState<any[]>([]);
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '50%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '50%', min: '20px', collapsible: false, resizable: false },
    ]);
    const [selected, setSelected] = React.useState<number>(1);

    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected);
    };

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    const OpenSelect = (list: Student[] | Subject[], func: (data: any[]) => void) => {
        setWindowData(list);
        setFill(() => func);
        setWindowVisible(true);
    };

    return (
        <>
            {windowVisible && <ManagamentWindow items={windowData} WidnowVisible={setWindowVisible} fillFunc={fill} />}
            <TabStrip selected={selected} onSelect={handleSelect}>
                <TabStripTab title="Teachers">
                    <TeacherEditor OpenSelect={OpenSelect} />
                </TabStripTab>
                <TabStripTab title="Students">
                    <StudentEditor OpenSelect={OpenSelect} />
                </TabStripTab>
                <TabStripTab title="Subjects">
                    <SubjectEditor OpenSelect={OpenSelect} />
                </TabStripTab>
                <TabStripTab title="Classroms">
                    <ClassroomEditor OpenSelect={OpenSelect} />
                </TabStripTab>
            </TabStrip>
            {/* <Splitter panes={panes} orientation={'vertical'}>
                <Splitter panes={panes} onChange={onChange}>
                    <div className="pane-content" style={{ marginLeft: 15 }}></div>
                    <div className="pane-content" style={{ marginLeft: 15 }}></div>
                </Splitter>
                <Splitter panes={panes} onChange={onChange}>
                    <div className="pane-content" style={{ marginLeft: 15 }}></div>
                    <div className="pane-content" style={{ marginLeft: 15 }}></div>
                </Splitter>
            </Splitter> */}
        </>
    );
};

export default Managament;
