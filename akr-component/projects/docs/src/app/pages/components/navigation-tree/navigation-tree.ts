import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AkrNavigationTree, AkrNavigationTreeIcon, TreeNode } from 'akr-component';

@Component({
    selector: 'app-navigation-tree',
    imports: [AkrNavigationTree, AkrNavigationTreeIcon],
    templateUrl: './navigation-tree.html',
    styleUrl: './navigation-tree.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationTree {
    readonly basicNodes: TreeNode[] = [
        {
            name: 'Getting Started',
            value: 'getting-started',
            expanded: true,
            children: [
                { name: 'Introduction', value: 'intro' },
                { name: 'Installation', value: 'install' },
            ],
        },
        {
            name: 'Components',
            value: 'components',
            children: [
                { name: 'Button', value: 'button' },
                { name: 'Input', value: 'input' },
                { name: 'Alert', value: 'alert' },
            ],
        },
    ];

    readonly iconNodes: TreeNode[] = [
        {
            name: 'Files',
            value: 'files',
            icon: 'folder',
            expanded: true,
            children: [
                { name: 'Document.pdf', value: 'doc', icon: 'description' },
                { name: 'Image.png', value: 'img', icon: 'image' },
                { name: 'Project.zip', value: 'zip', icon: 'archive' },
            ],
        },
        {
            name: 'Settings',
            value: 'settings',
            icon: 'settings',
        },
    ];

    readonly selectionResult = signal<string>('None');

    onSelectionChange(node: TreeNode) {
        this.selectionResult.set(node.name);
    }
}
