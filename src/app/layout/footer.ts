import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHOP } from '../data/shop';
import { NAV_LINKS } from './nav-links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  host: { class: 'block' },
  template: `
    <footer class="bg-oak text-sack">
      <div class="container-page grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p class="font-serif text-2xl tracking-tight text-paper">{{ shop.name }}</p>
          <p class="mt-2">{{ shop.tagline }}</p>
        </div>

        <div>
          <h2 class="text-lg text-paper">Visit</h2>
          <address class="mt-2 not-italic">
            {{ shop.address.street }}<br />
            {{ shop.address.city }}<br />
            <a [href]="'tel:' + shop.phone" class="underline underline-offset-4">{{
              shop.phone
            }}</a>
          </address>
        </div>

        <div>
          <h2 class="text-lg text-paper">Hours</h2>
          <dl class="mt-2 space-y-1">
            @for (h of shop.hours; track h.days) {
              <div class="flex justify-between gap-4 sm:block">
                <dt class="inline">{{ h.days }}</dt>
                <dd class="inline sm:ml-1">{{ h.time }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>

      <div class="border-t border-paper/15">
        <div
          class="container-page flex flex-col gap-3 py-4 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p>&copy; {{ year }} {{ shop.name }}</p>
          <nav aria-label="Footer">
            <ul class="flex gap-4">
              @for (link of links; track link.path) {
                <li>
                  <a [routerLink]="link.path" class="underline-offset-4 hover:underline">{{
                    link.label
                  }}</a>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly shop = SHOP;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
