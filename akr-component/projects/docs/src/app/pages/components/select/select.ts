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
        { value: 'en', label: 'English (US)' },
        { value: 'ja', label: 'Japanese' },
        { value: 'de', label: 'German' },
        { value: 'fr', label: 'French' },
        { value: 'es', label: 'Spanish' },
    ]);

    /** Current selected language object */
    readonly selectedLanguage = signal<AkrSelectOption | undefined>(this.languageOptions()[1]);

    /** Computed label for selected language */
    readonly selectedLanguageLabel = computed(() => {
        const val = this.selectedLanguage();
        return val ? val.label : 'None';
    });

    /** Task priority options */
    readonly priorityOptions = signal<AkrSelectOption[]>([
        { value: 'high', label: 'High Priority', icon: 'priority_high' },
        { value: 'medium', label: 'Medium Priority', icon: 'low_priority' },
        { value: 'low', label: 'Low Priority', icon: 'horizontal_rule' },
    ]);

    /** Multi-select options (tags) */
    readonly tagOptions = signal<AkrSelectOption[]>([
        { value: 'feat', label: 'Feature' },
        { value: 'bug', label: 'Bug' },
        { value: 'docs', label: 'Documentation' },
        { value: 'enh', label: 'Enhancement' },
        { value: 'design', label: 'Design' },
    ]);

    /** Multi-selected items */
    readonly selectedTags = signal<readonly AkrSelectOption[]>([]);

    /** Computed label for selected tags */
    readonly selectedTagsLabel = computed(() => {
        const val = this.selectedTags();
        return val.length > 0 ? val.map((v) => v.label).join(', ') : 'None';
    });

    /** Country options for filtering example */
    readonly countryOptions = signal<AkrSelectOption[]>([
        { value: 'us', label: 'United States', icon: 'flag' },
        { value: 'jp', label: 'Japan', icon: 'flag' },
        { value: 'gb', label: 'United Kingdom', icon: 'flag' },
        { value: 'de', label: 'Germany', icon: 'flag' },
        { value: 'fr', label: 'France', icon: 'flag' },
        { value: 'it', label: 'Italy', icon: 'flag' },
        { value: 'ca', label: 'Canada', icon: 'flag' },
        { value: 'au', label: 'Australia', icon: 'flag' },
        { value: 'br', label: 'Brazil', icon: 'flag' },
        { value: 'in', label: 'India', icon: 'flag' },
        { value: 'cn', label: 'China', icon: 'flag' },
        { value: 'kr', label: 'South Korea', icon: 'flag' },
    ]);

    /** Current selected country */
    readonly selectedCountry = signal<AkrSelectOption | undefined>(undefined);

    /** Payment method options */
    readonly paymentOptions = signal<AkrSelectOption[]>([
        { value: 'cc', label: 'Credit Card', icon: 'credit_card' },
        { value: 'pp', label: 'PayPal', icon: 'account_balance_wallet' },
        { value: 'ap', label: 'Apple Pay (Coming Soon)', icon: 'payments', disabled: true },
        { value: 'bt', label: 'Bank Transfer (Maintenance)', icon: 'account_balance', disabled: true },
    ]);
}
