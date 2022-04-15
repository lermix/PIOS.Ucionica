import { Grid, GridColumn, GridRowProps } from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSameDate } from '../Helper/DateAnalyzer';
import { Exam } from '../Models/Exam';
import { VerifiedUser } from '../Models/User';
import { AppState } from '../Stores/rootReducer';
import ExamViewer from './Administrative/Exam/ExamViewer';

interface IStateProps {
    verifiedUser: VerifiedUser;
    exams: Exam[];
}

const ExamSolving: React.FC = () => {
    const dispatch = useDispatch();
    const { verifiedUser, exams } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            verifiedUser: state.security.verifiedUser,
            exams: state.classroom.exams,
        };
    });

    const [exam, setExam] = useState<Exam | null>(null);
    const [examAvaliable, setExamAvaliable] = useState(false);

    useEffect(() => {
        setExamAvaliable(
            exams.filter((e) => e.students.find((s) => s.id === verifiedUser.id) && isSameDate(new Date(e.date), new Date())).length > 0,
        );
    }, [exam, verifiedUser, exams]);

    const rowRender = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps) => {
        const isSelected = rowProps.dataItem.id === exam?.id;
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    return (
        <>
            {examAvaliable && (
                <Grid
                    data={exams.filter((e) => e.students.find((s) => s.id === verifiedUser.id) && isSameDate(new Date(e.date), new Date()))}
                    style={{ width: '100%', height: '90' }}
                    onRowClick={(e) => setExam(e.dataItem)}
                    rowRender={rowRender}
                >
                    <GridColumn field="name" />
                    <GridColumn field="subject.name" />
                </Grid>
            )}
            {!examAvaliable && <h1 style={{ textAlign: 'center' }}>No exams today</h1>}

            {exam && <ExamViewer exam={exam} isEditing={false} />}
        </>
    );
};

export default ExamSolving;
