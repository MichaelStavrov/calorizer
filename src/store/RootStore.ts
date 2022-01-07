import { create } from 'mobx-persist';

import UserStore from './UserStore';

const hydrate = create({});

class RootStore {
  UserStore = UserStore;

  constructor() {
    hydrate('user', this.UserStore);
  }
}

export default new RootStore();
