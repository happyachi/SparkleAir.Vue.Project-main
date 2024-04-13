import httpInstance from "@/utils/http";

/**
 * 送變數到API，請API生成綠界要用的資料
 * @param {*} data需要的參數如下
 * @param {*} returnURL 綠界要回傳的資料到哪裡
 * @param {*} orderResultURL  交易後頁面要導去哪裡
 * @param {*} totalAmount 交易金額
 * @param {*} tradeDesc 交易描述
 * @param {*} itemName 交易項目
 * @returns 綠界要用的資料
 */
export function createECPayResponseData(data) {
  return httpInstance({
    method: "POST",
    url: "ECPayPayments/Index",
    data,
  });
}
