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

@Component({
    standalone: true,
    imports: [RadioButton],
    template: `
        <akr-radio-button value="test">
            <span akr-radio-title>Test Title</span>
            <span akr-radio-description>Test Description</span>
            Default Content
        </akr-radio-button>
    `,
    providers: [{ provide: RadioButtonGroup, useClass: MockRadioButtonGroup }],
})
class TestHostComponent {}

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

    it('should apply variant attribute', () => {
        fixture.componentRef.setInput('variant', 'card');
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector('.akr-radio-host');
        expect(host.getAttribute('data-variant')).toBe('card');
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

    describe('Content Projection', () => {
        let hostFixture: ComponentFixture<TestHostComponent>;

        beforeEach(async () => {
            hostFixture = TestBed.createComponent(TestHostComponent);
            hostFixture.detectChanges();
            await hostFixture.whenStable();
        });

        it('should project title and description into correct slots', () => {
            const title = hostFixture.nativeElement.querySelector('.akr-radio-title');
            const description = hostFixture.nativeElement.querySelector('.akr-radio-description');
            const content = hostFixture.nativeElement.querySelector('.akr-radio-content');

            expect(title.textContent).toContain('Test Title');
            expect(description.textContent).toContain('Test Description');
            expect(content.textContent).toContain('Default Content');
        });
    });
});
