import httpInstance from "@/utils/http";

export function getDiscount(id) {
  return httpInstance({
    url: `CampaignsDiscount/Discount/${id}`,
  });
}
