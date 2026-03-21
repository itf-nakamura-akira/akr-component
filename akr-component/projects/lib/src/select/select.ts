import { CdkListboxModule, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    afterRenderEffect,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    Directive,
    inject,
    input,
    model,
    signal,
    TemplateRef,
    viewChildren,
} from '@angular/core';
import { AkrIcon } from '../internal/icon/icon';

let nextId = 0;

/**
 * Data structure representing an option in the AkrSelect component.
 */
export interface AkrSelectOption {
    /** The visible label of the option. */
    value: string;
    /** Optional data for a custom icon. */
    icon?: unknown;
    /** Whether the option is disabled and cannot be selected. */
    disabled?: boolean;
}

/**
 * Custom Icon Template Directive for Select Options.
 *
 * Use this to provide custom icon rendering for select options.
 */
@Directive({
    selector: '[akrSelectOptionIcon]',
})
export class AkrSelectOptionIcon {
    /** @internal */
    readonly templateRef = inject<TemplateRef<{ $implicit: unknown }>>(TemplateRef);
}

/**
 * Select Component.
 *
 * An accessible dropdown component that supports single and multiple selection, custom templates, and signal-based inputs.
 */
@Component({
    selector: 'akr-select',
    imports: [OverlayModule, NgTemplateOutlet, AkrIcon, CdkListboxModule],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.akr-expanded]': 'expanded()',
        '[attr.aria-disabled]': "disabled() ? 'true' : 'false'",
        class: 'akr-select',
    },
})
export class AkrSelect {
    /**
     * Unique ID for the listbox element used in aria-controls.
     * @internal
     */
    protected readonly listboxId = `akr-select-listbox-${nextId++}`;

    /**
     * The list of options available for selection.
     */
    readonly options = input<AkrSelectOption[]>([]);

    /**
     * The currently selected option(s).
     */
    readonly selected = model<AkrSelectOption | readonly AkrSelectOption[] | undefined>();

    /**
     * Whether the select component is disabled.
     * @default false
     */
    readonly disabled = input<boolean>(false);

    /**
     * Whether multiple options can be selected simultaneously.
     * @default false
     */
    readonly multiple = input<boolean>(false);

    /**
     * Placeholder text to display when no option is selected.
     * @default ''
     */
    readonly placeholder = input<string>('');

    /**
     * Internal state controlling the popup visibility.
     * @internal
     */
    readonly expanded = signal(false);

    /**
     * Custom icon template provided via content projection.
     * @internal
     */
    readonly iconTemplate = contentChild(AkrSelectOptionIcon, { read: TemplateRef });

    /**
     * Collection of option elements within the dropdown list.
     * @internal
     */
    optionElements = viewChildren(CdkOption);

    /**
     * Computed array of currently selected items.
     * @internal
     */
    readonly selectedItems = computed(() => {
        const val = this.selected();

        if (!val) {
            return [];
        }

        return Array.isArray(val) ? val : [val];
    });

    constructor() {
        /**
         * Automatically scrolls to the active item in the list when it changes.
         */
        afterRenderEffect(() => {
            const option = this.optionElements().find((opt) => opt.isActive());

            if (option) {
                setTimeout(() => option.element.scrollIntoView({ block: 'nearest' }), 50);
            }
        });
    }

    /**
     * Handles the selection change from the CDK listbox.
     * @internal
     */
    onSelectionChange(event: ListboxValueChangeEvent<AkrSelectOption>): void {
        if (this.multiple()) {
            this.selected.set(event.value);
        } else {
            this.selected.set(event.value[0]);
            this.expanded.set(false);
        }
    }

    /**
     * Toggles the dropdown popup's expanded state.
     * @internal
     */
    toggleExpanded(event?: Event): void {
        if (!this.disabled()) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.expanded.update((v) => !v);
        }
    }
}
