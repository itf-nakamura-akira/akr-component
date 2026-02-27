import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A type that defines the icon name.
 */
export type IconName = 'info' | 'success' | 'warning' | 'error' | 'close';

/**
 * Internal Icon Component.
 *
 * This component is used internally by the library and is not exposed to the public API.
 */
@Component({
    selector: 'akr-icon',
    imports: [],
    templateUrl: './icon.html',
    styleUrl: './icon.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkrIcon {
    /**
     * Icon name.
     */
    readonly name = input.required<IconName>();
}
