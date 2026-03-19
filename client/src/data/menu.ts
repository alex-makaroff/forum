export type Category = 
  | "Завтрак"
  | "Закуски и салаты"
  | "Паста и ризотто"
  | "Супы"
  | "Основные блюда";

export interface MenuItem {
  id: string;
  category: Category;
  name: string;
  description?: string;
  weight?: string;
  price?: number;
  pricePer100g?: number;
  currency: string;
  hasImage: boolean;
  image?: string;
  variants?: {
    name: string;
    price: number;
  }[];
}

export const menuItems: MenuItem[] = [
  // 1) Завтрак (Breakfast)
  {
    id: "b-1",
    category: "Завтрак",
    name: "Шакшука",
    description: "Горячая сковородка из томатов и сладкого перца со специями, в которой томятся яйца до нежного, кремового желтка. Сочно, пряно и по-домашнему.",
    price: 900,
    currency: "RUB",
    hasImage: true,
    image: "/images/shakshuka.jpg"
  },
  {
    id: "b-2",
    category: "Завтрак",
    name: "Глазунья с томатами и пастрами из индейки",
    description: "Яйца-глазунья с сочными томатами и нежным пастрами из индейки. Сытно, ароматно и идеально для спокойного завтрака.",
    price: 700,
    currency: "RUB",
    hasImage: true,
    image: "/images/eggs.jpg"
  },
  {
    id: "b-3",
    category: "Завтрак",
    name: "Омлет со страчателлой и трюфелем",
    description: "Воздушный омлет со сливочной страчателлой и тонким ароматом трюфеля. Нежный вкус и роскошное послевкусие в каждом кусочке.",
    price: 1100,
    currency: "RUB",
    hasImage: true,
    image: "/images/omlet.jpg"
  },
  {
    id: "b-4",
    category: "Завтрак",
    name: "Глазунья / Омлет / Яйца пашот",
    price: 500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "b-5",
    category: "Завтрак",
    name: "Бенедикт",
    currency: "RUB",
    hasImage: false,
    variants: [
      { name: "Лосось собственного посола", price: 1300 },
      { name: "Пастрами из индейки", price: 900 },
      { name: "Ростбиф", price: 1100 }
    ]
  },
  {
    id: "b-6",
    category: "Завтрак",
    name: "Кето-вафли из цукини с яйцом пашот",
    currency: "RUB",
    hasImage: false,
    variants: [
      { name: "Лосось собственного посола", price: 1300 },
      { name: "Пастрами из индейки", price: 900 },
      { name: "Пастрами из говядины", price: 900 }
    ]
  },
  {
    id: "b-7",
    category: "Завтрак",
    name: "Зелёный салат с авокадо и пармезаном",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "b-8",
    category: "Завтрак",
    name: "Крок-мадам",
    price: 900,
    currency: "RUB",
    hasImage: false
  },

  // 2) Закуски и салаты (Starters & salads)
  {
    id: "s-1",
    category: "Закуски и салаты",
    name: "Паштет из печени индейки с чоризо и салями с пармезаном",
    price: 1500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-2",
    category: "Закуски и салаты",
    name: "Мясное ассорти",
    price: 1500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-3",
    category: "Закуски и салаты",
    name: "Сырная тарелка",
    price: 1900,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-4",
    category: "Закуски и салаты",
    name: "Хумус с томатной сальсой",
    price: 700,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-5",
    category: "Закуски и салаты",
    name: "Буррата с томатами и выдержанным бальзамиком",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-6",
    category: "Закуски и салаты",
    name: "Тартар из говядины",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-7",
    category: "Закуски и салаты",
    name: "Зелёный салат с авокадо и пармезаном",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-8",
    category: "Закуски и салаты",
    name: "Садовый салат с деревенской сметаной или оливковым маслом",
    price: 700,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-9",
    category: "Закуски и салаты",
    name: "Салат панцанелла с авокадо и тарти́ном",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-10",
    category: "Закуски и салаты",
    name: "Вителло Тоннато",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-11",
    category: "Закуски и салаты",
    name: "Цезарь с курицей",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-12",
    category: "Закуски и салаты",
    name: "Цезарь с креветками",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-13",
    category: "Закуски и салаты",
    name: "Тартар из тунца",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-14",
    category: "Закуски и салаты",
    name: "Нисуаз с тунцом",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "s-15",
    category: "Закуски и салаты",
    name: "Риет из копчёной форели на кето-булочке",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },

  // 3) Паста и ризотто (Pasta & Risotto)
  {
    id: "p-1",
    category: "Паста и ризотто",
    name: "Ригатони аль помодоро со страчателлой",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "p-2",
    category: "Паста и ризотто",
    name: "Спагетти алла читарра, креветки, цукини",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "p-3",
    category: "Паста и ризотто",
    name: "Фрегола с крабом и страчателлой",
    price: 1900,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "p-4",
    category: "Паста и ризотто",
    name: "Казаречче с уткой",
    price: 1300,
    currency: "RUB",
    hasImage: false
  },

  // 4) Супы (Soups)
  {
    id: "so-1",
    category: "Супы",
    name: "Суп из фермерского петуха с домашней лапшой",
    price: 700,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "so-2",
    category: "Супы",
    name: "Минестроне с пастой фрегола и травами",
    price: 700,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "so-3",
    category: "Супы",
    name: "Борщ с говядиной",
    price: 900,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "so-4",
    category: "Супы",
    name: "Том Ям с морепродуктами",
    price: 900,
    currency: "RUB",
    hasImage: false
  },

  // 5) Основные блюда (Main courses)
  {
    id: "m-1",
    category: "Основные блюда",
    name: "Котлеты из трески и судака с пюре из печёного картофеля",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-2",
    category: "Основные блюда",
    name: "Куриные котлеты с картофельным пюре и грибной икрой",
    price: 1100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-3",
    category: "Основные блюда",
    name: "Лосось с овощами",
    price: 2100,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-4",
    category: "Основные блюда",
    name: "Утиная ножка конфи",
    price: 1500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-5",
    category: "Основные блюда",
    name: "Бургер из быка с домашним картофелем фри",
    price: 1900,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-6",
    category: "Основные блюда",
    name: "Куриный бургер с домашним картофелем фри",
    price: 1500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-7",
    category: "Основные блюда",
    name: "Стейк рибай с зелёным салатом и перечным соусом",
    pricePer100g: 2900,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-8",
    category: "Основные блюда",
    name: "Филе миньон с зелёным салатом и перечным соусом",
    price: 2500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-9",
    category: "Основные блюда",
    name: "Бефстроганов с грибами и картофельным пюре",
    price: 1500,
    currency: "RUB",
    hasImage: false
  },
  {
    id: "m-10",
    category: "Основные блюда",
    name: "Куриное бедро с перловкой и белыми грибами",
    price: 1300,
    currency: "RUB",
    hasImage: false
  }
];

export const categories: Category[] = [
  "Завтрак",
  "Закуски и салаты",
  "Паста и ризотто",
  "Супы",
  "Основные блюда"
];
