import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrIcon, IconName } from './icon';

describe('AkrIcon', () => {
    let component: AkrIcon;
    let fixture: ComponentFixture<AkrIcon>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrIcon],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrIcon);
        component = fixture.componentInstance;
        // Set required inputs
        fixture.componentRef.setInput('name', 'info');
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render SVG element', () => {
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg).toBeTruthy();
    });

    const iconNames: IconName[] = ['info', 'success', 'warning', 'error', 'close'];
    iconNames.forEach((iconName) => {
        it(`should render ${iconName} icon`, () => {
            fixture.componentRef.setInput('name', iconName);
            fixture.detectChanges();
            const svg = fixture.nativeElement.querySelector('svg');
            expect(svg).toBeTruthy();
        });
    });
});
