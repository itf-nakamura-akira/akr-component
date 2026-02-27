import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'components',
        children: [
            {
                path: 'alert',
                loadComponent: () => import('./pages/components/alert/alert'),
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
        path: '**',
        redirectTo: 'components/alert',
    },
];
