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
export class FooterComponent {
    isaacSummary =
        "I'm a dev based out of New Mexico. I love picking up new languages, tinkering with code, and I enjoy mixing tech with culture and art.";
    heidiSummary =
        'I am an artist passionate about creating aesthetic illustrations and designs. Art fuels my creativity and fills me with inspiration. I live to appreciate beauty in all its forms.';
}
