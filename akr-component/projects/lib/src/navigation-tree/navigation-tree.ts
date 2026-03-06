import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    contentChild,
    DestroyRef,
    Directive,
    effect,
    inject,
    input,
    output,
    signal,
    TemplateRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { AkrIcon } from '../internal/icon/icon';

/**
 * Interface for a tree node.
 */
export interface TreeNode {
    name: string;
    value: string;
    icon?: string;
    children?: TreeNode[];
    disabled?: boolean;
    expanded?: boolean;
    routerLink?: string | any[];
}

/**
 * Directive to provide a custom icon for navigation tree nodes.
 */
@Directive({
    selector: '[akrNavigationTreeIcon]',
})
export class AkrNavigationTreeIcon {
    /**
     * The template reference for the custom icon.
     */
    readonly template = inject<TemplateRef<{ $implicit: TreeNode }>>(TemplateRef);
}

/**
 * Navigation Tree Component.
 *
 * This component displays a hierarchical navigation tree.
 */
@Component({
    selector: 'akr-navigation-tree',
    imports: [Tree, TreeItem, TreeItemGroup, NgTemplateOutlet, AkrIcon, RouterLink],
    templateUrl: './navigation-tree.html',
    styleUrl: './navigation-tree.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkrNavigationTree {
    /**
     * Router
     */
    private readonly router = inject(Router);

    /**
     * DestroyRef
     */
    private readonly destroyRef = inject(DestroyRef);

    /**
     * The list of tree nodes to display.
     */
    readonly nodes = input<TreeNode[]>();

    /**
     * Event emitted when a node is selected.
     */
    readonly select = output<TreeNode>();

    /**
     * The selected node value.
     */
    readonly selected = signal<string[]>([]);

    /**
     * Custom icon template provided via content projection.
     */
    readonly customIcon = contentChild(AkrNavigationTreeIcon);

    /**
     * Constructor
     */
    constructor() {
        // Update selection state when route changes.
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => this.syncSelectionWithRoute());

        // Also runs when the node is loaded.
        effect(() => {
            if (this.nodes()) {
                this.syncSelectionWithRoute();
            }
        });
    }

    /**
     * Synchronizes the tree selection with the current router state.
     */
    private syncSelectionWithRoute(): void {
        const nodes = this.nodes();

        if (!nodes) {
            return;
        }

        this.findAndSelectActiveNode(nodes);
    }

    /**
     * Recursively finds the active node based on the current router state and updates selection.
     *
     * @param nodes The list of tree nodes to search.
     * @returns True if an active node was found and selected, false otherwise.
     */
    private findAndSelectActiveNode(nodes: TreeNode[]): boolean {
        for (const node of nodes) {
            if (node.routerLink) {
                const urlTree = this.router.createUrlTree(
                    Array.isArray(node.routerLink) ? node.routerLink : [node.routerLink],
                );

                if (
                    this.router.isActive(urlTree, {
                        paths: 'exact',
                        queryParams: 'ignored',
                        fragment: 'ignored',
                        matrixParams: 'ignored',
                    })
                ) {
                    this.selected.set([node.value]);

                    return true;
                }
            }

            // Expand parent if child is active.
            if (node.children && this.findAndSelectActiveNode(node.children)) {
                node.expanded = true;

                return true;
            }
        }

        return false;
    }
}
