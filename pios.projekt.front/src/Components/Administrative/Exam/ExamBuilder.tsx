/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridCellProps, GridColumn, GridRowProps } from '@progress/kendo-react-grid';
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
import { addOrUpdateClassroom, DeleteQuestion } from '../../../Stores/Classroom/actions';
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
    questions: Question[];
}

const ExamBuilder: React.FC = () => {
    const dispatch = useDispatch();
    const { translate, subjects, teachers, questions } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
            subjects: state.classroom.subjects,
            teachers: state.classroom.teachers,
            questions: state.classroom.question,
        };
    });

    const [selectedExam, setSelectedExam] = useState<Exam>(new ExamClass());
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const [seletcedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    const [examSelectWindow, setExamSelectWindow] = useState<boolean>(false);
    const [panes, setPanes] = React.useState<Array<SplitterPaneProps>>([
        { size: '30%', min: '20px', collapsible: false, resizable: false },
        {},
        { size: '70%', min: '20px', collapsible: false, resizable: false },
    ]);

    const onChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
    };

    const rowRender = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps) => {
        const isSelected = rowProps.dataItem.id === seletcedQuestion?.id;
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    const DeleteCell = (cellProps: GridCellProps) => {
        return (
            <td onClick={() => dispatch(DeleteQuestion(cellProps.dataItem.id))}>
                <span className="k-icon k-i-delete" />
            </td>
        );
    };

    return (
        <>
            <Splitter panes={panes} onChange={onChange}>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    <TabStrip selected={selectedTab} onSelect={(e) => setSelectedTab(e.selected)}>
                        <TabStripTab title="Exams">
                            <CreateExam selectExam={setSelectedExam} />
                        </TabStripTab>
                        <TabStripTab title="Questions">
                            <CreateQuestion questionFromParent={seletcedQuestion} />
                        </TabStripTab>
                    </TabStrip>
                </div>
                <div className="pane-content" style={{ marginLeft: 15 }}>
                    {selectedTab === 0 && (
                        <>
                            <h2>Preview</h2>
                            <hr />
                            <ExamViewer exam={selectedExam} isEditing={true} />
                        </>
                    )}
                    {selectedTab === 1 && (
                        <>
                            <Grid data={questions} onRowClick={(e) => setSelectedQuestion(e.dataItem)} rowRender={rowRender}>
                                <GridColumn field="name" width={100} />
                                <GridColumn field="examQuestion" />
                                <GridColumn cell={DeleteCell} width={30} />
                            </Grid>
                            <Button style={{ marginTop: 30 }} onClick={() => setSelectedQuestion(null)}>
                                Clear
                            </Button>
                        </>
                    )}
                </div>
            </Splitter>
        </>
    );
};

export default ExamBuilder;
