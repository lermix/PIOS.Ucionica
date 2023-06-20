/* eslint-disable react/react-in-jsx-scope */
import { Grid, GridCellProps, GridColumn } from '@progress/kendo-react-grid';
import { useSelector } from 'react-redux';
import { Exam } from '../Models/Exam';
import { ExamResult } from '../Models/ExamResult';
import { Student, StudentClass } from '../Models/Student';
import { Teacher } from '../Models/Teacher';
import { VerifiedUser } from '../Models/User';
import { AppState } from '../Stores/rootReducer';

interface IStateProps {
    examResults: ExamResult[];
    exams: Exam[];
    teachers: Teacher[];
    verifiedUser: VerifiedUser;
    students: Student[];
}

const ExamResults: React.FC = () => {
    const { examResults, exams, verifiedUser, teachers, students } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            verifiedUser: state.security.verifiedUser,
            examResults: state.classroom.examResults,
            exams: state.classroom.exams,
            teachers: state.classroom.teachers,
            students: state.classroom.students,
        };
    });

    const examSubjectCell = (cellProps: GridCellProps) => {
        return <td>{exams.find((e) => e.id === cellProps.dataItem.examId)?.subject.name}</td>;
    };

    const examTotalCell = (cellProps: GridCellProps) => {
        return <td>{exams.find((e) => e.id === cellProps.dataItem.examId)?.questions.length}</td>;
    };

    const examStudentCell = (cellProps: GridCellProps) => {
        const student = students.find((s) => s.id === cellProps.dataItem.studentId);
        return <td>{student?.name + ' ' + student?.surname}</td>;
    };

    const examDateCell = (cellProps: GridCellProps) => {
        const exam = exams.find((s) => s.id === cellProps.dataItem.examId);
        if (exam?.date)
            return (
                <td>
                    {new Date(exam.date).getDate()}.{new Date(exam.date).getMonth() + 1}.{new Date(exam.date).getFullYear()}
                </td>
            );
        else return <td>Nema datuma</td>;
    };

    return (
        <>
            <h4 style={{ fontWeight: 'bold' }}>Rezultati</h4>
            {verifiedUser.roles?.includes('Student') && (
                <Grid data={examResults.filter((e) => e.studentId === verifiedUser.id)}>
                    <GridColumn title="Subject" cell={examSubjectCell} />
                    <GridColumn title="Correct" field="numOfCorrectAnswers" />
                    <GridColumn title="Total" cell={examTotalCell} />
                    <GridColumn title="Date" cell={examDateCell} />
                </Grid>
            )}
            {verifiedUser.roles?.includes('Teacher') && (
                <Grid
                    data={examResults.filter((e) =>
                        exams
                            .filter((ex) =>
                                teachers
                                    .find((t) => t.id == verifiedUser.id)
                                    ?.subjects.map((s) => s.id)
                                    .includes(ex.subject.id),
                            )
                            .map((ex) => ex.id)
                            .includes(e.examId),
                    )}
                >
                    <GridColumn title="Subject" cell={examSubjectCell} />
                    <GridColumn title="Correct" field="numOfCorrectAnswers" />
                    <GridColumn title="Total" cell={examTotalCell} />
                    <GridColumn title="Student" cell={examStudentCell} />
                </Grid>
            )}
        </>
    );
};

export default ExamResults;
