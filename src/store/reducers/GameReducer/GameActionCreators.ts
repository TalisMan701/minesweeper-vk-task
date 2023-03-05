import {AppDispatch} from '../../redux-store';
import {fieldSlice} from '../FieldReducer/FieldSlice';
import {gameSlice} from './GameSlice';

export const restartGame = () => (dispatch: AppDispatch) => {
    dispatch(fieldSlice.actions.resetField())
    dispatch(gameSlice.actions.resetGame())
}