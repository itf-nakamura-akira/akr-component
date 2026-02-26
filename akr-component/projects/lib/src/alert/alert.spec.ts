import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrAlert } from './alert';

describe('AkrAlert', () => {
    let component: AkrAlert;
    let fixture: ComponentFixture<AkrAlert>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrAlert],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrAlert);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
