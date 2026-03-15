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
                    routerLink: '/components/alert',
                },
                {
                    name: 'Button',
                    value: 'components/button',
                    routerLink: '/components/button',
                },
                {
                    name: 'Input',
                    value: 'components/input',
                    routerLink: '/components/input',
                },
                {
                    name: 'Navigation Tree',
                    value: 'components/navigation-tree',
                    routerLink: '/components/navigation-tree',
                },
                {
                    name: 'Radio Button',
                    value: 'components/radio-button',
                    routerLink: '/components/radio-button',
                },
            ],
        },
    ];
}
