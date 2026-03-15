import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

/**
 * Supported visual variants for the button.
 * - 'solid': Filled background with brand color.
 * - 'outline': Bordered with brand color, transparent background.
 * - 'ghost': No border or background, brand color text.
 * - 'icon': Circular button optimized for housing a single icon.
 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'icon';

/**
 * Standardized sizes for the button component.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Color themes based on the design system's palette.
 */
export type ButtonColor = 'primary' | 'secondary' | 'danger';

/**
 * Native HTML button types for form behavior control.
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * AkrButton provides a consistent button design across the application.
 * It can be applied to either `<button>` or `<a>` elements using the `akr-button` attribute.
 *
 * @example
 * ```html
 * <button akr-button variant="solid" color="primary">Click Me</button>
 * <a akr-button href="/docs" variant="outline">Learn More</a>
 * ```
 */
@Component({
    selector: 'button[akr-button], a[akr-button]',
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.type]': 'isButton ? type() : null',
        '[class.akr-button-solid]': 'variant() === "solid"',
        '[class.akr-button-outline]': 'variant() === "outline"',
        '[class.akr-button-ghost]': 'variant() === "ghost"',
        '[class.akr-button-icon]': 'variant() === "icon"',
        '[class.akr-button-sm]': 'size() === "sm"',
        '[class.akr-button-md]': 'size() === "md"',
        '[class.akr-button-lg]': 'size() === "lg"',
        '[class.akr-button-primary]': 'color() === "primary"',
        '[class.akr-button-secondary]': 'color() === "secondary"',
        '[class.akr-button-danger]': 'color() === "danger"',
    },
})
export class AkrButton {
    /**
     * ElementRef
     */
    private readonly elementRef = inject(ElementRef);

    /**
     * Determines if the host element is a native button.
     * @internal
     */
    protected get isButton(): boolean {
        return this.elementRef.nativeElement.tagName === 'BUTTON';
    }

    /**
     * The visual style variant.
     * @default 'solid'
     */
    readonly variant = input<ButtonVariant>('solid');

    /**
     * The size of the button.
     * @default 'md'
     */
    readonly size = input<ButtonSize>('md');

    /**
     * The color theme.
     * @default 'primary'
     */
    readonly color = input<ButtonColor>('primary');

    /**
     * The native HTML type attribute (only applied if the element is a `<button>`).
     * @default 'button'
     */
    readonly type = input<ButtonType>('button');
}
