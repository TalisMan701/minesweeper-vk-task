import React, {useEffect} from 'react';
import classes from './Game.module.scss';
import {Mine} from '../../constants';
import {Mask} from '../../types/mine';
import {cellValue} from '../../types/cell';
import Field from '../../components/Field/Field';
import Header from '../Header/Header';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {fieldSlice} from '../../store/reducers/FieldReducer/FieldSlice';
import {gameSlice} from '../../store/reducers/GameReducer/GameSlice';

const Game = () => {
    const {firstClick, win} = useAppSelector(state => state.game)
    const {cells, mask} = useAppSelector(state => state.field)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        let tempWin: boolean;
        if(firstClick.state){
            tempWin = !cells.some(
                (cellValue: cellValue, index) =>
                    (cellValue === Mine && mask[index] !== Mask.Flag) || mask[index] === Mask.Fill,
            ) && firstClick.state
            if(win !== tempWin){
                dispatch(gameSlice.actions.setWin(tempWin))
            }
        }
    }, [cells, mask])

    useEffect(() => {
        if (firstClick.state && firstClick.cell) {
            dispatch(fieldSlice.actions.clickNoMine({x: firstClick.cell.x, y: firstClick.cell.y}))
        }
    }, [firstClick.state]);

    return (
        <div className={classes.wrapper}>
            <Header/>
            <Field/>
        </div>
    );
}

export default Game;
