import React, {FC, useEffect, useState} from 'react';
import classes from './SmileButton.module.scss';

interface SmileButtonProps {
    win: boolean,
    death: boolean,
    restartGame: () => void
}

const SmileButton: FC<SmileButtonProps> = ({win, death, restartGame}) => {
    const [active, setActive] = useState<boolean>(false);
    const [clickedOutside, setClikedOutside] = useState<boolean>(false)
    const imageName = death ? 'death': win ? 'win' : active ? 'initialActive' : clickedOutside ? 'click' : 'initial';

    useEffect(()=>{
        const handleMouseDown = (): void => {
            setClikedOutside(true)
        }
        const handleMouseUp = (): void => {
            setClikedOutside(false)
        }
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <div onClick={restartGame} className={classes.btn} onMouseDown={()=>setActive(true)} onMouseUp={()=>setActive(false)}>
            <img draggable={false} src={`./images/smiles/${imageName}.gif`} alt="smile"/>
        </div>
    );
};

export default SmileButton;