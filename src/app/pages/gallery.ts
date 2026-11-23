import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GALLERY } from '../data/shop';

@Component({
  selector: 'app-gallery',
  imports: [NgOptimizedImage],
  template: `
    <header class="container-page pt-12 pb-6 md:pt-16">
      <h1 class="text-4xl font-semibold md:text-5xl">Gallery</h1>
      <p class="mt-3 max-w-xl text-lg text-roast">
        A look inside the bar, the beans and the people who keep it warm.
      </p>
    </header>

    <ul class="container-page grid grid-cols-2 gap-2 pb-16 sm:gap-3 lg:grid-cols-3">
      @for (photo of photos; track photo.src; let i = $index) {
        <li [class]="i % 5 === 0 ? 'col-span-2 lg:col-span-1' : ''">
          <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-xl"
            [class]="i % 5 === 0 ? 'aspect-[2/1] lg:aspect-square' : 'aspect-square'"
            (click)="openAt(i)"
          >
            <span class="sr-only">Enlarge photo: </span>
            <img
              [ngSrc]="photo.src"
              [alt]="photo.alt"
              fill
              [priority]="i < 3"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              class="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        </li>
      }
    </ul>

    <!-- Lightbox: native dialog handles focus trapping, Esc to close and returning focus. -->
    <dialog
      #lightbox
      aria-label="Photo viewer"
      class="m-0 h-dvh max-h-none w-screen max-w-none bg-espresso p-0 text-latte"
      (close)="current.set(null)"
      (click)="onBackdropClick($event)"
      (keydown.arrowright)="step(1)"
      (keydown.arrowleft)="step(-1)"
    >
      @if (photo(); as p) {
        <figure class="flex h-full flex-col items-center justify-center gap-4 px-4 py-6">
          @for (img of [p]; track img.src) {
            <img
              [ngSrc]="img.src"
              [alt]="img.alt"
              [width]="img.width"
              [height]="img.height"
              sizes="100vw"
              class="max-h-[70svh] w-auto max-w-full rounded-lg object-contain"
            />
          }
          <figcaption class="max-w-xl text-center" aria-live="polite">
            {{ caption() }}
          </figcaption>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="btn-ghost w-12 px-0 text-foam hover:bg-foam/10"
              (click)="step(-1)"
            >
              <span aria-hidden="true">&larr;</span><span class="sr-only">Previous photo</span>
            </button>
            <button type="button" class="btn-primary" (click)="close()">Close</button>
            <button
              type="button"
              class="btn-ghost w-12 px-0 text-foam hover:bg-foam/10"
              (click)="step(1)"
            >
              <span aria-hidden="true">&rarr;</span><span class="sr-only">Next photo</span>
            </button>
          </div>
        </figure>
      }
    </dialog>
  `,
})
export class Gallery {
  protected readonly photos = GALLERY;
  protected readonly current = signal<number | null>(null);
  protected readonly photo = computed(() => {
    const i = this.current();
    return i === null ? null : this.photos[i];
  });
  protected readonly caption = computed(() => {
    const i = this.current();
    return i === null ? '' : `${this.photos[i].alt} (${i + 1} of ${this.photos.length})`;
  });

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('lightbox');

  protected openAt(index: number): void {
    this.current.set(index);
    this.dialog().nativeElement.showModal();
  }

  protected step(delta: number): void {
    const n = this.photos.length;
    this.current.update((i) => (i === null ? i : (i + delta + n) % n));
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** Clicking the dimmed backdrop (the dialog element itself, not its content) closes it. */
  protected onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target === this.dialog().nativeElement || target.tagName === 'FIGURE') {
      this.close();
    }
  }
}
