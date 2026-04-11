import { Combobox, ComboboxInput, ComboboxPopup, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    afterRenderEffect,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    Directive,
    effect,
    forwardRef,
    inject,
    input,
    output,
    Signal,
    signal,
    TemplateRef,
    viewChild,
    viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AkrIcon } from '../internal/icon/icon';

/**
 * Represents an option in the select component.
 */
export interface AkrSelectOption<T = string> {
    /** The unique value of the option. */
    value: T;
    /** The display label of the option. */
    label: string;
    /** Optional icon name to display alongside the label. */
    icon?: string;
    /** Whether the option is disabled. */
    disabled?: boolean;
}

/**
 * Directive to provide a custom icon for select options.
 * Used as a structural directive inside the select component.
 */
@Directive({
    selector: '[akrSelectIcon]',
})
export class AkrSelectIcon<T = string> {
    /**
     * The template reference for the custom icon.
     */
    readonly template = inject<TemplateRef<{ $implicit: AkrSelectOption<T> }>>(TemplateRef);
}

/**
 * A custom select component built with Angular CDK and ARIA patterns.
 * Supports single selection, icons, and custom templates.
 */
@Component({
    selector: 'akr-select',
    imports: [
        Combobox,
        ComboboxInput,
        ComboboxPopup,
        ComboboxPopupContainer,
        Listbox,
        Option,
        OverlayModule,
        AkrIcon,
        NgTemplateOutlet,
    ],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AkrSelect),
            multi: true,
        },
    ],
})
export class AkrSelect<T = string> implements ControlValueAccessor {
    /** Internal signal holding the currently selected value. */
    protected readonly _value = signal<T | null>(null);

    /** Whether the component is disabled. */
    readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

    /** Internal signal tracking whether the component is disabled by the form control. */
    private readonly _disabled = signal(false);

    /** Computed signal for the final disabled state. */
    protected readonly isDisabled = computed(() => this.disabled() || this._disabled());

    /** The internal listbox used for option selection. */
    readonly listbox = viewChild<Listbox<T>>(Listbox);

    /** The rendered option elements in the listbox. */
    readonly optionElements = viewChildren<Option<T>>(Option);

    /** The ARIA combobox that manages the overall interaction. */
    readonly combobox = viewChild<Combobox<T>>(Combobox);

    /** The list of options available for selection. */
    readonly options = input.required<AkrSelectOption<T>[]>();

    /** Optional placeholder text displayed when no value is selected. */
    readonly placeholder = input<string>('Select an option');

    /** Optional custom icon template provided by the user via `*akrSelectIcon`. */
    readonly customIcon: Signal<AkrSelectIcon<T> | undefined> = contentChild(AkrSelectIcon);

    /** Computed signal that returns the full option object for the current value. */
    readonly selectedOption = computed(() => this.options().find((opt) => opt.value === this._value()));

    /** Computed signal for the icon name to be displayed in the trigger. */
    readonly displayIcon = computed(() => {
        const option = this.selectedOption();
        return option && option.icon ? option.icon : '';
    });

    /** Computed signal for the label text shown in the trigger. */
    readonly displayValue = computed(() => {
        const option = this.selectedOption();
        return option ? option.label : this.placeholder();
    });

    /** Event emitted when the selected value changes. */
    readonly selectionChange = output<T | null>();

    constructor() {
        // Automatically syncs the internal value signal when the listbox selection changes.
        effect(() => {
            const listbox = this.listbox();

            if (!listbox) {
                return;
            }

            const values = listbox.values();
            const newValue = values.length ? values[0] : null;

            if (newValue !== this._value()) {
                this._value.set(newValue);
                this._onChange(newValue);
                this.selectionChange.emit(newValue);
            }
        });

        // Ensures the active option is scrolled into view whenever it changes.
        afterRenderEffect(() => {
            const option = this.optionElements().find((opt) => opt.active());
            option?.element.scrollIntoView({ block: 'nearest' });
        });

        // Resets the scroll position of the listbox to the top when the dropdown is closed.
        afterRenderEffect(() => {
            if (!this.combobox()?.expanded()) {
                setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
            }
        });
    }

    /**
     * Sets the value of the component. Part of ControlValueAccessor.
     * @param value The new value to set.
     * @returns void
     */
    writeValue(value: T | null): void {
        this._value.set(value);
    }

    /**
     * Registers a callback for value changes. Part of ControlValueAccessor.
     * @param fn The callback function to be invoked when the value changes.
     * @returns void
     */
    registerOnChange(fn: (value: T | null) => void): void {
        this._onChange = fn;
    }

    /**
     * Registers a callback for when the component is touched. Part of ControlValueAccessor.
     * @param fn The callback function to be invoked when the component is touched.
     * @returns void
     */
    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    /**
     * Sets the disabled state of the component. Part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     * @returns void
     */
    setDisabledState(isDisabled: boolean): void {
        this._disabled.set(isDisabled);
    }

    /**
     * Handles the blur event to trigger the touched state.
     * @returns void
     */
    protected _handleBlur() {
        this._onTouched();
    }

    /** Callback invoked when the value changes, as part of ControlValueAccessor. */
    private _onChange: (value: T | null) => void = () => {
        // Callback registered by parent component.
    };

    /** Callback invoked when the component is blurred, as part of ControlValueAccessor. */
    private _onTouched: () => void = () => {
        // Callback registered by parent component.
    };
}
