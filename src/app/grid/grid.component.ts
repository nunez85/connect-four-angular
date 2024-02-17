import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.scss',
})
export class GridComponent {
    rows = 3
    cols = 4
}
