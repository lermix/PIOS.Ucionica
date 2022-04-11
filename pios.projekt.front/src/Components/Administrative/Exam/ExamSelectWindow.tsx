/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridColumn, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Window } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { SchoolClass } from '../../../Models/SchoolClass';
import { AppState } from '../../../Stores/rootReducer';
import { useSelector } from 'react-redux';
import { Exam } from '../../../Models/Exam';

interface IProps {
    onClose: () => void;
    setState: Dispatch<SetStateAction<Exam>>;
}

interface IStateProps {
    exams: Exam[];
}

const ExamSelectWindow: React.FC<IProps> = ({ onClose, setState }) => {
    const { exams } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            exams: state.classroom.exams,
        };
    });

    const [selected, setSelected] = useState<Exam>();

    const rowRender = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps) => {
        const isSelected = rowProps.dataItem.id === selected?.id;
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    return (
        <>
            <Window onClose={() => onClose()} width={600}>
                <Grid data={exams} style={{ width: '100%', height: '90' }} onRowClick={(e) => setSelected(e.dataItem)} rowRender={rowRender}>
                    <GridColumn field="id" />
                    <GridColumn field="name" />
                    <GridColumn title="Teacher" field="teacher.surname" />
                    <GridColumn title="Subject" field="subject.name" />
                </Grid>
                <Button
                    onClick={() => {
                        if (selected) {
                            setState(selected);
                            onClose();
                        }
                    }}
                >
                    OK
                </Button>
            </Window>
        </>
    );
};

export default ExamSelectWindow;
