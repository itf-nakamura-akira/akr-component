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
 * Wraps an `akr-input` directive and provides a structured layout with a label, error message, and hint message.
 * It automatically handles accessibility by associating the label with the nested input.
 *
 * @example
 * ```html
 * <akr-form-field label="Username" [required]="true">
 *     <input akr-input placeholder="Enter your username" />
 * </akr-form-field>
 * ```
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
     * The character or symbol displayed when a field is marked as required.
     * @internal
     */
    protected readonly requiredMark = inject(AKR_FORM_FIELD_REQUIRED_MARK);

    /**
     * The text to display as the field label.
     */
    readonly label = input<string>('');

    /**
     * Whether the field is mandatory.
     * If true, the `requiredMark` is displayed next to the label.
     * @default false
     */
    readonly required = input<boolean>(false);

    /**
     * The input component projected inside the form field.
     * Automatically detected via the `AkrInput` class.
     * @internal
     */
    readonly input = contentChild.required(AkrInput);
}
