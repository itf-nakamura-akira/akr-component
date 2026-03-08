import { Routes } from '@angular/router';
import { Layout } from './core/components/layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'components',
                children: [
                    {
                        path: 'alert',
                        loadComponent: () => import('./pages/components/alert/alert'),
                    },
                    {
                        path: 'navigation-tree',
                        loadComponent: () => import('./pages/components/navigation-tree/navigation-tree'),
                    },
                    {
                        path: 'input',
                        loadComponent: () => import('./pages/components/input/input'),
                    },
                    {
                        path: '**',
                        redirectTo: 'alert',
                    },
                ],
            },
            {
                path: 'guides',
                children: [
                    {
                        path: 'install',
                        loadComponent: () => import('./pages/guides/install/install'),
                    },
                    {
                        path: '**',
                        redirectTo: 'install',
                    },
                ],
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'components/navigation-tree',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'components/navigation-tree',
    },
];
