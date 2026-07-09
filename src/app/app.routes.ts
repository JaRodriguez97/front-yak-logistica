import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
  },
  // Corporativo, Proyectos, Multimedia paths loading LandingComponent
  {
    path: 'corporativo',
    loadComponent: () =>
      import('./features/corporativo/corporativo.component').then(
        (m) => m.CorporativoComponent
      ),
  },
  {
    path: 'proyectos',
    redirectTo: 'casos-exito',
    pathMatch: 'full',
  },
  {
    path: 'casos-exito',
    loadComponent: () =>
      import('./features/casos-exito/casos-exito.component').then(
        (m) => m.CasosExitoComponent
      ),
  },
  {
    path: 'casos-exito/:slug',
    loadComponent: () =>
      import('./features/casos-exito/caso-exito-detail/caso-exito-detail.component').then(
        (m) => m.CasoExitoDetailComponent
      ),
  },
  {
    path: 'multimedia',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  // Explicit top-level product paths with data-driven slug injection
  {
    path: 'puertas-rapidas',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'puertas-rapidas' },
  },
  {
    path: 'plataformas-niveladoras',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'plataformas-niveladoras' },
  },
  {
    path: 'plataformas',
    redirectTo: 'plataformas-niveladoras',
    pathMatch: 'full',
  },
  {
    path: 'puertas-seccionales',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'puertas-seccionales' },
  },
  {
    path: 'abrigos',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'abrigos' },
  },
  {
    path: 'docking-before-opening',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'docking-before-opening' },
  },
  {
    path: 'loading-houses',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'loading-houses' },
  },
  {
    path: 'protecciones',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'protecciones' },
  },
  {
    path: 'puertas-especializadas',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'puertas-especializadas' },
  },
  {
    path: 'puertas-cortafuego-atex',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { slug: 'puertas-especializadas' },
  },
  // Keep products/:slug for backward compatibility
  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
