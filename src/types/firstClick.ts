export interface IFirstClick {
    state: boolean;
    cell: {x: number; y: number} | null;
    timeStart: number | null;
}
