import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    Directive,
    effect,
    inject,
    input,
    output,
    Signal,
    signal,
    TemplateRef,
} from '@angular/core';
import { isActive, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AkrIcon } from '../internal/icon/icon';

/**
 * Interface for a tree node.
 */
export interface TreeNode {
    /**
     * The display name of the node.
     */
    name: string;

    /**
     *  The unique value identifier for the node.
     */
    value: string;

    /**
     * Optional icon name for the node.
     */
    icon?: string;

    /**
     * Optional child nodes for nested structure.
     */
    children?: TreeNode[];

    /**
     * Whether the node is disabled.
     */
    disabled?: boolean;

    /**
     * Whether the node is expanded (for parent nodes).
     */
    expanded?: boolean;

    /**
     * The route to navigate to when the node is clicked.
     */
    routerLink?: string | unknown[];
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
    imports: [Tree, TreeItem, TreeItemGroup, NgTemplateOutlet, AkrIcon, RouterLink, RouterLinkActive],
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
     * Flattened nodes with their isActive signals.
     */
    private readonly nodeStatusList = computed<{ node: TreeNode; active: () => boolean }[]>(() => {
        const nodes: TreeNode[] = this.nodes() ?? [];

        return this.flattenNodes(nodes);
    });

    /**
     * The currently active node in the tree based on the router URL.
     */
    private readonly activeNode = computed(() => this.nodeStatusList().find((status) => status.active())?.node);

    /**
     * The currently selected node object.
     */
    private readonly selectedNode = computed(() => {
        const selected: string[] = this.selected();

        if (selected.length === 0) {
            return undefined;
        }

        return this.findNodeByValue(this.nodes() ?? [], selected[0]);
    });

    /**
     * The list of tree nodes to display.
     */
    readonly nodes = input<TreeNode[]>();

    /**
     * Event emitted when a node is selected.
     */
    readonly selectionChange = output<TreeNode>();

    /**
     * The selected node value.
     */
    readonly selected = signal<string[]>([]);

    /**
     * The values of expanded nodes.
     */
    readonly expandedValues = signal<Set<string>>(new Set());

    /**
     * Custom icon template provided via content projection.
     */
    readonly customIcon: Signal<AkrNavigationTreeIcon | undefined> = contentChild(AkrNavigationTreeIcon);

    /**
     * Constructor
     */
    constructor() {
        // Initialize expanded values from input nodes.
        effect(() => {
            const nodes: TreeNode[] | undefined = this.nodes();

            if (nodes) {
                this.initializeExpandedValues(nodes);
            }
        });

        // Automatically sync selection and expansion when active node changes.
        effect(() => {
            const active: TreeNode | undefined = this.activeNode();

            if (active) {
                this.selected.set([active.value]);
                this.expandAncestors(this.nodes() ?? [], active.value);
            }
        });

        // Notify selection change.
        effect(() => {
            const node: TreeNode | undefined = this.selectedNode();

            if (node) {
                this.selectionChange.emit(node);
            }
        });
    }

    /**
     * Toggles the expansion state of a node.
     *
     * @param node The node to toggle.
     * @param expanded Whether the node should be expanded.
     */
    toggleExpanded(node: TreeNode, expanded: boolean): void {
        this.expandedValues.update((values) => {
            const next = new Set<string>(values);

            if (expanded) {
                next.add(node.value);
            } else {
                next.delete(node.value);
            }

            return next;
        });
    }

    /**
     * Initializes expanded values from the nodes input.
     *
     * @param nodes The list of tree nodes.
     */
    private initializeExpandedValues(nodes: TreeNode[]): void {
        this.expandedValues.update((values) => {
            const next = new Set<string>(values);

            this.collectExpandedValues(nodes, next);

            return next;
        });
    }

    /**
     * Recursively collects values of nodes that should be expanded initially.
     *
     * @param nodes The list of tree nodes.
     * @param expanded The set to add expanded values to.
     */
    private collectExpandedValues(nodes: TreeNode[], expanded: Set<string>): void {
        for (const node of nodes) {
            if (node.expanded) {
                expanded.add(node.value);
            }

            if (node.children) {
                this.collectExpandedValues(node.children, expanded);
            }
        }
    }

    /**
     * Expands all parent nodes of the given node value.
     *
     * @param nodes The tree nodes to search.
     * @param targetValue The value of the node whose ancestors should be expanded.
     * @returns True if the target node was found in this branch, false otherwise.
     */
    private expandAncestors(nodes: TreeNode[], targetValue: string): boolean {
        for (const node of nodes) {
            if (node.value === targetValue) {
                return true;
            }

            if (node.children && this.expandAncestors(node.children, targetValue)) {
                this.expandedValues.update((values) => {
                    if (values.has(node.value)) {
                        return values;
                    }

                    const next = new Set<string>(values);

                    next.add(node.value);

                    return next;
                });

                return true;
            }
        }

        return false;
    }

    /**
     * Finds a node by its value in the tree.
     *
     * @param nodes The nodes to search.
     * @param value The value to look for.
     * @returns The found node or undefined.
     */
    private findNodeByValue(nodes: TreeNode[], value: string): TreeNode | undefined {
        for (const node of nodes) {
            if (node.value === value) {
                return node;
            }

            if (node.children) {
                const found = this.findNodeByValue(node.children, value);

                if (found) {
                    return found;
                }
            }
        }

        return undefined;
    }

    /**
     * Flattens the tree nodes and creates isActive signals for each node with a routerLink.
     *
     * @param nodes The list of tree nodes.
     * @returns A flat list of nodes and their active signals.
     */
    private flattenNodes(nodes: TreeNode[]): { node: TreeNode; active: () => boolean }[] {
        const flatList: { node: TreeNode; active: () => boolean }[] = [];

        this.traverseAndCollect(nodes, flatList);

        return flatList;
    }

    /**
     * Recursively traverses nodes and adds nodes with routerLinks to the list.
     *
     * @param items The tree nodes to traverse.
     * @param list The list to collect flattened nodes into.
     */
    private traverseAndCollect(items: TreeNode[], list: { node: TreeNode; active: () => boolean }[]): void {
        for (const item of items) {
            if (item.routerLink) {
                // Create the signal-based isActive check for this link
                const activeSignal = isActive(
                    this.router.createUrlTree(Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink]),
                    this.router,
                    {
                        paths: 'exact',
                        queryParams: 'ignored',
                        fragment: 'ignored',
                        matrixParams: 'ignored',
                    },
                );

                list.push({ node: item, active: activeSignal });
            }

            if (item.children) {
                this.traverseAndCollect(item.children, list);
            }
        }
    }
}
