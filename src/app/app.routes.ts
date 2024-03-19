import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'browse',
        loadChildren: () => import('./pages/browse/browse.module').then(m => m.BrowseModule)
    }
];
