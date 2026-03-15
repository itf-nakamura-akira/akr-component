import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AkrButton } from 'akr-component';

@Component({
    selector: 'app-button',
    imports: [AkrButton],
    templateUrl: './button.html',
    styleUrl: './button.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Button {}
