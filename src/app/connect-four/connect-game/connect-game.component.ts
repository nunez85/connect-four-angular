import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ConnectGameConfig } from '../../../models/connect-game-config';
import {
    ConnectGridComponent,
    GAME_STATUS,
} from '../connect-grid/connect-grid.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-connect-game',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatDividerModule,
        ReactiveFormsModule,
        ConnectGridComponent,
        ConnectGridComponent,
        RouterOutlet,
    ],
    templateUrl: './connect-game.component.html',
    styleUrl: './connect-game.component.scss',
})
export class ConnectGameComponent {
    gameForm: FormGroup;
    gameConfig$: BehaviorSubject<ConnectGameConfig>;
    startGame$: BehaviorSubject<boolean>;
    resetGame$: BehaviorSubject<boolean>;
    gameStatus: number;
    started: boolean;

    constructor() {
        this.gameStatus = GAME_STATUS.NOT_STARTED;
        this.started = false;
        let config = new ConnectGameConfig();
        this.gameConfig$ = new BehaviorSubject<ConnectGameConfig>(config);
        this.startGame$ = new BehaviorSubject<boolean>(false);
        this.resetGame$ = new BehaviorSubject<boolean>(false);
        this.gameForm = new FormGroup({
            Tokens: new FormControl(),
            Rows: new FormControl(),
            Cols: new FormControl(),
            Players: new FormControl(),
            GridTemplate: new FormControl(),
        });

        this.gameForm.patchValue(config);

        this.gameForm.valueChanges.subscribe({
            next: val => {
                const gridTemplate = '1fr '.repeat(val.Cols);
                val.GridTemplate = gridTemplate;
                this.gameConfig$.next(val);
            },
        });
    }

    startGame(): void {
        this.startGame$.next(true);
        this.started = true;
    }

    resetGame(): void {
        this.resetGame$.next(true);
        this.started = false;
    }
}
