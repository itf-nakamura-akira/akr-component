import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkrNavigationTree } from './navigation-tree';

describe('NavigationTree', () => {
    let component: AkrNavigationTree;
    let fixture: ComponentFixture<AkrNavigationTree>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AkrNavigationTree],
        }).compileComponents();

        fixture = TestBed.createComponent(AkrNavigationTree);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
