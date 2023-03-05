import React, {FC} from 'react';
import classes from './NumberDisplay.module.scss';

interface NumberDisplayProps {
    value: number;
}

const NumberDisplay: FC<NumberDisplayProps> = ({value}) => {
    let tempValue: string[] = (''+value).split('')
    if(value > 999) {
        tempValue = ['9','9','9']
    }
    return (
        <div className={classes.wrapper}>
            <img draggable={false} src={`./images/timer/${tempValue[tempValue.length-3] ?? '0'}.gif`} alt="first"/>
            <img draggable={false} src={`./images/timer/${tempValue[tempValue.length-2] ?? '0'}.gif`} alt="second"/>
            <img draggable={false} src={`./images/timer/${tempValue[tempValue.length-1] ?? '0'}.gif`} alt="third"/>
        </div>
    );
};

export default NumberDisplay;
