import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectGameConfig } from '../../models/connect-game-config';

@Component({
    selector: 'app-connect-grid',
    standalone: true,
    imports: [],
    templateUrl: './connect-grid.component.html',
    styleUrl: './connect-grid.component.scss',
})
export class ConnectGridComponent implements OnInit {
    @Input()
    gameConfig$!: Observable<ConnectGameConfig>;

    constructor() {}

    ngOnInit() {
        this.gameConfig$.subscribe({
            next: config => {
                console.log(config);
            },
        });
    }
}
