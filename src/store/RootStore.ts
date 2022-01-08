import { create } from 'mobx-persist';

import UserStore from './UserStore';
import ProductStore from './ProductStore';

const hydrate = create({});

class RootStore {
  UserStore = UserStore;

  ProductStore = ProductStore;

  constructor() {
    hydrate('user', this.UserStore);
    hydrate('products', this.ProductStore);
  }
}

export default new RootStore();
