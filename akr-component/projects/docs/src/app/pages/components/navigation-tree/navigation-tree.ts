import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AkrNavigationTree, AkrNavigationTreeIcon, TreeNode } from 'akr-component';

@Component({
    selector: 'app-navigation-tree',
    imports: [AkrNavigationTree, AkrNavigationTreeIcon],
    templateUrl: './navigation-tree.html',
    styleUrl: './navigation-tree.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationTree {
    readonly menuNode: TreeNode[] = [
        {
            name: 'Guides',
            value: 'guides',
            expanded: true,
            children: [
                {
                    name: 'Install',
                    value: 'guides/install',
                    icon: 'download',
                },
            ],
        },
        {
            name: 'Components',
            value: 'components',
            expanded: true,
            children: [
                {
                    name: 'Alert',
                    value: 'alert',
                    icon: 'warning',
                },
                {
                    name: 'Navigation Tree',
                    value: 'navigation-tree',
                    icon: 'account_tree',
                },
            ],
        },
    ];
}
