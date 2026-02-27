import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrAlert } from './alert';

@Component({
    template: `<akr-alert severity="info">Test message</akr-alert>`,
    imports: [AkrAlert],
})
class TestHostComponent {}

describe('AkrAlert', () => {
    let component: AkrAlert;
    let fixture: ComponentFixture<AkrAlert>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrAlert],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrAlert);
        component = fixture.componentInstance;
        // Set required inputs
        fixture.componentRef.setInput('severity', 'info');
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show icon by default', () => {
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('.alert-icon');
        expect(icon).toBeTruthy();
    });

    it('should hide icon when showIcon is false', () => {
        fixture.componentRef.setInput('showIcon', false);
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('.alert-icon');
        expect(icon).toBeFalsy();
    });

    it('should not show close button by default', () => {
        fixture.detectChanges();
        const closeButton = fixture.nativeElement.querySelector('.alert-close');
        expect(closeButton).toBeFalsy();
    });

    it('should show close button when closable is true', () => {
        fixture.componentRef.setInput('closable', true);
        fixture.detectChanges();
        const closeButton = fixture.nativeElement.querySelector('.alert-close');
        expect(closeButton).toBeTruthy();
    });

    it('should emit closeAlert event when close button is clicked', () => {
        const spy = vi.spyOn(component.closeAlert, 'emit');
        fixture.componentRef.setInput('closable', true);
        fixture.detectChanges();
        const closeButton = fixture.nativeElement.querySelector('.alert-close');
        closeButton.click();
        expect(spy).toHaveBeenCalled();
    });

    it('should apply correct severity class', () => {
        const severities: (AkrAlert['severity'] extends () => infer T ? T : never)[] = [
            'info',
            'success',
            'warning',
            'error',
        ];
        for (const sev of severities) {
            fixture.componentRef.setInput('severity', sev);
            fixture.detectChanges();
            const alertElement = fixture.nativeElement.querySelector('.alert');
            expect(alertElement.classList.contains(`alert-${sev}`)).toBe(true);
        }
    });

    it('should render projected content', async () => {
        const hostFixture = TestBed.createComponent(TestHostComponent);
        hostFixture.detectChanges();
        const alertMessage = hostFixture.nativeElement.querySelector('.alert-message');
        expect(alertMessage.textContent).toContain('Test message');
    });
});
