import { defineStore } from 'pinia';

export const useCampaignStore = defineStore('campaign', {
  state: () => ({
    currentCampaignId: null,
  }),
  actions: {
    setCurrentCampaignId(campaign) {
      this.currentCampaignId = campaign;
    },
  },
});
