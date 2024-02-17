import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GridComponent } from './grid/grid.component';
import { ConnectGridComponent } from './connect-grid/connect-grid.component';
import { MatCardModule } from '@angular/material/card';

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
        ReactiveFormsModule,
        ConnectGridComponent,
        GridComponent,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    gameForm = new FormGroup({
        tokens: new FormControl(4),
        rows: new FormControl(6),
        cols: new FormControl(7),
    });
}
