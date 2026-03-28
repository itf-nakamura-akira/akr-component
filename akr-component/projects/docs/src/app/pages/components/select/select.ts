import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AkrSelect } from 'akr-component';

@Component({
    selector: 'app-select',
    imports: [AkrSelect],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Select {
    options = signal([
        { label: 'Option 1', value: 1, icon: 'home' },
        { label: 'Option 2', value: 2, icon: 'person' },
        { label: 'Option 3', value: 3, icon: 'settings' },
    ]);
}
