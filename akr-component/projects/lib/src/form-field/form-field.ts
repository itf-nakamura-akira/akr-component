import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { AkrInput } from '../input/input';

/**
 * Form Field Component.
 *
 * This component wraps an input component and provides a label and error message display.
 */
@Component({
    selector: 'akr-form-field',
    imports: [],
    templateUrl: './form-field.html',
    styleUrl: './form-field.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.akr-form-field-invalid]': 'input().invalid()',
    },
})
export class AkrFormField {
    /**
     * The label for the form field.
     */
    readonly label = input<string>('');

    /**
     * The input component within the form field.
     */
    readonly input = contentChild.required(AkrInput);
}
