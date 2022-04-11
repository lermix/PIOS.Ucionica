/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { Splitter, SplitterOnChangeEvent, SplitterPaneProps, TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { Exam, ExamClass } from '../../../Models/Exam';
import { Question, QuestionClass } from '../../../Models/Question';
import { SchoolClass } from '../../../Models/SchoolClass';
import { Subject } from '../../../Models/Subject';
import { Teacher } from '../../../Models/Teacher';
import { addOrUpdateClassroom } from '../../../Stores/Classroom/actions';
import { AppState } from '../../../Stores/rootReducer';
import ClassSelectWindow from '../ClassSelectWindow';
import CreateExam from './CreateExam';
import CreateQuestion from './CreateQuestion';
import ExamSelectWindow from './ExamSelectWindow';
import ExamViewer from './ExamViewer';

interface IStateProps {
    translate: TranslateFunction;
    subjects: Subject[];
    teachers: Teacher[];
}

const ExamBuilder: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, subjects, teachers } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            subjects: state.classroom.subjects,
            teachers: state.classroom.teachers,
        };
    });

    const [selectedExam, setSelectedExam] = useState<Exam>(new ExamClass());
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const [examSelectWindow, setExamSelectWindow] = useState<boolean>(false);
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '30%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '70%', min: '20px', collapsible: false, resizable: false },
    ]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    return (
        <>
            {examSelectWindow && <ExamSelectWindow onClose={() => setExamSelectWindow(false)} setState={setSelectedExam} />}
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <TabStrip selected={selectedTab} onSelect={(e) => setSelectedTab(e.selected)}>
                        <TabStripTab title="Exams">
                            <CreateExam />
                        </TabStripTab>
                        <TabStripTab title="Questions">
                            <CreateQuestion />
                        </TabStripTab>
                    </TabStrip>
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <h2>Preview</h2>
                    <ExamViewer exam={selectedExam} />
                </div>
            </Splitter>
        </>
    );
};

export default ExamBuilder;
