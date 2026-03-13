import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioButton } from './radio-button';

@Component({
    standalone: true,
    imports: [RadioButton],
    template: `
        <input akr-radio-button type="radio" id="radio-match" />
        <input akr-radio-button type="text" id="text-no-match" />
        <input akr-radio-button id="no-type-no-match" />
    `,
})
class HostComponent {}

describe('RadioButton', () => {
    let component: RadioButton;
    let fixture: ComponentFixture<RadioButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioButton, HostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RadioButton);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Selector matching', () => {
        let hostFixture: ComponentFixture<HostComponent>;

        beforeEach(async () => {
            hostFixture = TestBed.createComponent(HostComponent);
            hostFixture.detectChanges();
            await hostFixture.whenStable();
        });

        it('should match when type="radio" is present', () => {
            const debugElement = hostFixture.debugElement.query(By.css('#radio-match'));
            const instance = debugElement.injector.get(RadioButton, null);
            expect(instance).toBeTruthy();
        });

        it('should not match when type="text" is present', () => {
            const debugElement = hostFixture.debugElement.query(By.css('#text-no-match'));
            const instance = debugElement.injector.get(RadioButton, null);
            expect(instance).toBeNull();
        });

        it('should not match when type is missing', () => {
            const debugElement = hostFixture.debugElement.query(By.css('#no-type-no-match'));
            const instance = debugElement.injector.get(RadioButton, null);
            expect(instance).toBeNull();
        });
    });
});
