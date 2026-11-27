import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header';
import { Footer } from './layout/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  host: { class: 'flex min-h-dvh flex-col' },
  template: `
    <a
      href="#main"
      class="sr-only z-50 rounded-full bg-char px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
    <app-header />
    <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {}
