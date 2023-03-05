import {cellValue} from './cell';

export interface IFirstClick {
    state: boolean;
    cell: {x: number; y: number} | null;
    timeStart: Date | null
}
