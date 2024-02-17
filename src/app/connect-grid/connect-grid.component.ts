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
                console.log(config);
                this.gameGrid = Array(config.Rows)
                    .fill(0)
                    .map(() => Array(config.Cols).fill(0));
                this.UIGrid = Array(config.Rows * config.Cols).fill(0);
            },
        });
    }

    handleClick(idx: number): void {
        let row = 0;
        let col = 0;
        let res = idx;

        row = Math.floor(idx / this.config.Cols);
        col = (idx % this.config.Cols) - 1;

        console.log(`idx => ${idx} row => ${row} col => ${col}`);
        this.gameGrid[row][col] = 2;
        this.UIGrid[idx - 1] = this.currentPlayer;
        console.log(this.gameGrid);
    }

    divmod(x: number, y: number) {
        return [Math.floor(x / y), x % y];
    }
}
