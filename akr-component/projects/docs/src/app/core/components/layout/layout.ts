import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AkrNavigationTree, AkrNavigationTreeIcon, TreeNode } from 'akr-component';

@Component({
    selector: 'app-layout',
    imports: [RouterLink, RouterOutlet, AkrNavigationTree, AkrNavigationTreeIcon],
    templateUrl: './layout.html',
    styleUrl: './layout.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
    readonly isMenuOpen = signal(false);

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
                    routerLink: '/guides/install',
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
                    value: 'components/alert',
                    icon: 'warning',
                    routerLink: '/components/alert',
                },
                {
                    name: 'Navigation Tree',
                    value: 'components/navigation-tree',
                    icon: 'account_tree',
                    routerLink: '/components/navigation-tree',
                },
            ],
        },
    ];
}
