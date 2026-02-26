import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Application root.
 */
@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {}
