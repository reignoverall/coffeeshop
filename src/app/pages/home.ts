import { Component } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FEATURED, HERO_PHOTO, SHOP } from '../data/shop';

/** SHOP.hours is ordered weekdays, Saturday, Sunday. */
function hoursFor(day: number) {
  if (day === 0) return SHOP.hours[2];
  if (day === 6) return SHOP.hours[1];
  return SHOP.hours[0];
}

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink, CurrencyPipe],
  template: `
    <!-- Hero: headline, arched window photo, today's hours -->
    <section class="bg-oak text-paper">
      <div
        class="container-page grid gap-10 pt-10 pb-14 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-16 md:pt-16 md:pb-20"
      >
        <div class="md:pb-6">
          <h1 class="text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl">
            {{ shop.tagline }}
          </h1>
          <p class="mt-5 max-w-md text-lg leading-relaxed text-sack">{{ shop.intro }}</p>

          <p class="mt-8 flex items-center gap-3 text-paper">
           
            <span class="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1 text-sm font-medium">
              Open today <strong class="font-semibold">{{ today.time }}</strong>
            </span>
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/menu" class="btn-primary">See the menu</a>
            <a routerLink="/gallery" class="btn-ghost text-paper hover:bg-paper/10">Look inside</a>
          </div>
        </div>

        <div class="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-full">
          <img
            [ngSrc]="hero.src"
            [alt]="hero.alt"
            fill
            priority
            sizes="(min-width: 768px) 24rem, 100vw"
            class="object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="container-page py-16 md:py-24" aria-labelledby="story-title">
      <div class="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-16">
        <h2 id="story-title" class="text-3xl md:text-4xl">Our story</h2>
        <p class="max-w-[60ch] text-xl leading-relaxed text-roast">{{ shop.story }}</p>
      </div>
    </section>

    <!-- House favorites -->
    <section class="border-t border-sack py-16 md:py-24" aria-labelledby="featured-title">
      <div class="container-page">
        <div class="flex items-baseline justify-between gap-4">
          <h2 id="featured-title" class="text-3xl md:text-4xl">House favorites</h2>
          <a
            routerLink="/menu"
            class="shrink-0 font-medium text-ember-dark underline underline-offset-4"
          >
            Full menu
          </a>
        </div>

        <ul class="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
          @for (f of featured; track f.item.name) {
            <li>
              <div class="relative aspect-[4/3] overflow-hidden rounded-md">
                <img
                  [ngSrc]="f.photo.src"
                  [alt]="f.photo.alt"
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  class="object-cover"
                />
              </div>
              <div class="mt-4 flex items-baseline justify-between gap-3">
                <h3 class="font-serif text-xl">{{ f.item.name }}</h3>
                <p class="font-medium tabular-nums">{{ f.item.price | currency }}</p>
              </div>
              <p class="mt-1 text-roast">{{ f.item.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- Visit -->
    <section class="border-t border-sack py-16 md:py-24" aria-labelledby="visit-title">
      <div class="container-page grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="visit-title" class="text-3xl md:text-4xl">Come say hello</h2>
          <address class="mt-4 text-lg leading-relaxed text-roast not-italic">
            {{ shop.address.street }}<br />
            {{ shop.address.city }}
          </address>
          <a [href]="shop.address.mapUrl" target="_blank" rel="noopener" class="btn-primary mt-6">
            Get directions<span class="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div>
          <h3 class="font-serif text-xl">Opening hours</h3>
          <dl class="mt-3 divide-y divide-sack border-y border-sack">
            @for (h of shop.hours; track h.days) {
              <div class="flex justify-between gap-4 py-3">
                <dt class="font-medium">{{ h.days }}</dt>
                <dd class="text-roast tabular-nums">{{ h.time }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly shop = SHOP;
  protected readonly hero = HERO_PHOTO;
  protected readonly featured = FEATURED;
  protected readonly today = hoursFor(new Date().getDay());
}
