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
});
