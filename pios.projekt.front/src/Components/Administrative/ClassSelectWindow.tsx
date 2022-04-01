/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Student } from '../../Models/Student';

import { Subject } from '../../Models/Subject';
import { Window } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { SchoolClass, SchoolClassClass } from '../../Models/SchoolClass';
import { AppState } from '../../Stores/rootReducer';
import { useSelector } from 'react-redux';

interface IProps {
    onClose: () => void;
    setState: Dispatch<SetStateAction<SchoolClass | null>>;
}

interface IStateProps {
    classrooms: SchoolClass[];
}

const ManagamentWindow: React.FC<IProps> = ({ onClose, setState }) => {
    const { classrooms } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            classrooms: state.classroom.classrooms,
        };
    });

    const [selected, setSelected] = useState<SchoolClass>();

    const rowRender = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps) => {
        const isSelected = rowProps.dataItem.id === selected?.id;
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    return (
        <>
            <Window onClose={() => onClose()}>
                <Grid data={classrooms} style={{ width: '100%', height: '90' }} onRowClick={(e) => setSelected(e.dataItem)} rowRender={rowRender}>
                    <GridColumn field="name" />
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

export default ManagamentWindow;
