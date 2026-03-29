import { Combobox, ComboboxInput, ComboboxPopup, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    afterRenderEffect,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    Directive,
    effect,
    forwardRef,
    inject,
    input,
    Signal,
    signal,
    TemplateRef,
    viewChild,
    viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AkrIcon } from '../internal/icon/icon';

export interface AkrSelectOption {
    value: string;
    label: string;
    icon?: string;
}

/**
 * Directive to provide a custom icon for select options.
 */
@Directive({
    selector: '[akrSelectIcon]',
})
export class AkrSelectIcon {
    /**
     * The template reference for the custom icon.
     */
    readonly template = inject<TemplateRef<{ $implicit: AkrSelectOption }>>(TemplateRef);
}

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
export class AkrSelect implements ControlValueAccessor {
    /** The combobox listbox popup. */
    listbox = viewChild<Listbox<string>>(Listbox);

    /** The options available in the listbox. */
    optionElements = viewChildren<Option<string>>(Option);

    /** A reference to the ng aria combobox. */
    combobox = viewChild<Combobox<string>>(Combobox);

    /** The options that are available for selection. */
    options = input<AkrSelectOption[]>([]);

    /** Optional custom icon template provided via content projection. */
    readonly customIcon: Signal<AkrSelectIcon | undefined> = contentChild(AkrSelectIcon);

    /** The current value of the select. */
    protected readonly _value = signal<string | null>(null);

    /** Whether the select is disabled. */
    protected readonly disabled = signal(false);

    /** The currently selected option. */
    selectedOption = computed(() => {
        return this.options().find((opt) => opt.value === this._value());
    });

    /** The icon that is displayed in the combobox. */
    displayIcon = computed(() => {
        const option = this.selectedOption();
        return option && option.icon ? option.icon : '';
    });

    /** The string that is displayed in the combobox. */
    displayValue = computed(() => {
        const option = this.selectedOption();
        return option ? option.label : 'Select an option';
    });

    /** Callback for when the value changes. */
    private _onChange: (value: string | null) => void = () => {};

    /** Callback for when the component is touched. */
    private _onTouched: () => void = () => {};

    constructor() {
        // Syncs the internal value with the listbox value.
        effect(() => {
            const listbox = this.listbox();
            if (!listbox) return;

            const values = listbox.values();
            const newValue = values.length ? values[0] : null;

            if (newValue !== this._value()) {
                this._value.set(newValue);
                this._onChange(newValue);
            }
        });

        // Scrolls to the active item when the active option changes.
        // The slight delay here is to ensure animations are done before scrolling.
        afterRenderEffect(() => {
            const option = this.optionElements().find((opt) => opt.active());
            setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
        });
        // Resets the listbox scroll position when the combobox is closed.
        afterRenderEffect(() => {
            if (!this.combobox()?.expanded()) {
                setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
            }
        });
    }

    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: string | null): void {
        this._value.set(value);
    }

    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: (value: string | null) => void): void {
        this._onChange = fn;
    }

    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    /** Implemented as part of ControlValueAccessor. */
    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    /** Handles the blur event to mark the component as touched. */
    protected _handleBlur() {
        this._onTouched();
    }
}
