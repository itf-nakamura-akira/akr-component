import { ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AkrSelect, AkrSelectOption } from './select';

@Component({
    standalone: true,
    imports: [AkrSelect, ReactiveFormsModule],
    template: `<akr-select [options]="options" [formControl]="control"></akr-select>`,
})
class TestWrapper {
    options: AkrSelectOption[] = [
        { value: 'opt1', label: 'Apple' },
        { value: 'opt2', label: 'Banana' },
    ];
    control = new FormControl<unknown>(null);
}

describe('AkrSelect', () => {
    let component: AkrSelect;
    let fixture: ComponentFixture<AkrSelect>;

    const mockOptions: AkrSelectOption[] = [
        { value: 'opt1', label: 'Apple' },
        { value: 'opt2', label: 'Banana' },
        { value: 'opt3', label: 'Cherry' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrSelect, ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrSelect);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('options', mockOptions);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
        expect(component.selected()).toBeUndefined();
        expect(component.multiple()).toBe(false);
        expect(component.disabled()).toBe(false);
        expect(component.filterable()).toBe(false);
    });

    it('should toggle the expanded state when the trigger is clicked', () => {
        const trigger = fixture.debugElement.query(By.css('.akr-select-trigger'));

        expect(component['expanded']()).toBe(false);

        trigger.nativeElement.click();
        fixture.detectChanges();
        expect(component['expanded']()).toBe(true);

        trigger.nativeElement.click();
        fixture.detectChanges();
        expect(component['expanded']()).toBe(false);
    });

    it('should select an option value and close the popup in single selection mode', async () => {
        component['toggleExpanded']();
        fixture.detectChanges();

        const firstOption = mockOptions[0];
        const event = { value: [firstOption.value] } as unknown as ListboxValueChangeEvent<unknown>;
        component['onSelectionChange'](event);
        fixture.detectChanges();

        expect(component.selected()).toEqual(firstOption.value);
        expect(component['expanded']()).toBe(false);
    });

    it('should allow multiple selections of values when multiple is true', () => {
        fixture.componentRef.setInput('multiple', true);
        fixture.detectChanges();

        const selectionValues = [mockOptions[0].value, mockOptions[1].value];
        const event = { value: selectionValues } as unknown as ListboxValueChangeEvent<unknown>;
        component['onSelectionChange'](event);
        fixture.detectChanges();

        expect(component.selected()).toEqual(selectionValues);
    });

    it('should display the placeholder when no option is selected', () => {
        const placeholderText = 'Select something';
        fixture.componentRef.setInput('placeholder', placeholderText);
        fixture.detectChanges();

        const valueElement = fixture.debugElement.query(By.css('.akr-select-value'));
        expect(valueElement.nativeElement.textContent).toContain(placeholderText);
    });

    describe('Filtering', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('filterable', true);
            fixture.detectChanges();
        });

        it('should show the filter input when filterable is true', () => {
            component['toggleExpanded']();
            fixture.detectChanges();

            const filterInput = fixture.debugElement.query(By.css('input[akr-input]'));
            expect(filterInput).toBeTruthy();
        });

        it('should filter options based on label', () => {
            component['filterText'].set('ba');
            fixture.detectChanges();

            const filtered = component['filteredOptions']();
            expect(filtered.length).toBe(1);
            expect(filtered[0].label).toBe('Banana');
        });

        it('should be case-insensitive when filtering', () => {
            component['filterText'].set('APPLE');
            fixture.detectChanges();

            const filtered = component['filteredOptions']();
            expect(filtered.length).toBe(1);
            expect(filtered[0].label).toBe('Apple');
        });

        it('should return all options when filter text is empty', () => {
            component['filterText'].set('');
            fixture.detectChanges();

            expect(component['filteredOptions']().length).toBe(mockOptions.length);
        });

        it('should reset filter text when expanding the dropdown', async () => {
            component['filterText'].set('some query');

            // Close and reopen
            component['expanded'].set(false);
            fixture.detectChanges();

            component['toggleExpanded']();
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component['filterText']()).toBe('');
        });
    });

    it('should disable the trigger when the disabled input is true', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();

        const trigger = fixture.debugElement.query(By.css('.akr-select-trigger'));
        trigger.nativeElement.click();
        fixture.detectChanges();

        expect(component['expanded']()).toBe(false);
    });

    describe('FormControl Integration', () => {
        let wrapperFixture: ComponentFixture<TestWrapper>;
        let wrapperComponent: TestWrapper;
        let selectComponent: AkrSelect;

        beforeEach(async () => {
            wrapperFixture = TestBed.createComponent(TestWrapper);
            wrapperComponent = wrapperFixture.componentInstance;
            wrapperFixture.detectChanges();
            await wrapperFixture.whenStable();

            selectComponent = wrapperFixture.debugElement.query(By.directive(AkrSelect)).componentInstance;
        });

        it('should synchronize value from FormControl to AkrSelect', () => {
            const option = wrapperComponent.options[1];
            wrapperComponent.control.setValue(option.value);
            wrapperFixture.detectChanges();

            expect(selectComponent.selected()).toEqual(option.value);
        });

        it('should synchronize value from AkrSelect to FormControl', () => {
            const option = wrapperComponent.options[0];
            const event = { value: [option.value] } as unknown as ListboxValueChangeEvent<unknown>;
            selectComponent['onSelectionChange'](event);
            wrapperFixture.detectChanges();

            expect(wrapperComponent.control.value).toEqual(option.value);
        });

        it('should synchronize disabled state from FormControl to AkrSelect', () => {
            wrapperComponent.control.disable();
            wrapperFixture.detectChanges();

            expect(selectComponent['isDisabled']()).toBe(true);

            wrapperComponent.control.enable();
            wrapperFixture.detectChanges();

            expect(selectComponent['isDisabled']()).toBe(false);
        });

        it('should mark the control as touched when the dropdown is closed', () => {
            expect(wrapperComponent.control.touched).toBe(false);

            selectComponent['toggleExpanded'](); // Open
            wrapperFixture.detectChanges();
            selectComponent['toggleExpanded'](); // Close
            wrapperFixture.detectChanges();

            expect(wrapperComponent.control.touched).toBe(true);
        });
    });
});
