import {AppDispatch} from '../../redux-store';
import {Mask} from '../../../types/mine';
import {Mine} from '../../../constants';
import {cellValue} from '../../../types/cell';
import {fieldSlice} from './FieldSlice';
import {gameSlice} from '../GameReducer/GameSlice';

export const clickContextCell =
    (x: number, y: number, maskValue: Mask) => (dispatch: AppDispatch) => {
        switch (maskValue) {
            case Mask.Transparent:
                break;
            case Mask.Fill: {
                dispatch(fieldSlice.actions.updateMaskItem({x, y, maskValue: Mask.Flag}));
                dispatch(fieldSlice.actions.incCountSelectedMines());
                break;
            }
            case Mask.Flag: {
                dispatch(fieldSlice.actions.updateMaskItem({x, y, maskValue: Mask.Question}));
                dispatch(fieldSlice.actions.decCountSelectedMines());
                break;
            }
            case Mask.Question: {
                dispatch(fieldSlice.actions.updateMaskItem({x, y, maskValue: Mask.Fill}));
                break;
            }
        }
    };

export const clickCell =
    (x: number, y: number, maskValue: Mask, value: cellValue) => (dispatch: AppDispatch) => {
        if (maskValue !== Mask.Fill) return;
        if (value === Mine) {
            dispatch(fieldSlice.actions.clickMine({x, y}));
            dispatch(gameSlice.actions.setDeath(true));
        } else {
            dispatch(fieldSlice.actions.clickNoMine({x, y}));
        }
    };

export const firstClickCell = (x: number, y: number) => (dispatch: AppDispatch) => {
    dispatch(fieldSlice.actions.generateCells({x, y}));
    dispatch(gameSlice.actions.setFirstClick({state: true, cell: {x, y}, timeStart: Date.now()}));
};
