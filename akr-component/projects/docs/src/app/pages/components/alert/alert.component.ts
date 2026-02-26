import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AkrAlert } from 'akr-component';

@Component({
    selector: 'app-alert',
    imports: [AkrAlert],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertComponent {}
