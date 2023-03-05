import React, {FC, useEffect, useRef, useState} from 'react';
import classes from './Header.module.scss';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import SmileButton from '../SmileButton/SmileButton';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {restartGame} from '../../store/reducers/GameReducer/GameActionCreators';

const Header: FC = () => {
    const {firstClick, win, death} = useAppSelector((state) => state.game);
    const {countMines, countSelectedMines} = useAppSelector((state) => state.field);
    const dispatch = useAppDispatch();
    const [countSecondInGame, setCountSecondInGame] = useState<number>(0);
    const timer = useRef<number>();
    useEffect(() => {
        if (firstClick.timeStart) {
            timer.current = setInterval(() => {
                setCountSecondInGame(
                    Math.round((Date.now() - (firstClick.timeStart as number)) / 1000),
                );
            }, 1000);
        }
        return () => {
            setCountSecondInGame(0);
            clearInterval(timer.current);
        };
    }, [firstClick.timeStart]);

    useEffect(() => {
        if (win || death) clearInterval(timer.current);
    }, [win, death]);

    return (
        <div className={classes.wrapper}>
            <NumberDisplay
                value={countMines - countSelectedMines >= 0 ? countMines - countSelectedMines : 0}
            />
            <SmileButton win={win} death={death} restartGame={() => dispatch(restartGame())} />
            <NumberDisplay
                value={firstClick.timeStart ? (countSecondInGame >= 0 ? countSecondInGame : 0) : 0}
            />
        </div>
    );
};

export default Header;
