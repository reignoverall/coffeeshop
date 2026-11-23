import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MENU } from '../data/shop';

@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <header class="container-page pt-12 pb-6 md:pt-16">
      <h1 class="text-4xl font-semibold md:text-5xl">Menu</h1>
      <p class="mt-3 max-w-xl text-lg text-roast">
        Everything is made to order. Oat, almond and whole milk available at no extra charge.
      </p>
    </header>

    <!-- Category jump links -->
    <nav
      aria-label="Menu categories"
      class="sticky top-16 z-30 border-y border-latte bg-cream/95 backdrop-blur"
    >
      <ul class="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        @for (cat of menu; track cat.id) {
          <li class="shrink-0">
            <a
              routerLink="/menu"
              [fragment]="cat.id"
              class="inline-flex min-h-11 items-center rounded-full border border-roast/40 px-4 font-medium whitespace-nowrap hover:bg-latte"
            >
              {{ cat.name }}
            </a>
          </li>
        }
      </ul>
    </nav>

    <div class="container-page grid gap-12 py-10 md:grid-cols-2 md:gap-x-16 md:py-16">
      @for (cat of menu; track cat.id) {
        <section [id]="cat.id" [attr.aria-labelledby]="cat.id + '-title'">
          <h2
            [id]="cat.id + '-title'"
            class="border-b-2 border-espresso pb-2 text-2xl font-semibold md:text-3xl"
          >
            {{ cat.name }}
          </h2>
          <ul class="mt-4 divide-y divide-latte">
            @for (item of cat.items; track item.name) {
              <li class="py-4">
                <div class="flex items-baseline gap-2">
                  <h3 class="font-sans text-lg font-semibold">{{ item.name }}</h3>
                  <span
                    class="flex-1 translate-y-[-4px] border-b border-dotted border-roast/50"
                    aria-hidden="true"
                  ></span>
                  <p class="font-medium tabular-nums">{{ item.price | currency }}</p>
                </div>
                <p class="mt-1 text-roast">{{ item.description }}</p>
              </li>
            }
          </ul>
        </section>
      }
    </div>
  `,
})
export class Menu {
  protected readonly menu = MENU;
}
