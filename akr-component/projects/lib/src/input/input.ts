import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/**
 * Input Directive.
 *
 * Enhances native `<input>` elements with Akr styles and validation support.
 * Designed to be used within `akr-form-field` or independently.
 *
 * @example
 * ```html
 * <input akr-input placeholder="Enter text..." />
 * <input akr-input [invalid]="true" />
 * ```
 */
@Component({
    selector: 'input[akr-input]',
    imports: [],
    templateUrl: './input.html',
    styleUrl: './input.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.akr-input-invalid]': 'invalid()',
        '[id]': 'id()',
    },
})
export class AkrInput {
    /**
     * The unique identifier for the input element.
     * Defaults to an automatically generated unique ID.
     */
    readonly id = input<string>(`akr-input-${nextId++}`);

    /**
     * Whether the input is in an invalid or error state.
     * Applies the `akr-input-invalid` CSS class when true.
     * @default false
     */
    readonly invalid = input<boolean>(false);

    /**
     * The validation error message.
     * Typically rendered by the parent `AkrFormField`.
     */
    readonly errorMessage = input<string>('');

    /**
     * A hint or description message.
     * Typically rendered by the parent `AkrFormField`.
     */
    readonly hintMessage = input<string>('');
}
