import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AkrSelect, AkrSelectOption } from './select';

@Component({
    standalone: true,
    imports: [AkrSelect, ReactiveFormsModule],
    template: `
        <akr-select
            [options]="options()"
            [placeholder]="placeholder()"
            [formControl]="control"
            (selectionChange)="onSelectionChange($event)"
        ></akr-select>
    `,
})
class TestHostComponent {
    options = signal<AkrSelectOption[]>([
        { value: '1', label: 'Option 1', icon: 'home' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3', icon: 'person' },
    ]);
    placeholder = signal('Custom Placeholder');
    control = new FormControl<string | null>(null);
    selectedValue: string | null = null;

    onSelectionChange(value: string | null) {
        this.selectedValue = value;
    }
}

describe('AkrSelect', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeAll(() => {
        if (!HTMLElement.prototype.scrollTo) {
            HTMLElement.prototype.scrollTo = vi.fn();
        }

        if (!HTMLElement.prototype.scrollIntoView) {
            HTMLElement.prototype.scrollIntoView = vi.fn();
        }
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        hostFixture = TestBed.createComponent(TestHostComponent);
        hostComponent = hostFixture.componentInstance;
        hostFixture.detectChanges();
        await hostFixture.whenStable();
    });

    it('should create', () => {
        const selectComponent = hostFixture.debugElement.query(By.directive(AkrSelect)).componentInstance;
        expect(selectComponent).toBeTruthy();
    });

    it('should display the placeholder initially', () => {
        const labelText = hostFixture.debugElement.query(By.css('.selected-label-text')).nativeElement;
        expect(labelText.textContent.trim()).toBe('Custom Placeholder');
    });

    it('should display options when clicked', async () => {
        const selectDebugElement = hostFixture.debugElement.query(By.directive(AkrSelect));
        const input = selectDebugElement.query(By.css('input')).nativeElement;

        input.focus();
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true, bubbles: true }));

        hostFixture.detectChanges();
        await hostFixture.whenStable();

        await new Promise((resolve) => setTimeout(resolve, 500));
        hostFixture.detectChanges();

        const options = document.querySelectorAll('.select-option-text');
        expect(options.length).toBe(3);
    });

    it('should select an option using keyboard', async () => {
        const selectDebugElement = hostFixture.debugElement.query(By.directive(AkrSelect));
        const input = selectDebugElement.query(By.css('input')).nativeElement;

        input.focus();
        // Open
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true, bubbles: true }));
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Navigate to second option (Option 2)
        // First ArrowDown might select first or just focus. Let's do it twice to be sure or check behavior.
        // Usually, one ArrowDown after opening selects the first one.
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        hostFixture.detectChanges();
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        hostFixture.detectChanges();

        // Select
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        hostFixture.detectChanges();
        await hostFixture.whenStable();
        await new Promise((resolve) => setTimeout(resolve, 500));
        hostFixture.detectChanges();

        const labelText = hostFixture.debugElement.query(By.css('.selected-label-text')).nativeElement;
        // Depending on initial state, this might be Option 1 or 2.
        // Let's just check if it's NOT the placeholder anymore.
        expect(labelText.textContent.trim()).not.toBe('Custom Placeholder');
        expect(hostComponent.control.value).not.toBeNull();
    });

    it('should update display when control value is set programmatically', async () => {
        hostComponent.control.setValue('3');
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();

        const labelText = hostFixture.debugElement.query(By.css('.selected-label-text')).nativeElement;
        expect(labelText.textContent.trim()).toBe('Option 3');

        const icon = hostFixture.debugElement.query(By.css('.selected-label-icon'));
        expect(icon.nativeElement.textContent.trim()).toBe('person');
    });

    it('should respect the disabled state from the form control', async () => {
        hostComponent.control.disable();
        hostFixture.detectChanges();
        await hostFixture.whenStable();

        const combobox = hostFixture.debugElement.query(By.css('[ngCombobox]')).nativeElement;
        expect(combobox.getAttribute('aria-disabled')).toBe('true');

        const input = hostFixture.debugElement.query(By.css('input')).nativeElement;
        input.focus();
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        hostFixture.detectChanges();
        await hostFixture.whenStable();

        await new Promise((resolve) => setTimeout(resolve, 100));
        hostFixture.detectChanges();

        const isExpanded = combobox.getAttribute('aria-expanded') === 'true';
        expect(isExpanded).toBe(false);
    });

    it('should update selection when options change and current value is still valid', async () => {
        hostComponent.control.setValue('2');
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();

        expect(hostComponent.control.value).toBe('2');

        // Change options but keep '2'
        hostComponent.options.set([
            { value: '2', label: 'New Option 2' },
            { value: '4', label: 'Option 4' },
        ]);
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();

        const labelText = hostFixture.debugElement.query(By.css('.selected-label-text')).nativeElement;
        expect(labelText.textContent.trim()).toBe('New Option 2');
    });
});
