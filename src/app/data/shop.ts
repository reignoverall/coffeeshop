/**
 * All editable site content lives here.
 * Swap the placeholder name, hours, menu and photos for your own.
 */

export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface OpeningHours {
  days: string;
  time: string;
}

/**
 * Unsplash photo path. The image loader in app.config.ts turns it into a sized URL,
 * so NgOptimizedImage can build a responsive srcset. The width arg is unused, kept for readability.
 */
function unsplash(id: string, _width?: number): string {
  return `photo-${id}`;
}

export const SHOP = {
  name: 'Ember & Oak',
  tagline: 'Small-batch coffee, slow mornings.',
  intro:
    'A neighborhood café roasting in small batches, pouring with care, and baking every morning before the doors open.',
  story:
    'Ember & Oak started as a weekend cart and a borrowed roaster. Today we roast our beans a few blocks away, bake our pastries in-house, and keep a corner table open for anyone who needs a quiet hour.',
  address: {
    street: 'Blah Blah street',
    city: 'Sandy, UT 84093',
    mapUrl: 'https://maps.google.com/?q=128+Maple+Street',
  },
  phone: '(555) 012-3456',
  email: 'hello@emberandoak.example',
  hours: [
    { days: 'Mon – Fri', time: '7:00 am – 6:00 pm' },
    { days: 'Saturday', time: '8:00 am – 6:00 pm' },
    { days: 'Sunday', time: '8:00 am – 3:00 pm' },
  ] satisfies OpeningHours[],
} as const;

export const HERO_PHOTO: Photo = {
  src: unsplash('1453614512568-c4024d13c247', 1600),
  alt: 'Café counter with an espresso machine, shelves of cups and warm hanging lights',
  width: 1600,
  height: 1067,
};

export const MENU: MenuCategory[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    items: [
      { name: 'Espresso', description: 'Double shot of our house blend.', price: 3.0 },
      { name: 'Americano', description: 'Espresso topped with hot water.', price: 3.5 },
      {
        name: 'Flat White',
        description: 'Velvety microfoam over a ristretto double.',
        price: 4.25,
      },
      {
        name: 'Cappuccino',
        description: 'Equal parts espresso, steamed milk and foam.',
        price: 4.25,
      },
      {
        name: 'Oak Latte',
        description: 'House latte with a touch of maple and sea salt.',
        price: 5.0,
      },
      {
        name: 'Pour Over',
        description: 'Single-origin, brewed to order. Ask what is on bar.',
        price: 4.75,
      },
      { name: 'Cold Brew', description: 'Steeped 18 hours, served over ice.', price: 4.5 },
    ],
  },
  {
    id: 'tea',
    name: 'Tea & more',
    items: [
      { name: 'Chai Latte', description: 'House-spiced chai with steamed milk.', price: 4.5 },
      {
        name: 'Matcha Latte',
        description: 'Ceremonial-grade matcha, lightly sweetened.',
        price: 5.0,
      },
      {
        name: 'Loose-leaf Tea',
        description: 'Earl Grey, jasmine green, chamomile or mint.',
        price: 3.25,
      },
      { name: 'Hot Chocolate', description: 'Dark chocolate melted into whole milk.', price: 4.0 },
    ],
  },
  {
    id: 'pastries',
    name: 'Pastries',
    items: [
      {
        name: 'Butter Croissant',
        description: 'Flaky, laminated, baked every morning.',
        price: 3.75,
      },
      {
        name: 'Almond Croissant',
        description: 'Filled with almond cream, topped with flakes.',
        price: 4.5,
      },
      {
        name: 'Cinnamon Knot',
        description: 'Brioche twisted with brown sugar and cinnamon.',
        price: 4.0,
      },
      { name: 'Banana Bread', description: 'Toasted slice with salted butter.', price: 3.5 },
    ],
  },
  {
    id: 'food',
    name: 'Food',
    items: [
      {
        name: 'Avocado Toast',
        description: 'Sourdough, smashed avocado, chili and lemon.',
        price: 9.0,
      },
      {
        name: 'Breakfast Sandwich',
        description: 'Egg, cheddar and bacon on a toasted bun.',
        price: 8.5,
      },
      {
        name: 'Granola Bowl',
        description: 'House granola, Greek yogurt and seasonal fruit.',
        price: 7.5,
      },
    ],
  },
];

/** Three drinks highlighted on the home page. */
export const FEATURED: { item: MenuItem; photo: Photo }[] = [
  {
    item: MENU[0].items[4],
    photo: {
      src: unsplash('1509042239860-f550ce710b93', 800),
      alt: 'Lattes with heart latte art on a wooden table between potted plants',
      width: 800,
      height: 1200,
    },
  },
  {
    item: MENU[0].items[5],
    photo: {
      src: unsplash('1442512595331-e89e73853f31', 800),
      alt: 'Barista pouring from a gooseneck kettle into a pour-over brewer',
      width: 800,
      height: 533,
    },
  },
  {
    item: MENU[0].items[6],
    photo: {
      src: unsplash('1461023058943-07fcbe16d735', 800),
      alt: 'Tall glass of iced coffee with milk swirling through it',
      width: 800,
      height: 533,
    },
  },
];

export const GALLERY: Photo[] = [
  {
    src: unsplash('1501339847302-ac426a4a7cbb'),
    alt: 'Glowing CAFE sign above shelves and pendant lamps',
    width: 1200,
    height: 800,
  },
  {
    src: unsplash('1495474472287-4d71bcdd2085'),
    alt: 'Friends clinking two lattes and an iced coffee over a table',
    width: 1200,
    height: 800,
  },
  {
    src: unsplash('1511920170033-f8396924c348'),
    alt: 'Three portafilters holding a latte, ground coffee and whole beans',
    width: 1200,
    height: 1800,
  },
  {
    src: unsplash('1554118811-1e0d58224f24'),
    alt: 'Bright café interior with wicker chairs and a large potted plant',
    width: 1200,
    height: 800,
  },
  {
    src: unsplash('1498804103079-a6351b050096'),
    alt: 'Ring of coffee cups from black to milky on a round wooden stand',
    width: 1200,
    height: 1800,
  },
  {
    src: unsplash('1447933601403-0c6688de566e'),
    alt: 'Close-up of dark roasted coffee beans',
    width: 1200,
    height: 913,
  },
  {
    src: unsplash('1521017432531-fbd92d768814'),
    alt: 'Long wooden tables and a pastry counter inside a cozy café',
    width: 1200,
    height: 800,
  },
  {
    src: unsplash('1514432324607-a09d9b4aefdd'),
    alt: 'Top-down view of a black coffee with crema in a white cup',
    width: 1200,
    height: 1800,
  },
  {
    src: unsplash('1559925393-8be0ec4767c8'),
    alt: 'Outdoor café terrace with tables, flowers and a chalkboard sign',
    width: 1200,
    height: 800,
  },
  {
    src: unsplash('1497935586351-b67a49e012bf'),
    alt: 'Wooden boards with ground coffee, beans and a latte with heart art',
    width: 1200,
    height: 800,
  },
];
