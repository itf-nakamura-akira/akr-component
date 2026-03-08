import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Input Component.
 *
 * An input component that enhances the native input element.
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
    },
})
export class AkrInput {
    /**
     * Whether the input is in an invalid state.
     */
    readonly invalid = input<boolean>(false);

    /**
     * The error message to display when the input is invalid.
     */
    readonly errorMessage = input<string>('');

    /**
     * The hint message to display when the input is valid.
     */
    readonly hintMessage = input<string>('');
}
