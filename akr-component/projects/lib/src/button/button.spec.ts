import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrButton, ButtonColor, ButtonSize, ButtonType, ButtonVariant } from './button';

@Component({
    template: `
        <button akr-button [variant]="variant()" [size]="size()" [color]="color()" [type]="type()">Button</button>
        <a akr-button href="#">Link</a>
    `,
    imports: [AkrButton],
})
class TestHostComponent {
    variant = signal<ButtonVariant>('solid');
    size = signal<ButtonSize>('md');
    color = signal<ButtonColor>('primary');
    type = signal<ButtonType>('button');
}

describe('AkrButton', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;
    let buttonEl: HTMLButtonElement;
    let anchorEl: HTMLAnchorElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent, AkrButton],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        buttonEl = fixture.nativeElement.querySelector('button');
        anchorEl = fixture.nativeElement.querySelector('a');
    });

    it('should apply variant classes', () => {
        expect(buttonEl.classList.contains('akr-button-solid')).toBe(true);

        testComponent.variant.set('outline');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-outline')).toBe(true);

        testComponent.variant.set('ghost');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-ghost')).toBe(true);

        testComponent.variant.set('icon');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-icon')).toBe(true);
    });

    it('should apply size classes', () => {
        expect(buttonEl.classList.contains('akr-button-md')).toBe(true);

        testComponent.size.set('sm');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-sm')).toBe(true);

        testComponent.size.set('lg');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-lg')).toBe(true);
    });

    it('should apply color classes', () => {
        expect(buttonEl.classList.contains('akr-button-primary')).toBe(true);

        testComponent.color.set('secondary');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-secondary')).toBe(true);

        testComponent.color.set('danger');
        fixture.detectChanges();
        expect(buttonEl.classList.contains('akr-button-danger')).toBe(true);
    });

    it('should set the type attribute on button elements', () => {
        expect(buttonEl.getAttribute('type')).toBe('button');

        testComponent.type.set('submit');
        fixture.detectChanges();
        expect(buttonEl.getAttribute('type')).toBe('submit');
    });

    it('should not set the type attribute on anchor elements', () => {
        expect(anchorEl.hasAttribute('type')).toBe(false);
    });
});
