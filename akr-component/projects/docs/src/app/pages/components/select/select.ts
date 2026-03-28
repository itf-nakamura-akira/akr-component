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
        { value: 'Home', icon: 'home' },
        { value: 'Person', icon: 'person' },
        { value: 'Settings', icon: 'settings' },
    ]);
}
