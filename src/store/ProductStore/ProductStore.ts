import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  ProductCategories,
  ProductItem,
  Products,
  products,
} from '../../data/products';
import { deepCopy } from '../../utils/deepCopy';

class ProductStore {
  @persist('object') products = products;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get sortedProducts() {
    const productsCopy: Products[] = deepCopy(this.products);
    return productsCopy.map((product) => ({
      ...product,
      items: product.items.sort((a, b) => {
        return a.name >= b.name ? 1 : -1;
      }),
    }));
  }

  addProduct(productCategory: ProductCategories, newProduct: ProductItem) {
    const newProducts = this.products.map((products) =>
      products.productCategory === productCategory
        ? { ...products, items: [...products.items, newProduct] }
        : products
    );
    this.products = newProducts;
  }
}

export default new ProductStore();
