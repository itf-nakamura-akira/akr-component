import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButton } from './radio-button';
import { RadioButtonGroup } from './radio-button-group';

@Component({
    standalone: true,
    selector: 'akr-radio-button-group',
    template: '<ng-content />',
})
class MockRadioButtonGroup {
    value = signal<string | undefined>(undefined);
    name = signal<string | null>(null);
    disabled = signal<boolean>(false);
}

describe('RadioButton', () => {
    let component: RadioButton<string>;
    let fixture: ComponentFixture<RadioButton<string>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButton],
            providers: [{ provide: RadioButtonGroup, useClass: MockRadioButtonGroup }],
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButton<string>);
        component = fixture.componentInstance;

        // Provide required value input
        fixture.componentRef.setInput('value', 'test-value');

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle click and select value', () => {
        const group = TestBed.inject(RadioButtonGroup) as unknown as MockRadioButtonGroup;
        const spy = vi.spyOn(group.value, 'set');

        // Simulate click on host
        fixture.nativeElement.click();

        expect(spy).toHaveBeenCalledWith('test-value');
    });

    it('should not select value when disabled', () => {
        const group = TestBed.inject(RadioButtonGroup) as unknown as MockRadioButtonGroup;
        const spy = vi.spyOn(group.value, 'set');

        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();

        // Simulate click on host
        fixture.nativeElement.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it('should not select value when group is disabled', () => {
        const group = TestBed.inject(RadioButtonGroup) as unknown as MockRadioButtonGroup;
        const spy = vi.spyOn(group.value, 'set');

        group.disabled.set(true);
        fixture.detectChanges();

        // Simulate click on host
        fixture.nativeElement.click();

        expect(spy).not.toHaveBeenCalled();
    });
});
