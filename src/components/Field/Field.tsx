import React, {FC, useEffect, useMemo} from 'react';
import classes from './Field.module.scss';
import {cellValue} from '../../types/cell';
import {Mask} from '../../types/mine';
import {generateUEID} from '../../utils/generateUEID';
import {MemoizedCell} from '../Cell/Cell';

interface IField {
    cells: cellValue[];
    mask: Mask[];
    size: number;
    onClickCell: (e: React.MouseEvent<HTMLDivElement>, _x: number, _y: number) => void;
    onContextMenuCell: (e: React.MouseEvent<HTMLDivElement>, _x: number, _y: number) => void;
}

const Field: FC<IField> = ({cells, mask, size, onClickCell, onContextMenuCell}) => {
    const dimension = useMemo(() => new Array(size).fill(null), [])
    return (
        <div className={classes.wrapper}>
            {dimension.map((_, y) => {
                return (
                    <div className={classes.row} key={generateUEID()}>
                        {dimension.map((_, x) => (
                            <MemoizedCell
                                key={generateUEID()}
                                onClick={(e)=>onClickCell(e, x, y)}
                                onContextMenu={(e)=>onContextMenuCell(e, x, y)}
                                value={cells[y * size + x]}
                                mask={mask[y * size + x]}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Field;
