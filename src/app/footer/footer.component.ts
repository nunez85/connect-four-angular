import { Component } from '@angular/core';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [BusinessCardComponent, MatDividerModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {}
