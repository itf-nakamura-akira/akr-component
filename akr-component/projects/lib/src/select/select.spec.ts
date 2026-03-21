import { ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AkrSelect, AkrSelectOption } from './select';

describe('AkrSelect', () => {
    let component: AkrSelect;
    let fixture: ComponentFixture<AkrSelect>;

    const mockOptions: AkrSelectOption[] = [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
        { value: 'opt3', label: 'Option 3' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrSelect],
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

    it('should select an option and close the popup in single selection mode', async () => {
        component['toggleExpanded']();
        fixture.detectChanges();

        const firstOption = mockOptions[0];
        // Create a mock event by casting through unknown to bypass strict property checks
        const event = { value: [firstOption] } as unknown as ListboxValueChangeEvent<AkrSelectOption>;
        component['onSelectionChange'](event);
        fixture.detectChanges();

        expect(component.selected()).toEqual(firstOption);
        expect(component['expanded']()).toBe(false);
    });

    it('should allow multiple selections when multiple is true', () => {
        fixture.componentRef.setInput('multiple', true);
        fixture.detectChanges();

        const selections = [mockOptions[0], mockOptions[1]];
        // Create a mock event by casting through unknown
        const event = { value: selections } as unknown as ListboxValueChangeEvent<AkrSelectOption>;
        component['onSelectionChange'](event);
        fixture.detectChanges();

        expect(component.selected()).toEqual(selections);
        expect(component['expanded']()).toBe(false);
    });

    it('should display the placeholder when no option is selected', () => {
        const placeholderText = 'Select something';
        fixture.componentRef.setInput('placeholder', placeholderText);
        fixture.detectChanges();

        const valueElement = fixture.debugElement.query(By.css('.akr-select-value'));
        expect(valueElement.nativeElement.textContent).toContain(placeholderText);
    });

    it('should disable the trigger when the disabled input is true', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();

        const trigger = fixture.debugElement.query(By.css('.akr-select-trigger'));
        trigger.nativeElement.click();
        fixture.detectChanges();

        expect(component['expanded']()).toBe(false);
    });
});
