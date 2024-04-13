function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // 獲取日期部分（YYYY年MM月DD日）
  const formattedDate = `${dateTime.getFullYear()}年${(dateTime.getMonth() + 1)
    .toString()
    .padStart(2, "0")}月${dateTime.getDate().toString().padStart(2, "0")}日`;

  return formattedDate;
}
export function getDateTimeParts(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const datePart = formatDate(dateTime.toISOString().split("T")[0]);
  const timePart = dateTime.toString().slice(-26, -21);

  return { datePart, timePart };
}

function formatHourDifference(hoursDifference) {
  // 取整數部分（小時）
  const hours = Math.floor(hoursDifference);
  // 取小數部分，並將其轉換為分鐘
  const minutes = Math.round((hoursDifference - hours) * 60);

  return `${hours} 小時 ${minutes} 分鐘`;
}
export function calculateHourDifference(
  scheduledArrival,
  arrivalTimeZone,
  scheduledDeparture,
  departureTimeZone
) {
  const arrivalTime = new Date(scheduledArrival);
  const departureTime = new Date(scheduledDeparture);

  // 將時區轉成毫秒
  const arrivalTimeZoneOffset = arrivalTimeZone * 60 * 60 * 1000;
  const departureTimeZoneOffset = departureTimeZone * 60 * 60 * 1000;
  const offset = arrivalTimeZoneOffset - departureTimeZoneOffset;

  // 時區加到時間中
  const adjustedArrivalTime = new Date(arrivalTime.getTime() - offset);
  const adjustedDepartureTime = new Date(departureTime.getTime());

  // 時間差
  let timeDiff = adjustedArrivalTime - adjustedDepartureTime;

  if (timeDiff < 0) {
    timeDiff += 24 * 60 * 60 * 1000;
  }

  // 把時差轉成小時
  const hoursDifference = timeDiff / (1000 * 60 * 60);
  return formatHourDifference(hoursDifference);
}

function getDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const datePart = formatDate(dateTime.toISOString().split("T")[0]);
  const hours = dateTime.getUTCHours();
  const minutes = ("0" + dateTime.getUTCMinutes()).slice(-2);

  // 加上 下午 OR 上午
  const period = hours >= 12 ? "下午" : "上午";

  // 轉成12小時制
  const displayHours = ("0" + (((hours + 11) % 12) + 1)).slice(-2);

  const timePart = `${period} ${displayHours}:${minutes}`;
  return { datePart, timePart };
}

export function GetCurrentPlaceTime(timeZone) {
  // 獲取現在 UTC 時間
  const utcTimeMilliseconds = Date.now();

  // 根據時區偏移值計算毫秒數
  const offsetMilliseconds = timeZone * 60 * 60 * 1000

  // 調整時間
  const adjustedTime = new Date(utcTimeMilliseconds + offsetMilliseconds);

  // 返回格式化後的時間
  return getDateTime(adjustedTime);
}
