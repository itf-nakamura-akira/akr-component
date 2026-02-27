import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AkrIcon } from '../internal/icon/icon';

/**
 * A type that defines the severity of the alert.
 */
export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * Alert Component.
 *
 * An alert component for conveying important messages and feedback to users.
 * Please use them according to the situation.
 */
@Component({
    selector: 'akr-alert',
    imports: [AkrIcon],
    templateUrl: './alert.html',
    styleUrl: './alert.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkrAlert {
    /**
     * Alert severity.
     */
    readonly severity = input.required<AlertSeverity>();

    /**
     * Show Icon.
     */
    readonly showIcon = input<boolean>(true);

    /**
     * Show Close Button.
     */
    readonly closable = input<boolean>(false);

    /**
     * Close button click event.
     */
    readonly closeAlert = output<void>();
}
