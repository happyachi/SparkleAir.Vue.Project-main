import { defineStore } from "pinia";

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    selectedCoupon: null, 
  }),
  actions: {
    selectCoupon(coupon) {
      this.selectedCoupon = coupon;
    }
  }
});
