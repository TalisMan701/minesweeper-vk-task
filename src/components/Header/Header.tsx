import React, {FC, useEffect, useRef, useState} from 'react';
import classes from './Header.module.scss';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import SmileButton from '../SmileButton/SmileButton';

interface HeaderProps {
    win: boolean,
    death: boolean,
    restartGame: () => void,
    countSelectedMines: number,
    countMines: number,
    timeStart: Date | null
}

const Header: FC<HeaderProps> = ({win, death, restartGame, countSelectedMines, countMines, timeStart}) => {
    const [countSecondInGame, setCountSecondInGame] = useState<number>(0)
    const timer = useRef<number>()
    useEffect(()=>{
        if(timeStart){
            timer.current = setInterval(()=>{
                const now = new Date();
                setCountSecondInGame(Math.round((now.getTime() - timeStart.getTime())/1000))
            },1000)
        }
        return () => {
            setCountSecondInGame(0)
            clearInterval(timer.current)
        }
    }, [timeStart])

    useEffect(()=>{
        if(win || death) clearInterval(timer.current)
    }, [win, death])

    return (
        <div className={classes.wrapper}>
            <NumberDisplay value={countMines-countSelectedMines >= 0 ? countMines-countSelectedMines: 0}/>
            <SmileButton win={win} death={death} restartGame={restartGame}/>
            <NumberDisplay value={timeStart ? countSecondInGame >= 0 ? countSecondInGame : 0 : 0}/>
        </div>
    );
};

export default Header;