import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AkrSelect, AkrSelectOption, AkrSelectOptionIcon } from 'akr-component';

@Component({
    selector: 'app-select-doc',
    imports: [AkrSelect, AkrSelectOptionIcon],
    templateUrl: './select.html',
    styleUrl: './select.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectDoc {
    /** Language selection options */
    readonly languageOptions = signal<AkrSelectOption[]>([
        { value: 'English (US)' },
        { value: 'Japanese' },
        { value: 'German' },
        { value: 'French' },
        { value: 'Spanish' },
    ]);

    /** Current selected language object */
    readonly selectedLanguage = signal<AkrSelectOption | undefined>(this.languageOptions()[1]);

    /** Computed label for selected language */
    readonly selectedLanguageLabel = computed(() => {
        const val = this.selectedLanguage();
        return val ? val.value : 'None';
    });

    /** Task priority options */
    readonly priorityOptions = signal<AkrSelectOption[]>([
        { value: 'High Priority', icon: 'priority_high' },
        { value: 'Medium Priority', icon: 'low_priority' },
        { value: 'Low Priority', icon: 'horizontal_rule' },
    ]);

    /** Multi-selected priorities */
    readonly selectedPriorities = signal<AkrSelectOption[]>([]);

    /** Computed label for selected priorities */
    readonly selectedPrioritiesLabel = computed(() => {
        const val = this.selectedPriorities();
        return val.length > 0 ? val.map((v) => v.value).join(', ') : 'None';
    });

    /** Payment method options */
    readonly paymentOptions = signal<AkrSelectOption[]>([
        { value: 'Credit Card', icon: 'credit_card' },
        { value: 'PayPal', icon: 'account_balance_wallet' },
        { value: 'Apple Pay (Coming Soon)', icon: 'payments', disabled: true },
        { value: 'Bank Transfer (Maintenance)', icon: 'account_balance', disabled: true },
    ]);
}
