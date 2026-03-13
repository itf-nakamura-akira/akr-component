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
export class RadioButton<T = unknown> {
    /**
     * Parent radio group.
     */
    private readonly group = inject(
        forwardRef(() => RadioButtonGroup<T>),
        { optional: true },
    );

    /**
     * Name attribute for the radio button.
     * Inherited from group if available.
     */
    protected readonly name = computed<string | null>(() => this.group?.name() ?? null);

    /**
     * Whether the radio button is checked.
     * Synchronized with the group's value.
     */
    protected readonly checked = computed<boolean>(() => {
        const groupValue = this.group?.value();

        return groupValue !== undefined && groupValue === this.value();
    });

    /**
     * Effective disabled state.
     */
    protected readonly isDisabled = computed<boolean>(() => this.disabled() || (this.group?.disabled() ?? false));

    /**
     * Severity of the radio button.
     */
    readonly severity = input<RadioButtonSeverity>();

    /**
     * Value of the radio button.
     */
    readonly value = input.required<T>();

    /**
     * Whether the radio button is disabled.
     */
    readonly disabled = input<boolean>(false);

    /**
     * Handle click on the host component.
     * Selects the radio button if it's not disabled.
     */
    protected onClick(): void {
        if (!this.isDisabled()) {
            this.select();
        }
    }

    /**
     * Synchronize internal input state.
     * Triggered when the native radio input changes.
     */
    protected onInputChange(): void {
        this.select();
    }

    /**
     * Select this radio button by updating the group value.
     * Notifies the parent radio group of the selection.
     */
    private select(): void {
        if (this.group) {
            this.group.value.set(this.value());
        }
    }
}
