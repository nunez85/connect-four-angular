import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectGameConfig } from '../../models/connect-game-config';
import { CommonModule } from '@angular/common';

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
    gameGrid: number[][] = [];
    UIGrid: any[] = [];

    constructor() {}

    ngOnInit() {
        this.gameConfig$.subscribe({
            next: config => {
                this.config = config;
                this.gameGrid = Array(config.Rows)
                    .fill(0)
                    .map(() => Array(config.Cols).fill(0));
                this.UIGrid = Array(config.Rows * config.Cols).fill(0);
            },
        });
    }

    handleClick(idx: number): void {
        const newIndex = this.makeMove(idx);
        // check if win
        if (newIndex === -1) {
            return;
        }
        let playerThatWon = this.verticalCheck();
        if (playerThatWon !== -1) {
            console.log(`Player ${this.currentPlayer} wins vertically`);
        }

        playerThatWon = this.horizontalCheck();
        if (playerThatWon !== -1) {
            console.log(`Player ${this.currentPlayer} wins horizontally`);
        }

        playerThatWon = this.otherDiagonalCheck();
        if (playerThatWon !== -1) {
            console.log(`Player ${this.currentPlayer} wins diagonally`);
        }

        this.currentPlayer =
            (this.currentPlayer + 1) % (this.config.Players + 1);
        if (this.currentPlayer == 0) {
            this.currentPlayer = 1;
        }
    }

    makeMove(idx: number): any {
        let col = (idx - 1) % this.config.Cols;

        for (let r = this.gameGrid.length - 1; r >= 0; r--) {
            if (this.gameGrid[r][col] == 0) {
                this.gameGrid[r][col] = this.currentPlayer;
                const newIndex = this._2dTo1d(r, col);

                this.UIGrid[newIndex] = this.currentPlayer;
                return newIndex;
            }
        }
        return -1;
    }

    _2dTo1d(row: number, col: number): number {
        return (row + 1) * this.config.Cols + col - this.config.Cols;
    }

    verticalCheck(): number {
        let count = 0;
        let indexes = [];

        for (let i = 0; i < this.config.Cols; i++) {
            for (
                let step = i;
                step < this.UIGrid.length;
                step += this.config.Cols
            ) {
                if (this.UIGrid[step] === this.currentPlayer) {
                    count++;
                    indexes.push(step);
                    if (count === this.config.Tokens) {
                        console.log(indexes);
                        return this.currentPlayer;
                    }
                } else {
                    indexes = [];
                    count = 0;
                }
            }
        }
        return -1;
    }

    horizontalCheck(): number {
        let count = 0;
        let indexes = [];

        for (let i = 0; i < this.UIGrid.length; i++) {
            if (
                i === this.config.Cols ||
                this.UIGrid[i] !== this.currentPlayer
            ) {
                count = 0;
                indexes = [];
            } else {
                count++;
                indexes.push(i);
                if (count === this.config.Tokens) {
                    console.log(indexes);
                    return this.currentPlayer;
                }
            }
        }
        return -1;
    }

    otherDiagonalCheck(): number {
        let count = 0;
        let arr: number[] = [];
        let i = 0;
        let j = 0;
        while (j < this.config.Cols) {
            let row = 0;
            while (i < this.config.Rows) {
                row = i;
                let col = j;
                while (row < this.config.Rows && col < this.config.Cols) {
                    if (this.gameGrid[row][col] === this.currentPlayer) {
                        arr.push(this._2dTo1d(row, col));
                        count++;
                        if (count === this.config.Tokens) {
                            return this.currentPlayer;
                        }
                    } else {
                        arr = [];
                        count = 0;
                    }
                    row++;
                    col++;
                }
                if (arr.length > 0) {
                    console.log(arr);
                }
                arr = [];
                count = 0;
                i++;
            }
            j++;
        }
        return -1;
    }

    diagonalCheck(): number {
        console.log(this.gameGrid);
        let count = 0;
        let arr = [];
        for (let x = 0; x < this.UIGrid.length; x += this.config.Cols) {
            for (
                let i = x;
                i < this.config.Cols - (this.config.Tokens - 1);
                i++
            ) {
                for (
                    let y = i;
                    y < this.UIGrid.length;
                    y += this.config.Cols + 1
                ) {
                    arr.push(y);
                }
                console.log(i);
                console.log(arr);
                arr = [];
            }
        }

        return -1;
    }
}
