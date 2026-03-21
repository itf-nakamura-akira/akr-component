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
 * Data structure representing a node in the navigation tree.
 */
export interface TreeNode {
    /** The visible label of the node. */
    name: string;
    /** The unique identifier for the node. */
    value: string;
    /** Optional name of the icon to display. */
    icon?: string;
    /** Nested child nodes for hierarchical structures. */
    children?: TreeNode[];
    /** Whether the node is interaction-disabled. */
    disabled?: boolean;
    /** Whether the node is initially expanded. */
    expanded?: boolean;
    /** The route destination to navigate to when the node is clicked. */
    routerLink?: string | unknown[];
}

/**
 * Custom Icon Template Directive.
 *
 * Use this to provide custom icon rendering for navigation tree nodes.
 *
 * @example
 * ```html
 * <akr-navigation-tree [nodes]="data">
 *     <ng-template akrNavigationTreeIcon let-node>
 *         <my-custom-icon [name]="node.icon" />
 *     </ng-template>
 * </akr-navigation-tree>
 * ```
 */
@Directive({
    selector: '[akrNavigationTreeIcon]',
})
export class AkrNavigationTreeIcon {
    /**
     * The template reference for the custom icon.
     * @internal
     */
    readonly template = inject<TemplateRef<{ $implicit: TreeNode }>>(TemplateRef);
}

/**
 * Navigation Tree Component.
 *
 * Renders a hierarchical navigation structure with support for routing and state persistence.
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
     * Angular router instance.
     * @internal
     */
    private readonly router = inject(Router);

    /**
     * List of nodes with their associated router link status signals.
     * @internal
     */
    private readonly nodeStatusList = computed<{ node: TreeNode; active: () => boolean }[]>(() => {
        const nodes: TreeNode[] = this.nodes() ?? [];

        return this.flattenNodes(nodes);
    });

    /**
     * The node that matches the current active route.
     * @internal
     */
    private readonly activeNode = computed(() => this.nodeStatusList().find((status) => status.active())?.node);

    /**
     * The node currently selected via user interaction.
     * @internal
     */
    private readonly selectedNode = computed(() => {
        const selected: string[] = this.selected();

        if (selected.length === 0) {
            return undefined;
        }

        return this.findNodeByValue(this.nodes() ?? [], selected[0]);
    });

    /**
     * The hierarchical data to render.
     */
    readonly nodes = input<TreeNode[]>();

    /**
     * Emits the selected `TreeNode` when the selection changes.
     */
    readonly selectionChange = output<TreeNode>();

    /**
     * Current selection state. Represented as a list of strings for Aria Tree compatibility.
     * @internal
     */
    readonly selected = signal<string[]>([]);

    /**
     * State of currently expanded parent nodes.
     * @internal
     */
    readonly expandedValues = signal<Set<string>>(new Set());

    /**
     * Reference to the custom icon template, if provided.
     * @internal
     */
    readonly customIcon: Signal<AkrNavigationTreeIcon | undefined> = contentChild(AkrNavigationTreeIcon);

    /**
     * Sets up automatic synchronization between the route and tree state.
     */
    constructor() {
        // Apply initial expansion from data.
        effect(() => {
            const nodes: TreeNode[] | undefined = this.nodes();

            if (nodes) {
                this.initializeExpandedValues(nodes);
            }
        });

        // Sync with active router link.
        effect(() => {
            const active: TreeNode | undefined = this.activeNode();

            if (active) {
                this.selected.set([active.value]);
                this.expandAncestors(this.nodes() ?? [], active.value);
            }
        });

        // Trigger change emission.
        effect(() => {
            const node: TreeNode | undefined = this.selectedNode();

            if (node) {
                this.selectionChange.emit(node);
            }
        });
    }

    /**
     * Toggles the expansion state of a branch node.
     * @param node The node to toggle.
     * @param expanded Desired state.
     * @internal
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
     * Processes initial expansion based on input data.
     * @param nodes Tree nodes.
     */
    private initializeExpandedValues(nodes: TreeNode[]): void {
        this.expandedValues.update((values) => {
            const next = new Set<string>(values);

            this.collectExpandedValues(nodes, next);

            return next;
        });
    }

    /**
     * Collects all nodes marked as expanded.
     * @param nodes List of nodes.
     * @param expanded Set to populate.
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
     * Recursively expands ancestors of a target node value.
     * @param nodes Tree data.
     * @param targetValue Value to find.
     * @returns Whether the value was found in the current subtree.
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
     * Locates a node by its unique value.
     * @param nodes List of nodes.
     * @param value Search value.
     * @returns The node if found, otherwise undefined.
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
     * Creates a flattened map for URL-to-node matching.
     * @param nodes Tree nodes.
     * @returns Flattened array with active route signals.
     */
    private flattenNodes(nodes: TreeNode[]): { node: TreeNode; active: () => boolean }[] {
        const flatList: { node: TreeNode; active: () => boolean }[] = [];

        this.traverseAndCollect(nodes, flatList);

        return flatList;
    }

    /**
     * Recursively traverses nodes and collects router-active signals.
     * @param items Tree nodes.
     * @param list Destination list.
     */
    private traverseAndCollect(items: TreeNode[], list: { node: TreeNode; active: () => boolean }[]): void {
        for (const item of items) {
            if (item.routerLink) {
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
