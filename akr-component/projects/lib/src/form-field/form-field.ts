import { ChangeDetectionStrategy, Component, contentChild, inject, InjectionToken, input } from '@angular/core';
import { AkrInput } from '../input/input';

/**
 * Injection token for the required mark content.
 */
export const AKR_FORM_FIELD_REQUIRED_MARK = new InjectionToken<string>('AKR_FORM_FIELD_REQUIRED_MARK', {
    providedIn: 'root',
    factory: () => '*',
});

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
     * The required mark content.
     */
    protected readonly requiredMark = inject(AKR_FORM_FIELD_REQUIRED_MARK);

    /**
     * The label for the form field.
     */
    readonly label = input<string>('');

    /**
     * Whether the form field is required.
     */
    readonly required = input<boolean>(false);

    /**
     * The input component within the form field.
     */
    readonly input = contentChild.required(AkrInput);
}
