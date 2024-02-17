import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GridComponent } from './grid/grid.component';
import { ConnectGridComponent } from './connect-grid/connect-grid.component';
import { ConnectGameConfig } from '../models/connect-game-config';

@Component({
    selector: 'app-root',
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
        GridComponent,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    gameForm: FormGroup;
    gameConfig$: BehaviorSubject<ConnectGameConfig>;

    constructor() {
        let config = new ConnectGameConfig();
        this.gameConfig$ = new BehaviorSubject<ConnectGameConfig>(config);
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
}
