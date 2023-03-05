import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import classes from './Cell.module.scss';
import {mapMaskToImageName, Mask} from '../../types/mine';
import {cellValue} from '../../types/cell';
import {Mine} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {clickCell, clickContextCell, firstClickCell,} from '../../store/reducers/FieldReducer/FieldActionCreators';

interface CellProps {
    value: cellValue;
    maskValue: Mask;
    x: number;
    y: number;
}

const Cell: FC<CellProps> = ({value, maskValue, x, y}) => {
    const {win, death, firstClick} = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState<boolean>(false);
    const imageName = useMemo(
        () =>
            maskValue !== Mask.Transparent
                ? maskValue === Mask.Fill && active
                    ? '0'
                    : mapMaskToImageName[maskValue]
                : value === Mine
                ? 'mine'
                : value,
        [maskValue, value, active],
    );
    useEffect(() => {
        console.log(active);
    });
    useEffect(()=> {
        const handleMouseUp = (): void => {
            setActive(false);
        };
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
        }
    },[])
    return (
        <div
            className={classes.cell}
            onClick={() => {
                if (win || death) return;
                if (!firstClick.state) {
                    dispatch(firstClickCell(x, y));
                } else {
                    dispatch(clickCell(x, y, maskValue, value));
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (win || death) return;
                if (!firstClick.state) return;
                dispatch(clickContextCell(x, y, maskValue));
            }}
            onMouseDown={(e) => {
                if (e.button === 0 && maskValue === Mask.Fill && !win && !death) {
                    setActive(true);
                }
            }}
        >
            <img
                draggable={false}
                className={classes.img}
                src={`./images/cell/${imageName}.gif`}
                alt='cell'
            />
        </div>
    );
};

export const MemoizedCell = React.memo(Cell, (prevProps, nextProps) => {
    return prevProps.maskValue === nextProps.maskValue && prevProps.value === nextProps.value;
});
