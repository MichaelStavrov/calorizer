import { makeAutoObservable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';

class UserStore {
  @persist userWeight = '';

  @persist userKcal = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUserWeight(value: string) {
    this.userWeight = value;
  }

  setUserKcal(value: number) {
    this.userKcal = value;
  }
}

export default new UserStore();
