import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AkrSelect, AkrSelectOption } from './select';

describe('AkrSelect', () => {
    let component: AkrSelect;
    let fixture: ComponentFixture<AkrSelect>;

    const mockOptions: AkrSelectOption[] = [{ value: 'Option 1' }, { value: 'Option 2' }, { value: 'Option 3' }];

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
        // Open the popup
        component['toggleExpanded']();
        fixture.detectChanges();

        // Find and click the first option
        const firstOption = mockOptions[0];
        component['onSelectionChange']({ value: [firstOption] } as any);
        fixture.detectChanges();

        expect(component.selected()).toEqual(firstOption);
        expect(component['expanded']()).toBe(false);
    });

    it('should allow multiple selections when multiple is true', () => {
        fixture.componentRef.setInput('multiple', true);
        fixture.detectChanges();

        const selections = [mockOptions[0], mockOptions[1]];
        component['onSelectionChange']({ value: selections } as any);
        fixture.detectChanges();

        expect(component.selected()).toEqual(selections);
        // Popup stays open in multiple mode usually, but check current implementation
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
