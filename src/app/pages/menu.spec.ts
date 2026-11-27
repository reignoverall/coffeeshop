import { TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { MENU } from '../data/shop';

describe('Menu', () => {
  beforeAll(() => {
    // jsdom has no layout engine, so scrollIntoView doesn't exist there.
    Element.prototype.scrollIntoView ??= () => {};
  });

  async function render() {
    const fixture = TestBed.createComponent(Menu);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  const itemNames = (el: HTMLElement) =>
    Array.from(el.querySelectorAll('#menu-panel h3')).map((h) => h.textContent?.trim());

  it('shows only the first category by default, with its tab selected', async () => {
    const { el } = await render();
    expect(itemNames(el)).toEqual(MENU[0].items.map((i) => i.name));
    expect(el.querySelector('[aria-selected="true"]')?.textContent?.trim()).toBe(MENU[0].name);
  });

  it('switches to the clicked category and highlights its tab', async () => {
    const { fixture, el } = await render();
    const food = MENU.find((c) => c.id === 'food')!;
    el.querySelector<HTMLButtonElement>('#tab-food')!.click();
    await fixture.whenStable();
    expect(itemNames(el)).toEqual(food.items.map((i) => i.name));
    expect(el.querySelector('#tab-food')?.getAttribute('aria-selected')).toBe('true');
    expect(el.querySelector('#tab-coffee')?.getAttribute('aria-selected')).toBe('false');
  });

  it('moves between categories with arrow keys', async () => {
    const { fixture, el } = await render();
    const tablist = el.querySelector('[role="tablist"]')!;
    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await fixture.whenStable();
    expect(el.querySelector('[aria-selected="true"]')?.textContent?.trim()).toBe(
      MENU[MENU.length - 1].name,
    );
  });
});
