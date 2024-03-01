import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectGameComponent } from './connect-four/connect-game/connect-game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        ConnectGameComponent,
        NavigationComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
