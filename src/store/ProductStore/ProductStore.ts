import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';

import { products } from '../../data/products';

class ProductStore {
  @persist('object') products = products;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get sortedProducts() {
    return products.map((product) => ({
      ...product,
      items: product.items.sort((a, b) => {
        return a.name >= b.name ? 1 : -1;
      }),
    }));
  }
}

export default new ProductStore();
