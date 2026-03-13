import { ChangeDetectionStrategy, Component, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/**
 * Radio button group component.
 *
 * Coordinates the state and behavior of a group of `akr-radio-button` components.
 * Supports Angular forms through the `ControlValueAccessor` interface.
 */
@Component({
    selector: 'akr-radio-button-group',
    imports: [],
    template: '<ng-content />',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'radiogroup',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonGroup),
            multi: true,
        },
    ],
})
export class RadioButtonGroup<T = unknown> implements ControlValueAccessor {
    /**
     * The name attribute for all nested radio buttons.
     * Defaults to a unique generated name.
     */
    readonly name = input<string>(`akr-radio-group-${nextId++}`);

    /**
     * The value of the selected radio button.
     */
    readonly value = model<T>();

    /**
     * Whether the radio group is disabled.
     */
    readonly disabled = signal<boolean>(false);

    /**
     * Initializes the component and sets up the synchronization between the value signal and the form control.
     */
    constructor() {
        // When the value signal changes, notify the form control.
        this.value.subscribe((val) => {
            this.onChange(val);
        });
    }

    /**
     * Sets the value of the radio group.
     * Part of the ControlValueAccessor interface.
     * @param value The value to set.
     */
    writeValue(value: T): void {
        this.value.set(value);
    }

    /**
     * Registers a callback for value changes.
     * Part of the ControlValueAccessor interface.
     * @param fn The callback function.
     */
    registerOnChange(fn: (value: T | undefined) => void): void {
        this.onChange = fn;
    }

    /**
     * Registers a callback for blur events.
     * Part of the ControlValueAccessor interface.
     * @param fn The callback function.
     */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /**
     * Sets the disabled state of the radio group.
     * Part of the ControlValueAccessor interface.
     * @param isDisabled Whether the group should be disabled.
     */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    /**
     * Callback for value changes.
     */
    private onChange: (value: T | undefined) => void = () => {
        // Default implementation for ControlValueAccessor
    };

    /**
     * Callback for blur events.
     */
    private onTouched: () => void = () => {
        // Default implementation for ControlValueAccessor
    };
}
