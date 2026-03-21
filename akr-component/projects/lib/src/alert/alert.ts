import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AkrIcon } from '../internal/icon/icon';

/**
 * Severity levels for the alert component.
 * - 'info': Informational messages.
 * - 'success': Success confirmation.
 * - 'warning': Warning alerts.
 * - 'error': Error or failure alerts.
 */
export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * Alert Component.
 *
 * Provides a way to display important messages and feedback to users with different severity levels.
 *
 * @example
 * ```html
 * <akr-alert severity="success">Operation completed successfully!</akr-alert>
 * <akr-alert severity="error" [closable]="true">Failed to save changes.</akr-alert>
 * ```
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
     * The severity level of the alert.
     * Required input.
     */
    readonly severity = input.required<AlertSeverity>();

    /**
     * Whether to show the severity icon.
     * @default true
     */
    readonly showIcon = input<boolean>(true);

    /**
     * Whether the alert can be closed by the user.
     * If true, a close button is displayed.
     * @default false
     */
    readonly closable = input<boolean>(false);

    /**
     * Event emitted when the close button is clicked.
     */
    readonly closeAlert = output<void>();
}
