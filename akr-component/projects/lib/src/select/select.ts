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
    input,
    model,
    signal,
    TemplateRef,
    viewChild,
    viewChildren,
} from '@angular/core';
import { AkrIcon } from '../internal/icon/icon';

/**
 * An option for the AkrSelect component.
 */
export interface AkrSelectOption {
    /** The value of the option. */
    value: string;
    /**
     * Optional icon data. This can be any data that your custom icon template can handle.
     */
    icon?: any;
    /** Whether the option is disabled. */
    disabled?: boolean;
}

/**
 * Directive to provide a custom icon template for AkrSelect options.
 */
@Directive({
    selector: '[akrSelectOptionIcon]',
})
export class AkrSelectOptionIcon {
    constructor(public templateRef: TemplateRef<{ $implicit: any }>) {}
}

@Component({
    selector: 'akr-select',
    imports: [OverlayModule, NgTemplateOutlet, AkrIcon, Listbox, Option],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkrSelect {
    /** The options available for selection. */
    readonly options = input<AkrSelectOption[]>([]);

    /** The selected value(s). */
    readonly value = model<AkrSelectOption | AkrSelectOption[] | undefined>();

    /** Whether the component is disabled. */
    readonly disabled = input<boolean>(false);

    /** Whether multiple options can be selected. */
    readonly multiple = input<boolean>(false);

    /** The placeholder text to display when no option is selected. */
    readonly placeholder = input<string>('');

    /** Internal state for popup expansion. */
    readonly expanded = signal(false);

    /** Custom icon template provided by the user. */
    readonly iconTemplate = contentChild(AkrSelectOptionIcon, { read: TemplateRef });

    /** The options available in the listbox. */
    optionElements = viewChildren<Option<AkrSelectOption>>(Option);

    /** The selected icon data. */
    selectedIcon = computed(() => {
        const val = this.value();
        if (!val) return undefined;

        if (Array.isArray(val)) {
            return val.length > 0 ? val[0].icon : undefined;
        }

        return (val as AkrSelectOption).icon;
    });

    /** The string that is displayed in the combobox. */
    displayValue = computed(() => {
        const val = this.value();
        if (!val) return this.placeholder();

        if (Array.isArray(val)) {
            return val.length > 0 ? val.map((opt) => opt.value).join(', ') : this.placeholder();
        }

        return (val as AkrSelectOption).value;
    });

    /** Toggle popup expansion. */
    toggleExpanded(event?: Event): void {
        if (!this.disabled()) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.expanded.update((v) => !v);
        }
    }

    /** Manually toggle option selection. */
    toggleOption(option: AkrSelectOption, event?: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (option.disabled) return;

        if (this.multiple()) {
            const current = (this.value() as AkrSelectOption[]) || [];
            const index = current.findIndex((o) => o.value === option.value);

            if (index === -1) {
                this.value.set([...current, option]);
            } else {
                this.value.set(current.filter((_, i) => i !== index));
            }
        } else {
            this.value.set(option);
            this.expanded.set(false);
        }
    }

    /** Helper to check if an option is selected. */
    isOptionSelected(option: AkrSelectOption): boolean {
        const val = this.value();
        if (!val) return false;

        if (Array.isArray(val)) {
            return val.some((o) => o.value === option.value);
        }

        return (val as AkrSelectOption).value === option.value;
    }

    constructor() {
        // Scrolls to the active item when the active option changes.
        afterRenderEffect(() => {
            const option = this.optionElements().find((opt) => opt.active());
            if (option) {
                setTimeout(() => option.element.scrollIntoView({ block: 'nearest' }), 50);
            }
        });
    }
}
