import {COUNT_MINES, Mine} from '../constants';
import {cellValue} from '../types/cell';

export function generateCells(_x: number, _y: number, size: number, countMines: number): cellValue[] {
    const cells: cellValue[] = new Array(size * size).fill(0);

    function inc(x: number, y: number) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
            if (cells[y * size + x] === Mine) return;
            cells[y * size + x]++;
        }
    }

    for (let currentCountMines = 0; currentCountMines < countMines; ) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (cells[y * size + x] === Mine || y * size + x === _y * size + _x) continue;

        cells[y * size + x] = Mine;

        currentCountMines++;

        inc(x + 1, y);
        inc(x - 1, y);
        inc(x, y + 1);
        inc(x, y - 1);
        inc(x + 1, y + 1);
        inc(x + 1, y - 1);
        inc(x - 1, y + 1);
        inc(x - 1, y - 1);
    }
    return cells;
}
