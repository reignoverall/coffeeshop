import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SHOP } from '../data/shop';
import { NAV_LINKS } from './nav-links';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  host: {
    class: 'sticky top-0 z-40 block',
    '(document:keydown.escape)': 'open.set(false)',
  },
  template: `
    <header class="border-b border-sack bg-kraft/95 backdrop-blur">
      <div class="container-page flex h-16 items-center justify-between">
        <a routerLink="/" class="font-serif text-2xl tracking-tight" (click)="open.set(false)">
          {{ shop.name }}
        </a>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="-mr-2 inline-flex size-11 items-center justify-center rounded-full md:hidden"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="open() ? 'site-nav' : null"
          (click)="open.set(!open())"
        >
          <span class="sr-only">{{ open() ? 'Close menu' : 'Open menu' }}</span>
          <svg
            viewBox="0 0 24 24"
            class="size-6"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            @if (open()) {
              <path d="M6 6l12 12M18 6L6 18" />
            } @else {
              <path d="M4 7h16M4 12h16M4 17h16" />
            }
          </svg>
        </button>

        <!-- Desktop nav -->
        <nav aria-label="Main" class="hidden md:block">
          <ul class="flex gap-1">
            @for (link of links; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="bg-sack"
                  ariaCurrentWhenActive="page"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="inline-flex min-h-11 items-center rounded-full px-4 font-medium hover:bg-sack"
                >
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>

      <!-- Mobile nav panel -->
      @if (open()) {
        <nav id="site-nav" aria-label="Main" class="border-t border-sack md:hidden">
          <ul class="container-page flex flex-col py-2">
            @for (link of links; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="text-ember-dark"
                  ariaCurrentWhenActive="page"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="flex min-h-12 items-center font-serif text-3xl"
                  (click)="open.set(false)"
                >
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      }
    </header>
  `,
})
export class Header {
  protected readonly shop = SHOP;
  protected readonly links = NAV_LINKS;
  protected readonly open = signal(false);
}
