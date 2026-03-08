import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AkrAlert } from 'akr-component';

@Component({
    selector: 'app-alert',
    imports: [AkrAlert],
    templateUrl: './alert.html',
    styleUrl: './alert.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Alert {
    readonly showInfoAlert = signal<boolean>(true);

    readonly showSuccessAlert = signal<boolean>(true);

    readonly showWarningAlert = signal<boolean>(true);

    readonly showErrorAlert = signal<boolean>(true);

    resetAlerts() {
        this.showInfoAlert.set(true);
        this.showSuccessAlert.set(true);
        this.showWarningAlert.set(true);
        this.showErrorAlert.set(true);
    }
}
