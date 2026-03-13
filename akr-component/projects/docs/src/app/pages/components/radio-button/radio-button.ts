import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButton as AkrRadioButton, RadioButtonGroup } from 'akr-component';

@Component({
    selector: 'app-radio-button',
    imports: [AkrRadioButton, RadioButtonGroup, ReactiveFormsModule],
    templateUrl: './radio-button.html',
    styleUrl: './radio-button.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadioButton {
    readonly selectedValue = signal<string>('option1');
    readonly cardSelected = signal<string>('plan1');

    readonly formControl = new FormControl('option1');
}
