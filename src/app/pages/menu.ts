import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MENU } from '../data/shop';

/**
 * Menu shown one category at a time (ARIA tabs pattern).
 * Click/tap a category, or use ←/→/Home/End on the keyboard.
 */
@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe],
  template: `
    <header #intro class="container-page pt-12 pb-6 md:pt-16">
      <h1 class="text-5xl md:text-6xl">Menu</h1>
      <p class="mt-3 max-w-xl text-lg text-roast">
        Everything is made to order. Oat, almond and whole milk available at no extra charge.
      </p>
    </header>

    <!-- Category tabs: stick under the site header while scrolling -->
    <div class="sticky top-16 z-30 border-y border-sack bg-kraft/95 backdrop-blur">
      <div
        #tablist
        role="tablist"
        aria-label="Menu categories"
        class="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]"
        (keydown)="onKeydown($event)"
      >
        @for (cat of menu; track cat.id) {
          <button
            type="button"
            role="tab"
            [id]="'tab-' + cat.id"
            aria-controls="menu-panel"
            [attr.aria-selected]="cat.id === selectedId()"
            [tabIndex]="cat.id === selectedId() ? 0 : -1"
            class="inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 font-medium whitespace-nowrap transition-colors"
            [class]="
              cat.id === selectedId()
                ? 'border-char bg-char text-paper'
                : 'border-roast/40 hover:bg-sack'
            "
            (click)="select(cat.id)"
          >
            {{ cat.name }}
          </button>
        }
      </div>
    </div>

    <div class="container-page min-h-[26rem] py-8 md:py-12">
      <!-- Re-created on each switch so the short fade-in plays. -->
      @for (cat of [selected()]; track cat.id) {
        <section
          id="menu-panel"
          role="tabpanel"
          [attr.aria-labelledby]="'tab-' + cat.id"
          tabindex="0"
          class="animate-[menu-in_200ms_ease-out] focus:outline-none focus-visible:outline-solid"
        >
          <h2 class="sr-only">{{ cat.name }}</h2>
          <ul class="grid md:grid-cols-2 md:gap-x-16">
            @for (item of cat.items; track item.name) {
              <li class="border-b border-sack py-4">
                <div class="flex items-baseline gap-2">
                  <h3 class="text-lg font-semibold">{{ item.name }}</h3>
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
  protected readonly selectedId = signal(MENU[0].id);
  protected readonly selected = computed(
    () => this.menu.find((c) => c.id === this.selectedId()) ?? this.menu[0],
  );

  private readonly intro = viewChild.required<ElementRef<HTMLElement>>('intro');
  private readonly tablist = viewChild.required<ElementRef<HTMLElement>>('tablist');

  protected select(id: string): void {
    if (id === this.selectedId()) return;
    this.selectedId.set(id);
    this.revealTab(id);

    // If the tab bar is stuck to the top (user scrolled down a long list),
    // bring the start of the new category back into view under it.
    const intro = this.intro().nativeElement;
    const top = intro.offsetTop + intro.offsetHeight - 64; // 64px = site header height
    if (window.scrollY > top) {
      window.scrollTo({ top });
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const ids = this.menu.map((c) => c.id);
    const i = ids.indexOf(this.selectedId());
    const next: Record<string, number> = {
      ArrowRight: (i + 1) % ids.length,
      ArrowLeft: (i - 1 + ids.length) % ids.length,
      Home: 0,
      End: ids.length - 1,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    const id = ids[next[event.key]];
    this.select(id);
    this.tablist().nativeElement.querySelector<HTMLElement>(`#tab-${id}`)?.focus();
  }

  /** On narrow screens the tab row scrolls sideways; keep the active tab fully visible. */
  private revealTab(id: string): void {
    this.tablist()
      .nativeElement.querySelector(`#tab-${id}`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}
