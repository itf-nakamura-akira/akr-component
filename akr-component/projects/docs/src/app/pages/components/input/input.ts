import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AkrInput } from 'akr-component';

@Component({
    selector: 'app-input',
    imports: [AkrInput],
    templateUrl: './input.html',
    styleUrl: './input.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Input {}
