import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AkrRadioButton, RadioButtonGroup } from 'akr-component';

@Component({
    selector: 'app-radio-button-doc',
    standalone: true,
    imports: [AkrRadioButton, RadioButtonGroup, ReactiveFormsModule],
    templateUrl: './radio-button.html',
    styleUrl: './radio-button.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadioButton {
    /** Form control for reactive forms integration */
    readonly formControl = new FormControl('option1');

    /** Signal for model-based two-way data binding */
    readonly selectedValue = signal('option1');

    /** Signal for card selection example */
    readonly cardSelected = signal('plan1');
}
