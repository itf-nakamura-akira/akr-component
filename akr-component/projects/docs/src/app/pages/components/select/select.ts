import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AkrSelect, AkrSelectIcon, AkrSelectOption } from 'akr-component';

@Component({
    selector: 'app-select',
    imports: [AkrSelect, AkrSelectIcon],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Select {
    basicOptions = signal<AkrSelectOption[]>([
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
    ]);

    iconOptions = signal<AkrSelectOption[]>([
        { value: 'home', label: 'Home', icon: 'home' },
        { value: 'person', label: 'Person', icon: 'person' },
        { value: 'settings', label: 'Settings', icon: 'settings' },
    ]);

    disabledOptions = signal<AkrSelectOption[]>([
        { value: 'available', label: 'Available' },
        { value: 'disabled', label: 'Disabled', disabled: true },
        { value: 'another', label: 'Another Available' },
    ]);

    selected = signal<string | null>(null);

    handleSelection(value: string | null) {
        this.selected.set(value);
    }
}
