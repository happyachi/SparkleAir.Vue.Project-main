import httpInstance from "@/utils/http";

export function gettfitem() {
  return httpInstance({
    url: "TFitem",
  });
}

export function gettfitemID(id) {
  return httpInstance({
    url: `TFitem/${id}`,
  });
}

export function gettfcategory() {
  return httpInstance({
    url: "TFitem/categories",
  });
}

export function gettfcategoryID(id) {
  return httpInstance({
    url: `TFitem/categories/${id}`,
  });
}

export function cartitem() {
  return httpInstance({
    url: "TForderlist",
  });
}

export function addtocart(productInfo) {
  return httpInstance({
    url: `TForderlist/addtocart?${productInfo}`,
    method: "post",
  });
}

export function getticketcartID(id) {
  return httpInstance({
    url: `TForderlist/getbyticketid/${id}`,
  });
}

export function removefromcart(id) {
  return httpInstance({
    url: `/TForderlist/${id}`,
    method: "delete",
  });
}

export function getReceiptticket(id) {
  return httpInstance({
    url: `/TFresevelist/${id}`,
  });
}
