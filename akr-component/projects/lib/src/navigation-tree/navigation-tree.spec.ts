import { TreeItem } from '@angular/aria/tree';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, Routes } from '@angular/router';
import { AkrNavigationTree, AkrNavigationTreeIcon, TreeNode } from './navigation-tree';

@Component({
    template: `
        <akr-navigation-tree [nodes]="nodes" (selectionChange)="onSelectionChange($event)">
            <ng-template akrNavigationTreeIcon let-node>
                <span class="custom-icon">{{ node.icon }}</span>
            </ng-template>
        </akr-navigation-tree>
    `,
    imports: [AkrNavigationTree, AkrNavigationTreeIcon],
})
class TestHostComponent {
    nodes: TreeNode[] = [
        {
            name: 'Parent 1',
            value: 'p1',
            children: [
                { name: 'Child 1-1', value: 'c1-1', routerLink: '/route1' },
                { name: 'Child 1-2', value: 'c1-2', routerLink: '/route2' },
            ],
        },
        {
            name: 'Parent 2',
            value: 'p2',
            expanded: true,
            children: [{ name: 'Child 2-1', value: 'c2-1', routerLink: '/route3', icon: 'star' }],
        },
        {
            name: 'Disabled Node',
            value: 'disabled',
            disabled: true,
            routerLink: '/disabled-route',
        },
    ];

    selectedNode?: TreeNode;
    onSelectionChange(node: TreeNode) {
        this.selectedNode = node;
    }
}

describe('AkrNavigationTree', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let router: Router;

    const routes: Routes = [
        { path: 'route1', component: class {} },
        { path: 'route2', component: class {} },
        { path: 'route3', component: class {} },
        { path: 'disabled-route', component: class {} },
    ];

    const findItemByName = (name: string) => {
        const items = fixture.debugElement.queryAll(By.directive(TreeItem));
        return items.find((item) => item.nativeElement.textContent.includes(name));
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideRouter(routes)],
        }).compileComponents();

        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the top-level tree nodes', () => {
        const parent1 = findItemByName('Parent 1');
        const parent2 = findItemByName('Parent 2');
        const disabled = findItemByName('Disabled Node');

        expect(parent1).toBeTruthy();
        expect(parent2).toBeTruthy();
        expect(disabled).toBeTruthy();
    });

    it('should initially expand nodes marked as expanded', () => {
        const parent2 = findItemByName('Parent 2');
        expect(parent2?.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should select a node and emit selectionChange when navigating', async () => {
        await router.navigateByUrl('/route1');
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.selectedNode?.value).toBe('c1-1');

        const child1 = findItemByName('Child 1-1');
        expect(child1).toBeTruthy();
        expect(child1?.nativeElement.classList.contains('active')).toBe(true);
    });

    it('should expand ancestors when a child is active via URL', async () => {
        await router.navigateByUrl('/route1');
        fixture.detectChanges();
        await fixture.whenStable();

        const parent1 = findItemByName('Parent 1');
        expect(parent1?.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should not navigate when a node is disabled', async () => {
        const disabledNode = findItemByName('Disabled Node');
        const initialUrl = router.url;

        disabledNode?.nativeElement.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(router.url).toBe(initialUrl);
    });

    it('should render custom icons using the akrNavigationTreeIcon directive', async () => {
        // Child 2-1 is visible because Parent 2 is expanded
        const child21 = findItemByName('Child 2-1');
        expect(child21).toBeTruthy();

        // Check for custom icon
        const icon = child21?.query(By.css('.custom-icon'));
        expect(icon).toBeTruthy();
        expect(icon?.nativeElement.textContent).toBe('star');
    });

    it('should toggle expansion using the toggleExpanded method', async () => {
        const navTree = fixture.debugElement.query(By.directive(AkrNavigationTree))
            .componentInstance as AkrNavigationTree;
        const parent1Node = component.nodes[0];

        expect(navTree.expandedValues().has(parent1Node.value)).toBe(false);

        navTree.toggleExpanded(parent1Node, true);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(navTree.expandedValues().has(parent1Node.value)).toBe(true);

        const parent1Element = findItemByName('Parent 1');
        expect(parent1Element?.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });
});
