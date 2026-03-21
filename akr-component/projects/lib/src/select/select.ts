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
    inject,
    input,
    model,
    signal,
    TemplateRef,
    viewChild,
    viewChildren,
} from '@angular/core';
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
        '[attr.aria-disabled]': "disabled() ? 'true' : 'false'",
        class: 'akr-select',
    },
})
export class AkrSelect {
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
     * Normalizes the `selected` value into a consistent array for internal rendering.
     * @internal
     */
    protected readonly selectedItems = computed(() => {
        const val = this.selected();

        if (!val) {
            return [];
        }

        return Array.isArray(val) ? (val as AkrSelectOption[]) : [val as AkrSelectOption];
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
     * Supports two-way binding. If `multiple` is true, this will be a readonly array of options.
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
     * Synchronizes the selection state when values are picked from the CDK listbox.
     * @param event The value change event emitted by the listbox.
     * @internal
     */
    protected onSelectionChange(event: ListboxValueChangeEvent<AkrSelectOption>): void {
        if (this.multiple()) {
            this.selected.set(event.value);
        } else {
            this.selected.set(event.value[0]);
            this.expanded.set(false);

            // Focus return management for single selection
            setTimeout(() => {
                this.trigger()?.nativeElement?.focus();
            });
        }
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
        if (!this.disabled()) {
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
            }
        }
    }

    /**
     * Handles keyboard events on the trigger element to facilitate dropdown interaction.
     * @param event The native keyboard event.
     * @internal
     */
    protected onTriggerKeyDown(event: KeyboardEvent): void {
        if (this.disabled()) {
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
