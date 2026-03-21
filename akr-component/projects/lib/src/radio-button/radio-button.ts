import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input } from '@angular/core';
import { RadioButtonGroup } from './radio-button-group';

/**
 * Severity levels for the radio button.
 */
export type RadioButtonSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * Radio button component.
 *
 * Provides a radio button input that can be used independently or within an `akr-radio-button-group`.
 */
@Component({
    selector: 'akr-radio-button',
    templateUrl: './radio-button.html',
    styleUrl: './radio-button.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(click)': 'onClick()',
    },
})
export class AkrRadioButton<T = unknown> {
    /**
     * Parent radio group context.
     * @internal
     */
    private readonly group = inject(
        forwardRef(() => RadioButtonGroup<T>),
        { optional: true },
    );

    /**
     * Name attribute for the radio button.
     * Inherited from the parent group if available.
     * @internal
     */
    protected readonly name = computed<string | null>(() => this.group?.name() ?? null);

    /**
     * Whether the radio button is currently selected.
     * Synchronized with the parent group's selected signal.
     * @internal
     */
    protected readonly checked = computed<boolean>(() => {
        const groupSelectedValue = this.group?.selected();

        return groupSelectedValue !== undefined && groupSelectedValue === this.value();
    });

    /**
     * Effective disabled state, considering both the radio button and its parent group.
     * @internal
     */
    protected readonly isDisabled = computed<boolean>(() => this.disabled() || (this.group?.disabled() ?? false));

    /**
     * Severity of the radio button.
     */
    readonly severity = input<RadioButtonSeverity>();

    /**
     * The value associated with this radio button.
     */
    readonly value = input.required<T>();

    /**
     * Whether the radio button is disabled.
     */
    readonly disabled = input<boolean>(false);

    /**
     * The visual variant of the radio button.
     * - 'default': Standard radio button with circle and label.
     * - 'card': Card-style radio button with enhanced layout.
     */
    readonly variant = input<'default' | 'card'>('default');

    /**
     * Selects the radio button when clicked, if it is not disabled.
     * @internal
     */
    protected onClick(): void {
        if (!this.isDisabled()) {
            this.select();
        }
    }

    /**
     * Synchronizes the internal state when the native radio input changes.
     * @internal
     */
    protected onInputChange(): void {
        this.select();
    }

    /**
     * Updates the parent radio group's selected value to match this radio button.
     * @internal
     */
    private select(): void {
        if (this.group) {
            this.group.selected.set(this.value());
        }
    }
}
