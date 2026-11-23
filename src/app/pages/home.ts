import { Component } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FEATURED, HERO_PHOTO, SHOP } from '../data/shop';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink, CurrencyPipe],
  template: `
    <!-- Hero -->
    <section class="relative isolate flex min-h-[70svh] items-end overflow-hidden md:min-h-[80svh]">
      <img
        [ngSrc]="hero.src"
        [alt]="hero.alt"
        fill
        priority
        sizes="100vw"
        class="-z-10 object-cover"
      />
      <div
        class="absolute inset-0 -z-10 bg-linear-to-t from-espresso via-espresso/75 to-espresso/35"
      ></div>

      <div class="container-page pt-24 pb-12 text-foam md:pb-20">
        <p class="text-sm font-semibold tracking-widest text-latte uppercase">Neighborhood café</p>
        <h1 class="mt-2 max-w-xl text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
          {{ shop.tagline }}
        </h1>
        <p class="mt-4 max-w-md text-lg text-latte">{{ shop.intro }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a routerLink="/menu" class="btn-primary">See the menu</a>
          <a routerLink="/gallery" class="btn-ghost text-foam hover:bg-foam/10">View gallery</a>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="container-page py-16 md:py-24" aria-labelledby="story-title">
      <div class="max-w-2xl">
        <h2 id="story-title" class="text-3xl font-semibold md:text-4xl">Our story</h2>
        <p class="mt-4 text-lg leading-relaxed text-roast">{{ shop.story }}</p>
      </div>
    </section>

    <!-- Featured -->
    <section class="bg-latte py-16 md:py-24" aria-labelledby="featured-title">
      <div class="container-page">
        <div class="flex items-end justify-between gap-4">
          <h2 id="featured-title" class="text-3xl font-semibold md:text-4xl">House favorites</h2>
          <a routerLink="/menu" class="shrink-0 font-medium text-crema underline underline-offset-4"
            >Full menu</a
          >
        </div>

        <ul class="mt-8 grid gap-6 sm:grid-cols-3">
          @for (f of featured; track f.item.name) {
            <li class="overflow-hidden rounded-2xl bg-foam shadow-sm">
              <div class="relative aspect-[4/3]">
                <img
                  [ngSrc]="f.photo.src"
                  [alt]="f.photo.alt"
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  class="object-cover"
                />
              </div>
              <div class="p-5">
                <div class="flex items-baseline justify-between gap-3">
                  <h3 class="text-xl font-semibold">{{ f.item.name }}</h3>
                  <p class="font-medium">{{ f.item.price | currency }}</p>
                </div>
                <p class="mt-1 text-roast">{{ f.item.description }}</p>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- Visit -->
    <section class="container-page py-16 md:py-24" aria-labelledby="visit-title">
      <div class="grid gap-8 rounded-3xl border border-latte bg-foam p-6 sm:p-10 md:grid-cols-2">
        <div>
          <h2 id="visit-title" class="text-3xl font-semibold md:text-4xl">Come say hello</h2>
          <address class="mt-4 text-lg not-italic text-roast">
            {{ shop.address.street }}<br />
            {{ shop.address.city }}
          </address>
          <a [href]="shop.address.mapUrl" target="_blank" rel="noopener" class="btn-primary mt-6">
            Get directions<span class="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Opening hours</h3>
          <dl class="mt-3 divide-y divide-latte">
            @for (h of shop.hours; track h.days) {
              <div class="flex justify-between gap-4 py-2">
                <dt class="font-medium">{{ h.days }}</dt>
                <dd class="text-roast">{{ h.time }}</dd>
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
}
