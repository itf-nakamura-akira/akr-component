import { ChangeDetectionStrategy, Component, computed, forwardRef, HostListener, inject, input } from '@angular/core';
import { RadioButtonGroup } from './radio-button-group';

export type RadioButtonSeverity = 'info' | 'success' | 'warning' | 'error';

@Component({
    selector: 'akr-radio-button',
    templateUrl: './radio-button.html',
    styleUrl: './radio-button.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButton {
    /**
     * Parent radio group.
     */
    protected readonly group = inject(
        forwardRef(() => RadioButtonGroup),
        { optional: true },
    );

    /**
     * Severity of the radio button.
     */
    readonly severity = input<RadioButtonSeverity>();

    /**
     * Value of the radio button.
     */
    readonly value = input.required<any>();

    /**
     * Name attribute for the radio button.
     * Inherited from group if available.
     */
    readonly name = computed(() => this.group?.name() ?? null);

    /**
     * Whether the radio button is checked.
     * Synchronized with the group's value.
     */
    readonly checked = computed(() => {
        const groupValue = this.group?.value();

        return groupValue !== undefined && groupValue === this.value();
    });

    /**
     * Whether the radio button is disabled.
     */
    readonly disabled = input<boolean>(false);

    /**
     * Handle click on the host component.
     */
    @HostListener('click')
    protected onClick() {
        if (!this.disabled()) {
            this.select();
        }
    }

    /**
     * Select this radio button.
     */
    select() {
        if (this.group) {
            this.group.value.set(this.value());
        }
    }

    /**
     * Synchronize internal input state.
     */
    onInputChange() {
        this.select();
    }
}
