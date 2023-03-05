import React, {FC, useMemo} from 'react';
import classes from './Field.module.scss';
import {MemoizedCell} from '../Cell/Cell';
import {useAppSelector} from '../../hooks/reduxHooks';

const Field: FC = () => {
    const {size, cells, mask} = useAppSelector((state) => state.field);
    const dimension = useMemo(() => new Array(size).fill(null), []);
    return (
        <div className={classes.wrapper}>
            {dimension.map((_, y) => {
                return (
                    <div className={classes.row} key={y}>
                        {dimension.map((_, x) => (
                            <MemoizedCell
                                key={`${y}${x}`}
                                value={cells[y * size + x]}
                                maskValue={mask[y * size + x]}
                                x={x}
                                y={y}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Field;
