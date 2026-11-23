import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

/** Serves Unsplash photos at the width NgOptimizedImage asks for (enables responsive srcset). */
function unsplashLoader({ src, width }: ImageLoaderConfig): string {
  return `https://images.unsplash.com/${src}?auto=format&fit=crop&q=75&w=${width ?? 1200}`;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
    { provide: IMAGE_LOADER, useValue: unsplashLoader },
  ],
};
