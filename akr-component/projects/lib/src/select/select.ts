import { Combobox, ComboboxInput, ComboboxPopup, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    afterRenderEffect,
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    viewChild,
    viewChildren,
} from '@angular/core';

export interface AkrSelectOption {
    value: string;
    icon: string;
}

@Component({
    selector: 'akr-select',
    imports: [Combobox, ComboboxInput, ComboboxPopup, ComboboxPopupContainer, Listbox, Option, OverlayModule],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkrSelect {
    /** The combobox listbox popup. */
    listbox = viewChild<Listbox<string>>(Listbox);

    /** The options available in the listbox. */
    optionElements = viewChildren<Option<string>>(Option);

    /** A reference to the ng aria combobox. */
    combobox = viewChild<Combobox<string>>(Combobox);

    /** The options that are available for selection. */
    options = input<AkrSelectOption[]>([]);

    /** The icon that is displayed in the combobox. */
    displayIcon = computed(() => {
        const values = this.listbox()?.values() || [];
        const option = this.options().find((opt) => opt.value === values[0]);
        return option ? option.icon : '';
    });

    /** The string that is displayed in the combobox. */
    displayValue = computed(() => {
        const values = this.listbox()?.values() || [];
        return values.length ? values[0] : 'Select an option';
    });

    constructor() {
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
}
