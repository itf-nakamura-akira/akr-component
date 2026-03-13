import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrInput } from './input';

describe('AkrInput', () => {
    let component: AkrInput;
    let fixture: ComponentFixture<AkrInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrInput],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrInput);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an auto-generated id', () => {
        expect(component.id()).toMatch(/^akr-input-\d+$/);
        expect(fixture.nativeElement.id).toBe(component.id());
    });

    it('should use provided id', () => {
        fixture.componentRef.setInput('id', 'custom-id');
        fixture.detectChanges();
        expect(component.id()).toBe('custom-id');
        expect(fixture.nativeElement.id).toBe('custom-id');
    });

    it('should apply invalid class when invalid is true', () => {
        fixture.componentRef.setInput('invalid', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('akr-input-invalid')).toBe(true);
    });
});
