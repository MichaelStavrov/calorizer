export enum ProductCategories {
  carbohydrates = 'carbohydrates',
  proteins = 'proteins',
  fats = 'fats',
}

export interface ProductItem {
  name: string;
  kcal: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}
export interface Products {
  category: string;
  productCategory: ProductCategories;
  items: ProductItem[];
}

export const products: Products[] = [
  {
    category: 'Крупы',
    productCategory: ProductCategories.carbohydrates,
    items: [
      {
        name: 'Овсянка Геркулес',
        kcal: 360,
        proteins: 12,
        fats: 6,
        carbohydrates: 62,
      },
      {
        name: 'Макароны Barilla',
        kcal: 360,
        proteins: 14,
        fats: 2,
        carbohydrates: 70,
      },
      {
        name: 'Гречка Селяночка',
        kcal: 330,
        proteins: 13,
        fats: 3,
        carbohydrates: 70,
      },
      {
        name: 'Рис Индика Brown',
        kcal: 340,
        proteins: 8,
        fats: 2,
        carbohydrates: 73,
      },
    ],
  },
  {
    category: 'Мясо',
    productCategory: ProductCategories.proteins,
    items: [
      {
        name: 'Филе куриное Петелинка',
        kcal: 110,
        proteins: 21,
        fats: 3,
        carbohydrates: 0,
      },
      {
        name: 'Филе индейки Индилайт',
        kcal: 100,
        proteins: 20,
        fats: 3,
        carbohydrates: 0,
      },
      {
        name: 'Филе голени индейки Индилайт',
        kcal: 150,
        proteins: 16,
        fats: 10,
        carbohydrates: 0,
      },
      {
        name: 'Филе минтая',
        kcal: 75,
        proteins: 16,
        fats: 1,
        carbohydrates: 0,
      },
    ],
  },
  {
    category: 'Растительные масла',
    productCategory: ProductCategories.fats,
    items: [
      {
        name: 'Льняное масло',
        kcal: 900,
        proteins: 0,
        fats: 100,
        carbohydrates: 0,
      },
      {
        name: 'Оливковое масло',
        kcal: 900,
        proteins: 0,
        fats: 100,
        carbohydrates: 0,
      },
    ],
  },
  {
    category: 'Овощи',
    productCategory: ProductCategories.carbohydrates,
    items: [
      {
        name: 'Огурцы',
        kcal: 16,
        proteins: 0,
        fats: 0,
        carbohydrates: 3,
      },
      {
        name: 'Помидоры',
        kcal: 20,
        proteins: 0,
        fats: 0,
        carbohydrates: 4,
      },
      {
        name: 'Капуста',
        kcal: 27,
        proteins: 0,
        fats: 0,
        carbohydrates: 5,
      },
    ],
  },
];
