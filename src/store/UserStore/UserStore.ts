import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { FullMenu, MealToMenuForOneDay, MenuForOneDay } from '../../types';
class UserStore {
  @persist userWeight = '';

  @persist userKcal = 0;

  @persist mealsNumber = 5;

  @persist('object') menuForOneDay: MenuForOneDay = {};

  @persist menuForOneDayId = 0;

  @persist('list') fullMenu: FullMenu[] = [];

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

  addToMenuForOneDay(value: MealToMenuForOneDay, mealNumber: number) {
    if (Object.values(value).some(Boolean)) {
      this.menuForOneDay = {
        ...this.menuForOneDay,
        [`meal${mealNumber + 1}`]: value,
      };
    }
  }

  resetMenuForOneDay() {
    this.menuForOneDay = {};
  }

  incMenuForOneDayId() {
    this.menuForOneDayId = this.menuForOneDayId + 1;
  }

  addToFullMenu(totalKcal: number) {
    this.incMenuForOneDayId();
    this.fullMenu = [
      {
        id: this.menuForOneDayId,
        meal: this.menuForOneDay,
        totalKcal: totalKcal || 0,
      },
      ...this.fullMenu,
    ];
  }

  removeMenu(id: number) {
    this.fullMenu = this.fullMenu.filter((menu) => menu.id !== id);
  }
}

export default new UserStore();
