import { CdkListbox, CdkListboxModule, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    afterRenderEffect,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    Directive,
    ElementRef,
    forwardRef,
    inject,
    input,
    model,
    signal,
    TemplateRef,
    viewChild,
    viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AkrInput } from '../input/input';
import { AkrIcon } from '../internal/icon/icon';

let nextId = 0;

/**
 * Data structure representing an individual option within the AkrSelect component.
 */
export interface AkrSelectOption {
    /**
     * The display label of the option.
     */
    label: string;

    /**
     * The internal value of the option.
     */
    value: unknown;

    /**
     * Arbitrary data passed to the custom icon template.
     */
    icon?: unknown;

    /**
     * Whether the option is interaction-disabled.
     */
    disabled?: boolean;
}

/**
 * Directive used to provide a custom template for rendering option icons.
 *
 * @example
 * ```html
 * <akr-select [options]="options">
 *   <ng-template akrSelectOptionIcon let-icon>
 *     <akr-icon [name]="icon"></akr-icon>
 *   </ng-template>
 * </akr-select>
 * ```
 */
@Directive({
    selector: '[akrSelectOptionIcon]',
})
export class AkrSelectOptionIcon {
    /**
     * @internal
     */
    readonly templateRef = inject<TemplateRef<{ $implicit: unknown }>>(TemplateRef);
}

/**
 * A highly accessible, signal-based select component.
 *
 * Supports single and multiple selection, custom icon templates, and full keyboard navigation
 * through integration with Angular CDK.
 */
@Component({
    selector: 'akr-select',
    imports: [OverlayModule, NgTemplateOutlet, AkrIcon, CdkListboxModule, AkrInput],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.akr-expanded]': 'expanded()',
        '[attr.aria-disabled]': "isDisabled() ? 'true' : 'false'",
        class: 'akr-select',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AkrSelect),
            multi: true,
        },
    ],
})
export class AkrSelect implements ControlValueAccessor {
    /**
     * Unique identifier for the listbox element, used to establish ARIA relationships.
     * @internal
     */
    protected readonly listboxId = `akr-select-listbox-${nextId++}`;

    /**
     * Whether the dropdown popup is currently open.
     * @internal
     */
    protected readonly expanded = signal(false);

    /**
     * The current search text used for filtering options.
     * @internal
     */
    protected readonly filterText = signal('');

    /**
     * Reference to the user-provided icon template via content projection.
     * @internal
     */
    protected readonly iconTemplate = contentChild(AkrSelectOptionIcon, { read: TemplateRef });

    /**
     * Access to the underlying CDK option instances for focus management.
     * @internal
     */
    protected readonly optionElements = viewChildren(CdkOption);

    /**
     * Access to the CDK listbox instance for focus and state management.
     * @internal
     */
    protected readonly listbox = viewChild(CdkListbox);

    /**
     * Reference to the trigger element, used to return focus when the dropdown closes.
     * @internal
     */
    protected readonly trigger = viewChild<ElementRef<HTMLElement>>('trigger');

    /**
     * Reference to the filter input element.
     * @internal
     */
    protected readonly filterInput = viewChild<ElementRef<HTMLInputElement>>('filterInput');

    /**
     * Internal signal to track disabled state set by Angular forms.
     * @internal
     */
    private readonly _formDisabled = signal(false);

    /**
     * Combined disabled state from the input and Angular forms.
     * @internal
     */
    protected readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

    /**
     * The selected value(s) normalized to an array for the CDK listbox.
     * @internal
     */
    protected readonly selectedValues = computed(() => {
        const val = this.selected();

        if (val === undefined || val === null) {
            return [] as readonly unknown[];
        }

        return (Array.isArray(val) ? val : [val]) as readonly unknown[];
    });

    /**
     * Normalizes the `selected` value into a consistent array of option objects for internal rendering.
     * @internal
     */
    protected readonly selectedItems = computed(() => {
        const val = this.selected();
        const allOptions = this.options();

        if (val === undefined || val === null) {
            return [];
        }

        const values = Array.isArray(val) ? val : [val];
        return allOptions.filter((opt) => values.includes(opt.value));
    });

    /**
     * The collection of options filtered by the search text.
     * @internal
     */
    protected readonly filteredOptions = computed(() => {
        const query = this.filterText().toLowerCase();
        const allOptions = this.options();

        if (!query) {
            return allOptions;
        }

        return allOptions.filter((option) => option.label.toLowerCase().includes(query));
    });

    /**
     * The collection of options to be displayed in the dropdown.
     */
    readonly options = input<AkrSelectOption[]>([]);

    /**
     * The currently selected value or values.
     * Supports two-way binding.
     */
    readonly selected = model<unknown | readonly unknown[] | undefined>();

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
     * Whether to show a search box to filter options.
     * @default false
     */
    readonly filterable = input<boolean>(false);

    /**
     * Placeholder text to display when no options are selected.
     * @default ''
     */
    readonly placeholder = input<string>('');

    /**
     * Placeholder text for the filter search box.
     * @default 'Search...'
     */
    readonly filterPlaceholder = input<string>('Search...');

    constructor() {
        /**
         * Side effect to ensure the active option remains visible during keyboard navigation.
         */
        afterRenderEffect(() => {
            const option = this.optionElements().find((opt) => opt.isActive());

            if (option) {
                setTimeout(() => option.element.scrollIntoView({ block: 'nearest' }), 50);
            }
        });
    }

    /**
     * Sets the value of the component.
     * Part of the ControlValueAccessor interface.
     * @param value The new value.
     */
    writeValue(value: unknown | readonly unknown[] | undefined): void {
        this.selected.set(value);
    }

    /**
     * Registers a callback for value changes.
     * Part of the ControlValueAccessor interface.
     * @param fn The callback function.
     */
    registerOnChange(fn: (value: unknown | readonly unknown[] | undefined) => void): void {
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
     * Sets the disabled state of the component.
     * Part of the ControlValueAccessor interface.
     * @param isDisabled Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this._formDisabled.set(isDisabled);
    }

    /**
     * Callback for value changes.
     * @internal
     */
    private onChange: (value: unknown | readonly unknown[] | undefined) => void = () => {};

    /**
     * Callback for blur events.
     * @internal
     */
    private onTouched: () => void = () => {};

    /**
     * Synchronizes the selection state when values are picked from the CDK listbox.
     * @param event The value change event emitted by the listbox.
     * @internal
     */
    protected onSelectionChange(event: ListboxValueChangeEvent<unknown>): void {
        let newValue: unknown | readonly unknown[] | undefined;
        if (this.multiple()) {
            newValue = event.value;
        } else {
            newValue = event.value[0];
            this.expanded.set(false);

            // Focus return management for single selection
            setTimeout(() => {
                this.trigger()?.nativeElement?.focus();
            });
        }

        this.selected.set(newValue);
        this.onChange(newValue);
        this.onTouched();
    }

    /**
     * Updates the filter text based on search box input.
     * @param event The native input event.
     * @internal
     */
    protected onFilterInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.filterText.set(input.value);
    }

    /**
     * Manages keyboard shortcuts on the listbox popup, such as closing on Escape.
     * @param event The native keyboard event.
     * @internal
     */
    protected onListboxKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.expanded.set(false);

            // Ensure focus returns to the trigger when closing via keyboard
            setTimeout(() => {
                this.trigger()?.nativeElement?.focus();
            });
        }
    }

    /**
     * Switches the expanded state of the dropdown and manages initial focus.
     * @param event Optional event to prevent default interaction behavior.
     * @internal
     */
    protected toggleExpanded(event?: Event): void {
        if (!this.isDisabled()) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            const wasExpanded = this.expanded();
            const isExpanding = !wasExpanded;

            this.expanded.set(isExpanding);

            if (isExpanding) {
                // When opening, reset the filter and set focus appropriately
                this.filterText.set('');
                setTimeout(() => {
                    if (this.filterable()) {
                        this.filterInput()?.nativeElement?.focus();
                    } else {
                        this.listbox()?.focus();
                    }
                });
            } else {
                this.onTouched();
            }
        }
    }

    /**
     * Handles keyboard events on the trigger element to facilitate dropdown interaction.
     * @param event The native keyboard event.
     * @internal
     */
    protected onTriggerKeyDown(event: KeyboardEvent): void {
        if (this.isDisabled()) {
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();

            if (!this.expanded()) {
                this.toggleExpanded();
            } else {
                if (this.filterable()) {
                    this.filterInput()?.nativeElement?.focus();
                } else {
                    this.listbox()?.focus();
                }
            }
        }
    }
}
