import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    contentChild,
    Directive,
    inject,
    input,
    signal,
    TemplateRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AkrIcon } from '../internal/icon/icon';

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
    readonly nodes = input<TreeNode[]>();

    readonly selected = signal(['inbox']);

    readonly customIcon = contentChild(AkrNavigationTreeIcon);
}
