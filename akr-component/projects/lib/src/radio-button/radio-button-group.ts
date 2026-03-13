import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

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
export class RadioButtonGroup implements ControlValueAccessor {
    /**
     * The name attribute for all nested radio buttons.
     * Defaults to a unique generated name.
     */
    readonly name = input<string>(`akr-radio-group-${nextId++}`);

    /**
     * The value of the selected radio button.
     */
    readonly value = model<any>();

    /**
     * Callback for value changes.
     */
    private onChange: (value: any) => void = () => {};

    /**
     * Callback for blur events.
     */
    private onTouched: () => void = () => {};

    constructor() {
        // When the value signal changes, notify the form control.
        this.value.subscribe((val) => {
            this.onChange(val);
        });
    }

    // ControlValueAccessor implementation
    writeValue(value: any): void {
        this.value.set(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Implementation for disabling all child radio buttons could be added here.
    }
}
