/**
 * app.routes.ts
 * Define las rutas de la aplicación Angular
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { CatalogComponent } from './pages/catalog.component';
import { CoffeeDetailsComponent } from './pages/coffee-details.component';
import { FavoritesComponent } from './pages/favorites.component';
import { ContactComponent } from './pages/contact.component';
import { AdminComponent } from './pages/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'details/:id', component: CoffeeDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
