import React, {useEffect, useMemo, useState} from 'react';
import classes from './Game.module.scss';
import {COUNT_MINES, INITIAL_SIZE, Mine} from '../../constants';
import {generateCells} from '../../utils/generateCells';
import {Mask} from '../../types/mine';
import {cellValue} from '../../types/cell';
import Field from '../../components/Field/Field';
import {IFirstClick} from '../../types/firstClick';
import Header from '../Header/Header';

const Game = () => {
    const [size, setSize] = useState<number>(INITIAL_SIZE);
    const [countMines, setCountMines] = useState<number>(COUNT_MINES);

    const [firstClick, setFirstClick] = useState<IFirstClick>({state: false, cell: null, timeStart: null});

    const [cells, setCells] = useState<cellValue[]>(new Array(size * size).fill(0));
    const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.Fill));

    const [death, setDeath] = useState(false);

    const [countSelectedMines, setCountSelectedMines] = useState<number>(0)

    const win = useMemo(() => {
        return (
            !cells.some(
                (cellValue: cellValue, index) =>
                    (cellValue === Mine && mask[index] !== Mask.Flag) || mask[index] === Mask.Fill,
            ) && firstClick.state
        );
    }, [cells, mask]);

    const handleClickCell = (x: number, y: number) => {
        if (mask[y * size + x] !== Mask.Fill) return;
        if (cells[y * size + x] === Mine) {
            setMask((prev) => {
                const tempMask = {...prev};
                cells.forEach((cellValue, index) => {
                    if (cellValue === Mine && tempMask[index] !== Mask.Flag && index !== y * size + x)
                        tempMask[index] = Mask.Transparent;
                    if(cellValue !== Mine && tempMask[index] === Mask.Flag)
                        tempMask[index] = Mask.FailFlag
                });
                tempMask[y * size + x] = Mask.MineActivated;
                return tempMask;
            });
            setDeath(true);
            return;
        }
        setMask((prev) => {
            const tempMask = {...prev};
            const clearing: [number, number][] = [];

            function clear(x: number, y: number) {
                if (x >= 0 && x < size && y >= 0 && y < size) {
                    if (tempMask[y * size + x] === Mask.Transparent) return;
                    clearing.push([x, y]);
                }
            }

            clear(x, y);
            while (clearing.length) {
                const [x, y] = clearing.pop()!;

                tempMask[y * size + x] = Mask.Transparent;

                if (cells[y * size + x] !== 0) continue;

                clear(x + 1, y);
                clear(x - 1, y);
                clear(x, y + 1);
                clear(x, y - 1);
                clear(x + 1, y + 1);
                clear(x + 1, y - 1);
                clear(x - 1, y + 1);
                clear(x - 1, y - 1);
            }
            return tempMask;
        });
    };

    const updateMaskItem = (_x: number, _y: number, _state: Mask) => {
        setMask((prev) => {
            const tempMask = {...prev};
            tempMask[_y * size + _x] = _state;
            return tempMask;
        });
    };

    const handleContextClickCell = (x: number, y: number) => {
        switch (mask[y * size + x]) {
            case Mask.Transparent:
                break;
            case Mask.Fill: {
                updateMaskItem(x, y, Mask.Flag);
                setCountSelectedMines(prev => prev+1)
                break;
            }
            case Mask.Flag: {
                updateMaskItem(x, y, Mask.Question);
                setCountSelectedMines(prev => prev-1)
                break;
            }
            case Mask.Question: {
                updateMaskItem(x, y, Mask.Fill);
                break;
            }
        }
    };

    const restartGame = () => {
        setMask(() => new Array(size * size).fill(Mask.Fill))
        setDeath(false)
        setCells(new Array(size * size).fill(0))
        setFirstClick({state: false, cell: null, timeStart: null})
    }

    useEffect(() => {
        if (firstClick.state && firstClick.cell) {
            handleClickCell(firstClick.cell.x, firstClick.cell.y);
        }
    }, [firstClick]);

    return (
        <div className={classes.wrapper}>
            <Header win={win} death={death} restartGame={restartGame} countSelectedMines={countSelectedMines} countMines={countMines} timeStart={firstClick.timeStart}/>
            <Field
                cells={cells}
                mask={mask}
                size={size}
                onClickCell={(e, x, y) => {
                    if (win || death) return;
                    if (!firstClick.state) {
                        setCells(generateCells(x, y, size, countMines));
                        setFirstClick({state: true, cell: {x, y}, timeStart: new Date()});
                    } else {
                        handleClickCell(x, y);
                    }
                }}
                onContextMenuCell={(e, x, y) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (win || death) return;
                    if (!firstClick.state) return;
                    handleContextClickCell(x, y);
                }}
            />
        </div>
    );
}

export default Game;
