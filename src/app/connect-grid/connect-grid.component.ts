import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectGameConfig } from '../../models/connect-game-config';
import { CommonModule } from '@angular/common';

const GAME_STATUS = {
    STOP: 1,
    ONGOING: 2,
    WIN: 3,
};

class MoveResult {
    Player: number;
    WinningIndices: number[][];
    Status: number;

    constructor() {
        this.Player = -1;
        this.WinningIndices = [];
        this.Status = GAME_STATUS.ONGOING;
    }
}

@Component({
    selector: 'app-connect-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './connect-grid.component.html',
    styleUrl: './connect-grid.component.scss',
})
export class ConnectGridComponent implements OnInit {
    @Input()
    gameConfig$!: Observable<ConnectGameConfig>;
    currentPlayer = 1;

    config!: ConnectGameConfig;
    stateGrid: number[][] = [];
    UIGrid: any[] = [];

    constructor() {}

    ngOnInit() {
        this.gameConfig$.subscribe({
            next: config => {
                this.config = config;
                this.resetGrids(config.Rows, config.Cols);
            },
        });
    }

    resetGrids(rows: number, cols: number): void {
        this.stateGrid = Array(rows)
            .fill(0)
            .map(() => Array(cols).fill(0));
        this.UIGrid = Array(rows * cols).fill(0);
    }

    handleClick(idx: number): void {
        const [row, col] = this.makeMove(idx);
        // Move attempted wasn't successful
        if (row === -1) {
            return;
        }

        // update ui grid and state grid
        this.updateState(row, col);
        this.updateUI(row, col);

        let res = this.verticalCheck(row, col);
        if (res.length !== 0) {
            console.log(`Player ${this.currentPlayer} wins vertically`);
        }

        res = this.horizontalCheck(row, col);
        if (res.length !== 0) {
            console.log(`Player ${this.currentPlayer} wins horizontally`);
        }

        res = this.diagonalCheck(row, col);
        if (res.length !== 0) {
            console.log(`Player ${this.currentPlayer} wins diagonally`);
        }

        res = this.invertedDiagonalCheck(row, col);
        if (res.length !== 0) {
            console.log(
                `Player ${this.currentPlayer} wins diagonally inverted!`
            );
        }

        if (this.drawCheck()) {
            console.log(`DRAW`);
        }

        this.currentPlayer =
            (this.currentPlayer + 1) % (this.config.Players + 1);
        if (this.currentPlayer == 0) {
            this.currentPlayer = 1;
        }
    }

    makeMove(idx: number): number[] {
        let col = (idx - 1) % this.config.Cols;
        for (let row = this.stateGrid.length - 1; row >= 0; row--) {
            if (this.stateGrid[row][col] == 0) {
                return [row, col];
            }
        }
        return [-1, -1];
    }

    updateState(row: number, col: number): void {
        this.stateGrid[row][col] = this.currentPlayer;
    }

    updateUI(row: number, col: number) {
        let _2dTo1dIndex =
            (row + 1) * this.config.Cols + col - this.config.Cols;
        console.log(_2dTo1dIndex);
        this.UIGrid[_2dTo1dIndex] = this.currentPlayer;
    }

    verticalCheck(row: number, col: number): number[][] {
        let winningIndices = [];
        for (let r = row; r < this.stateGrid.length; r++) {
            if (this.stateGrid[r][col] === this.currentPlayer) {
                winningIndices.push([row, col]);
                if (winningIndices.length === this.config.Tokens) {
                    return winningIndices;
                }
            } else {
                winningIndices = [];
            }
        }
        return [];
    }

    horizontalCheck(row: number, col: number): number[][] {
        let winningIndices = [];
        for (let c = 0; c < this.config.Cols; c++) {
            if (this.stateGrid[row][c] === this.currentPlayer) {
                winningIndices.push([row, col]);
                if (winningIndices.length === this.config.Tokens) {
                    return winningIndices;
                }
            } else {
                winningIndices = [];
            }
        }
        return [];
    }

    diagonalCheck(row: number, col: number): number[][] {
        let winningIndices = [];
        while (row > 0 && col > 0) {
            row--;
            col--;
        }
        while (row < this.config.Rows && col < this.config.Cols) {
            if (this.stateGrid[row][col] === this.currentPlayer) {
                winningIndices.push([row, col]);
                if (winningIndices.length === this.config.Tokens) {
                    return winningIndices;
                }
            } else {
                winningIndices = [];
            }
            row++;
            col++;
        }
        return [];
    }

    invertedDiagonalCheck(row: number, col: number): number[][] {
        let winningIndices = [];
        while (row > 0 && col < this.config.Cols) {
            row--;
            col++;
        }
        while (row < this.config.Rows && col < this.config.Cols) {
            this.print(row, col);
            if (this.stateGrid[row][col] === this.currentPlayer) {
                winningIndices.push([row, col]);
                if (winningIndices.length === this.config.Tokens) {
                    return winningIndices;
                }
            } else {
                winningIndices = [];
            }
            row++;
            col--;
        }
        return [];
    }

    drawCheck(): boolean {
        return this.UIGrid.every(i => i !== 0);
    }
    print(row: number, col: number) {
        console.log(`(${row}, ${col})`);
    }
}
