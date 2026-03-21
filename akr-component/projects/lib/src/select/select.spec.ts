import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrSelect } from './select';

describe('AkrSelect', () => {
    let component: AkrSelect;
    let fixture: ComponentFixture<AkrSelect>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrSelect],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrSelect);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
