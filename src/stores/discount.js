import { defineStore } from "pinia";

export const useDiscountStore = defineStore('discount', {
  state: () => ({
    selectedDiscount: null,
  }),
  actions: {
    selectDiscount(discount) {
      this.selectedDiscount = discount;
    }
  }
});