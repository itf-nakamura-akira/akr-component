import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'components',
        children: [
            {
                path: 'alert',
                loadComponent: () => import('./pages/components/alert/alert.component'),
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
                loadComponent: () => import('./pages/guides/install/install.component'),
            },
            {
                path: '**',
                redirectTo: 'install',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'guides/install',
    },
];
