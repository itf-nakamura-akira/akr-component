import { ChangeDetectionStrategy, Component, contentChild, inject, InjectionToken, input } from '@angular/core';
import { AkrInput } from '../input/input';

/**
 * Injection token for the required mark content.
 * Defaults to '*' but can be overridden globally via dependency injection.
 */
export const AKR_FORM_FIELD_REQUIRED_MARK = new InjectionToken<string>('AKR_FORM_FIELD_REQUIRED_MARK', {
    providedIn: 'root',
    factory: () => '*',
});

/**
 * Form Field Component.
 *
 * This component wraps an `AkrInput` component and provides a structured layout with a label,
 * error messages, and hint messages. It automatically handles the association between the label
 * and the input for accessibility.
 * It's designed to work with standard HTML input elements using the `akr-input` directive.
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
     * The content of the required mark displayed next to the label when `required` is true.
     */
    protected readonly requiredMark = inject(AKR_FORM_FIELD_REQUIRED_MARK);

    /**
     * The label text for the form field.
     * This label is automatically associated with the wrapped input via its ID.
     */
    readonly label = input<string>('');

    /**
     * Whether the form field is marked as required.
     * If true, the required mark (e.g., "*") will be displayed.
     */
    readonly required = input<boolean>(false);

    /**
     * The input component projected within the form field.
     * This is identified by the `AkrInput` class.
     */
    readonly input = contentChild.required(AkrInput);
}
