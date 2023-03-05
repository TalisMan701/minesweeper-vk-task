import React, {FC, useEffect, useMemo, useState} from 'react';
import classes from './Cell.module.scss';
import {mapMaskToImageName, Mask} from '../../types/mine';
import {cellValue} from '../../types/cell';
import {Mine} from '../../constants';

interface CellProps {
    value: cellValue,
    mask: Mask,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Cell: FC<CellProps> = ({value, mask, onClick, onContextMenu}) => {
    const [active, setActive] = useState<boolean>(false)
    const imageName = useMemo(() => mask !== Mask.Transparent ? mask === Mask.Fill && active ? '0' : mapMaskToImageName[mask] : value === Mine ? 'mine' : value,[mask, value, active])
    useEffect(()=>{
        console.log('Update cell')
    })
    return (
        <div
            className={classes.cell}
            onClick={onClick}
            onContextMenu={onContextMenu}
            onMouseDown={(e)=>{
                if(e.button === 0) {
                    setActive(true)
                }
            }}
            onMouseUp={(e)=>{
                if(e.button === 0) {
                    setActive(false)
                }
            }}
        >
            <img draggable={false} className={classes.img} src={`./images/cell/${imageName}.gif`} alt="cell"/>
        </div>
    );
};

export const MemoizedCell =  React.memo(Cell, (prevProps, nextProps) => {
    return prevProps.mask === nextProps.mask;
});