import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-business-card',
    standalone: true,
    imports: [MatCardModule, NgIf],
    templateUrl: './business-card.component.html',
    styleUrl: './business-card.component.scss',
})
export class BusinessCardComponent {
    @Input()
    profilePicAlt!: string;

    _profilePicUrl!: string;
    get profilePicUrl(): string {
        return this._profilePicUrl;
    }
    @Input() set profilePicUrl(value: string) {
        this._profilePicUrl = 'assets/images/' + value;
    }

    @Input()
    name!: string;

    @Input()
    title!: string;

    @Input()
    summary!: string;

    @Input()
    email!: string;

    @Input()
    github!: string;

    @Input()
    linkedin!: string;

    @Input()
    instagram!: string;
}
