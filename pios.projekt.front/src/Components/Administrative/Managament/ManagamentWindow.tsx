/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridColumn, GridRowClickEvent, GridRowProps } from '@progress/kendo-react-grid';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Student } from '../../../Models/Student';

import { Subject } from '../../../Models/Subject';
import { Window } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

interface IProps {
    items: Student[] | Subject[];
    WidnowVisible: Dispatch<SetStateAction<boolean>>;
    fillFunc: (data: any[]) => void;
}

const ManagamentWindow: React.FC<IProps> = ({ items, WidnowVisible, fillFunc }) => {
    const [selected, setSelected] = useState<any[]>([]);

    const onRowClick = (event: GridRowClickEvent) => {
        if (selected.find((e) => e === event.dataItem)) setSelected(selected.filter((e) => e !== event.dataItem));
        else setSelected([...selected, event.dataItem]);
    };

    const rowRender = (row: React.ReactElement<HTMLTableRowElement>, rowProps: GridRowProps) => {
        const isSelected = selected.includes(rowProps.dataItem);
        const gray = { backgroundColor: 'lightBlue' };
        const trProps: any = { style: isSelected ? gray : {} };
        return React.cloneElement(row, { ...trProps }, row.props.children);
    };

    return (
        <>
            <Window
                onClose={() => {
                    WidnowVisible(false);
                }}
            >
                <Grid data={items} onRowClick={onRowClick} rowRender={rowRender}>
                    {'id' in items && <GridColumn field="id" />}
                    {'name' in items && <GridColumn field="name" />}
                    {'surname' in items && <GridColumn field="surname" />}
                </Grid>
                <Button
                    onClick={() => {
                        fillFunc(selected);
                        WidnowVisible(false);
                    }}
                >
                    OK
                </Button>
            </Window>
        </>
    );
};

export default ManagamentWindow;
