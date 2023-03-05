import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cellValue} from '../../../types/cell';
import {Mask} from '../../../types/mine';
import {COUNT_MINES, INITIAL_SIZE, Mine} from '../../../constants';
import {generateCells} from '../../../utils/generateCells';

interface FieldState {
    size: number;
    countMines: number;
    cells: cellValue[];
    mask: Mask[];
    countSelectedMines: number;
}

const initialState: FieldState = {
    size: INITIAL_SIZE,
    countMines: COUNT_MINES,
    cells: new Array(INITIAL_SIZE * INITIAL_SIZE).fill(0),
    mask: new Array(INITIAL_SIZE * INITIAL_SIZE).fill(Mask.Fill),
    countSelectedMines: 0,
};

export const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setSize(state, action: PayloadAction<number>) {
            state.size = action.payload;
        },
        setCountMines(state, action: PayloadAction<number>) {
            state.countMines = action.payload;
        },
        setCountSelectedMines(state, action: PayloadAction<number>) {
            state.countSelectedMines = action.payload;
        },
        incCountSelectedMines(state) {
            state.countSelectedMines = state.countSelectedMines + 1;
        },
        decCountSelectedMines(state) {
            state.countSelectedMines = state.countSelectedMines - 1;
        },
        setCells(state, action: PayloadAction<cellValue[]>) {
            state.cells = action.payload;
        },
        setMask(state, action: PayloadAction<Mask[]>) {
            state.mask = action.payload;
        },
        clickMine(state, action: PayloadAction<{x: number; y: number}>) {
            state.cells.forEach((cellValue, index) => {
                if (
                    cellValue === Mine &&
                    state.mask[index] !== Mask.Flag &&
                    index !== action.payload.y * state.size + action.payload.x
                )
                    state.mask[index] = Mask.Transparent;
                if (cellValue !== Mine && state.mask[index] === Mask.Flag)
                    state.mask[index] = Mask.FailFlag;
            });
            state.mask[action.payload.y * state.size + action.payload.x] = Mask.MineActivated;
        },
        clickNoMine(state, action: PayloadAction<{x: number; y: number}>) {
            const clearing: [number, number][] = [];
            function clear(x: number, y: number) {
                if (x >= 0 && x < state.size && y >= 0 && y < state.size) {
                    if (state.mask[y * state.size + x] === Mask.Transparent) return;
                    clearing.push([x, y]);
                }
            }
            clear(action.payload.x, action.payload.y);
            while (clearing.length) {
                const [x, y] = clearing.pop()!;

                state.mask[y * state.size + x] = Mask.Transparent;

                if (state.cells[y * state.size + x] !== 0) continue;

                clear(x + 1, y);
                clear(x - 1, y);
                clear(x, y + 1);
                clear(x, y - 1);
                clear(x + 1, y + 1);
                clear(x + 1, y - 1);
                clear(x - 1, y + 1);
                clear(x - 1, y - 1);
            }
        },
        updateMaskItem(state, action: PayloadAction<{x: number; y: number; maskValue: Mask}>) {
            state.mask[action.payload.y * state.size + action.payload.x] = action.payload.maskValue;
        },
        resetField(state) {
            state.cells = initialState.cells;
            state.mask = initialState.mask;
            state.countSelectedMines = initialState.countSelectedMines;
        },
        generateCells(state, action: PayloadAction<{x: number; y: number}>) {
            state.cells = generateCells(
                action.payload.x,
                action.payload.y,
                state.size,
                state.countMines,
            );
        },
    },
});

export default fieldSlice.reducer;
