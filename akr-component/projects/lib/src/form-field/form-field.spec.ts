import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrInput } from '../input/input';
import { AkrFormField } from './form-field';

@Component({
    template: `
        <akr-form-field [label]="label()">
            <input akr-input [invalid]="invalid()" [errorMessage]="errorMessage()" [hintMessage]="hintMessage()" />
        </akr-form-field>
    `,
    imports: [AkrFormField, AkrInput],
})
class TestHostComponent {
    readonly label = signal('Test Label');
    readonly invalid = signal(false);
    readonly errorMessage = signal('Error Message');
    readonly hintMessage = signal('Hint Message');
}

describe('AkrFormField', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrFormField, AkrInput, TestHostComponent],
        }).compileComponents();

        hostFixture = TestBed.createComponent(TestHostComponent);
        hostComponent = hostFixture.componentInstance;
        hostFixture.detectChanges();
    });

    it('should create', () => {
        const formField = hostFixture.nativeElement.querySelector('akr-form-field');
        expect(formField).toBeTruthy();
    });

    it('should show label when provided', () => {
        const label = hostFixture.nativeElement.querySelector('.form-field-label');
        expect(label.textContent.trim()).toBe('Test Label');
    });

    it('should apply invalid class to host and show error message when input is invalid', () => {
        hostComponent.invalid.set(true);
        hostFixture.detectChanges();

        const formField = hostFixture.nativeElement.querySelector('akr-form-field');
        expect(formField.classList.contains('akr-form-field-invalid')).toBe(true);

        const error = hostFixture.nativeElement.querySelector('.form-field-error');
        expect(error.textContent.trim()).toBe('Error Message');

        const hint = hostFixture.nativeElement.querySelector('.form-field-hint');
        expect(hint).toBeFalsy();
    });

    it('should show hint message when input is valid', () => {
        hostComponent.invalid.set(false);
        hostFixture.detectChanges();

        const hint = hostFixture.nativeElement.querySelector('.form-field-hint');
        expect(hint.textContent.trim()).toBe('Hint Message');

        const error = hostFixture.nativeElement.querySelector('.form-field-error');
        expect(error).toBeFalsy();
    });

    it('should hide hint message when hintMessage is empty', () => {
        hostComponent.invalid.set(false);
        hostComponent.hintMessage.set('');
        hostFixture.detectChanges();

        const hint = hostFixture.nativeElement.querySelector('.form-field-hint');
        expect(hint).toBeFalsy();
    });
});
