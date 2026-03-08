import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AkrFormField, AkrInput } from 'akr-component';

@Component({
    selector: 'app-input',
    imports: [AkrInput, AkrFormField],
    templateUrl: './input.html',
    styleUrl: './input.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Input {}
