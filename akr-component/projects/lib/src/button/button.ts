import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

/**
 * Supported visual style variants for the button.
 * - 'solid': Filled background with theme color.
 * - 'outline': Bordered with transparent background.
 * - 'ghost': No border or background.
 * - 'icon': Optimized for housing a single icon in a circular shape.
 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'icon';

/**
 * Standard sizes for the button.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Color themes based on the design system palette.
 */
export type ButtonColor = 'primary' | 'secondary' | 'danger';

/**
 * Native HTML button types for form behavior.
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button Component.
 *
 * Provides a standardized button design. Can be used on `<button>` or `<a>` elements.
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
     * Internal reference to the host element.
     * @internal
     */
    private readonly elementRef = inject(ElementRef);

    /**
     * Whether the host element is a native button element.
     * @internal
     */
    protected get isButton(): boolean {
        return this.elementRef.nativeElement.tagName === 'BUTTON';
    }

    /**
     * The visual style variant of the button.
     * @default 'solid'
     */
    readonly variant = input<ButtonVariant>('solid');

    /**
     * The size of the button.
     * @default 'md'
     */
    readonly size = input<ButtonSize>('md');

    /**
     * The color theme of the button.
     * @default 'primary'
     */
    readonly color = input<ButtonColor>('primary');

    /**
     * The native HTML type attribute (applied only to `<button>` elements).
     * @default 'button'
     */
    readonly type = input<ButtonType>('button');
}
