import { ComponentFixture, TestBed } from '@angular/core/testing';
import NavigationTree from './navigation-tree';

describe('NavigationTree', () => {
    let component: NavigationTree;
    let fixture: ComponentFixture<NavigationTree>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationTree],
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationTree);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
