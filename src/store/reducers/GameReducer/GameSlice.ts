import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFirstClick} from '../../../types/firstClick';

interface GameState {
    firstClick: IFirstClick;
    death: boolean;
    win: boolean;
}

const initialState: GameState = {
    firstClick: {state: false, cell: null, timeStart: null},
    death: false,
    win: false
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setFirstClick(state, action: PayloadAction<IFirstClick>){
            state.firstClick = action.payload
        },
        setDeath(state, action: PayloadAction<boolean>){
            state.death = action.payload
        },
        setWin(state, action: PayloadAction<boolean>){
            state.win = action.payload
        },
        resetGame(){
            return {...initialState}
        }
    }
})

export default gameSlice.reducer;