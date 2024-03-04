import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-business-card',
    standalone: true,
    imports: [MatCardModule, MatIconModule, HttpClientModule, NgIf],
    providers: [MatIconRegistry],
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

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'github',
            sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/github-mark.svg'
            )
        );

        iconRegistry.addSvgIcon(
            'instagram',
            sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/instagram-black.svg'
            )
        );
    }
}
