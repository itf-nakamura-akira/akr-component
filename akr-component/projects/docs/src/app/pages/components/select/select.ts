import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AkrSelect, AkrSelectOption } from 'akr-component';

@Component({
    selector: 'app-select',
    imports: [AkrSelect],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Select {
    options = signal<AkrSelectOption[]>([
        { value: 'home', label: 'Home', icon: 'home' },
        { value: 'person', label: 'Person', icon: 'person' },
        { value: 'settings', label: 'Settings', icon: 'settings' },
    ]);
}
