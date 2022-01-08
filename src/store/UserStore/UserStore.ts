import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
class UserStore {
  @persist userWeight = '';

  @persist userKcal = 0;

  @persist mealsNumber = 5;

  @persist('list') menuForOneDay: any[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUserWeight(value: string) {
    this.userWeight = value;
  }

  setUserKcal(value: number) {
    this.userKcal = value;
  }

  setMealsNumber(value: number) {
    this.mealsNumber = value;
  }

  addToMenuForOneDay(value: any) {
    this.menuForOneDay.push(value);
  }
}

export default new UserStore();
