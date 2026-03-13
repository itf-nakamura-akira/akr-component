import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/**
 * Input Component.
 *
 * An input component that enhances the native input element.
 * Provides support for validation states, error messages, and hint messages.
 * Use it by adding the `akr-input` attribute to an `<input>` element.
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
     * The unique ID of the input.
     * Defaults to an automatically generated unique ID if not specified.
     */
    readonly id = input<string>(`akr-input-${nextId++}`);

    /**
     * Whether the input is in an invalid state.
     * If true, the `akr-input-invalid` class is applied.
     */
    readonly invalid = input<boolean>(false);

    /**
     * The error message to display when the input is invalid.
     * This message is typically shown by the parent `AkrFormField`.
     */
    readonly errorMessage = input<string>('');

    /**
     * The hint message to display when the input is valid.
     * This message is typically shown by the parent `AkrFormField`.
     */
    readonly hintMessage = input<string>('');
}
