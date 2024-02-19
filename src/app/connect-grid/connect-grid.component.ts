import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectGameConfig } from '../../models/connect-game-config';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export const GAME_STATUS = {
    ONGOING: 1,
    DRAW: 2,
    WIN: 3,
    NOT_STARTED: 4,
};

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

    @Input()
    startGame$!: Observable<boolean>;

    @Input()
    resetGame$!: Observable<boolean>;

    @Output()
    event: EventEmitter<number> = new EventEmitter<number>();

    winningIndices: number[][] = [];
    players = ['Green', 'Pink', 'Purple'];
    status = GAME_STATUS.NOT_STARTED;
    currentPlayer = 1;
    scores: number[] = [];
    config!: ConnectGameConfig;
    stateGrid: number[][] = [];
    UIGrid: any[] = [];

    constructor(private _snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string) {
        this._snackBar
            .open(message, action, {
                panelClass: ['win-snackbar'],
            })
            .onAction()
            .subscribe({
                next: () => {
                    this.resetGrids(this.config.Rows, this.config.Cols);
                    this.resetHighlight(this.winningIndices);
                },
            });
    }

    ngOnInit() {
        this.startGame$.subscribe({
            next: hasStarted => {
                if (hasStarted) {
                    this.status = GAME_STATUS.ONGOING;
                }
            },
        });
        this.resetGame$.subscribe({
            next: hasReset => {
                if (hasReset) {
                    this.status = GAME_STATUS.NOT_STARTED;
                    this.resetGame();
                    this.resetGrids(this.config.Rows, this.config.Cols);
                    this.resetHighlight(this.winningIndices);
                }
            },
        });
        this.gameConfig$.subscribe({
            next: config => {
                this.config = config;
                this.resetGrids(config.Rows, config.Cols);
                this.resetGame();
            },
        });
    }

    resetGrids(rows: number, cols: number): void {
        this.stateGrid = Array(rows)
            .fill(0)
            .map(() => Array(cols).fill(0));
        this.UIGrid = Array(rows * cols).fill(0);
    }

    resetGame(): void {
        this.scores = Array(this.config.Players).fill(0);
    }

    handleClick(idx: number): void {
        if (this.status === GAME_STATUS.NOT_STARTED) {
            return;
        }

        const [row, col] = this.makeMove(idx);
        if (row === -1) {
            return;
        }

        this.updateState(row, col);
        this.updateUI(row, col);

        let res = this.verticalCheck(row, col);
        if (res.length !== 0) {
            this.handleWin(res);
            return;
        }

        res = this.horizontalCheck(row, col);
        if (res.length !== 0) {
            this.handleWin(res);
            return;
        }

        res = this.diagonalCheck(row, col);
        if (res.length !== 0) {
            this.handleWin(res);
            return;
        }

        res = this.invertedDiagonalCheck(row, col);
        if (res.length !== 0) {
            this.handleWin(res);
            return;
        }

        if (this.drawCheck()) {
            this.event.emit(GAME_STATUS.DRAW);
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

    draw(): void {
        this.event.emit(GAME_STATUS.DRAW);
    }

    win(): void {
        this.event.emit(GAME_STATUS.WIN);
    }

    updateState(row: number, col: number): void {
        this.stateGrid[row][col] = this.currentPlayer;
    }

    updateUI(row: number, col: number) {
        this.UIGrid[this._2dTo1d(row, col)] = this.currentPlayer;
    }

    handleWin(winningIndices: number[][]) {
        this.winningIndices = winningIndices;
        this.highlightWinningIndices(winningIndices);
        this.updateScore();
        this.notifyWin();
    }

    verticalCheck(row: number, col: number): number[][] {
        let winningIndices = [];
        for (let r = row; r < this.stateGrid.length; r++) {
            if (this.stateGrid[r][col] === this.currentPlayer) {
                winningIndices.push([r, col]);
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
                winningIndices.push([row, c]);
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

    highlightWinningIndices(winningIndices: number[][]): void {
        winningIndices.forEach(res => {
            const element = document.getElementById(
                'cell-' + this._2dTo1d(res[0], res[1])
            );
            element?.classList.add('highlight');
        });
    }

    updateScore(): void {
        this.scores[this.currentPlayer - 1] += 1;
    }

    notifyWin(): void {
        this.openSnackBar(
            `${this.players[this.currentPlayer - 1]} won!`,
            'Continue?'
        );
    }

    _2dTo1d(row: number, col: number): number {
        return (row + 1) * this.config.Cols + col - this.config.Cols;
    }

    resetHighlight(winningIndices: number[][]): void {
        winningIndices.forEach(res => {
            const element = document.getElementById(
                'cell-' + this._2dTo1d(res[0], res[1])
            );
            element?.classList.remove('highlight');
        });
    }

    print(row: number, col: number) {
        console.log(`(${row}, ${col})`);
    }
}
