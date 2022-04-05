import React from 'react';
import { GridCellProps } from '@progress/kendo-react-grid';

export const DeleteCell = (cellProps: GridCellProps, onClick: (dataItem: any) => void) => {
    return (
        <td onClick={() => onClick(cellProps.dataItem)}>
            <span className="k-icon k-i-delete" />
        </td>
    );
};
