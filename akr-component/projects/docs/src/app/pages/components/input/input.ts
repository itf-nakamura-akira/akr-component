import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AKR_FORM_FIELD_REQUIRED_MARK, AkrFormField, AkrInput } from 'akr-component';

@Component({
    selector: 'app-input-custom-required',
    imports: [AkrInput, AkrFormField],
    template: `
        <akr-form-field label="Custom Required Mark" [required]="true">
            <input akr-input placeholder="Look at the label!" />
        </akr-form-field>
    `,
    providers: [
        {
            provide: AKR_FORM_FIELD_REQUIRED_MARK,
            useValue: '(required)',
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCustomRequired {}

@Component({
    selector: 'app-input',
    imports: [AkrInput, AkrFormField, InputCustomRequired],
    templateUrl: './input.html',
    styleUrl: './input.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Input {}
