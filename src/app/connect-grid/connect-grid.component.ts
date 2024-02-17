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
        const [index, res] = this.makeMove(idx);
        if (res == 'ok') {
            this.currentPlayer =
                (this.currentPlayer + 1) % (this.config.Players + 1);
            if (this.currentPlayer == 0) {
                this.currentPlayer = 1;
            }
        }
        console.log(res);
    }

    makeMove(idx: number): any {
        let col = (idx % this.config.Cols) - 1;

        for (let r = this.gameGrid.length - 1; r >= 0; r--) {
            if (this.gameGrid[r][col] == 0) {
                this.gameGrid[r][col] = this.currentPlayer;
                const newIndex =
                    (r + 1) * this.config.Cols + col - this.config.Cols;

                console.log(`idx => ${newIndex} row => ${r} col => ${col}`);
                this.UIGrid[newIndex] = this.currentPlayer;
                console.log(this.UIGrid);
                console.log(this.gameGrid);
                return [idx, 'ok'];
            }
        }

        return [-1, 'no'];
    }
}
