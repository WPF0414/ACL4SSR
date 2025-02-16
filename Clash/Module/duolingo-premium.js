// 获取当前时间并计算当前月的 1 号的时间戳
const currentDate = new Date();

const expiresIn30Minutes = currentDate.getTime / 1000 + 30 * 60;

currentDate.setDate(1); // 设置为当前月的 1 号
const currentMonthStartTimestamp = Math.floor(currentDate.getTime() / 1000); // 获取 1 号的时间戳（秒）
const expectedExpiration = currentMonthStartTimestamp + 365 * 24 * 60 * 60;

let body = $response.body;

// 修改订阅状态，解锁 Premium
body = body
  .replace(/\\"has_item_premium_subscription\\":false/g, '\\"has_item_premium_subscription\\":true')
  .replace(/\\"subscriberLevel\\":\\"FREE\\"/g, '\\"subscriberLevel\\":\\"PREMIUM\\"')

// 修改时间宝
body = body
  .replace(/\\"timerBoosts\\":\d+/g, '\\"timerBoosts\\":999')
  .replace(/\\"hasPurchasedTimerBoost\\":false/g, '\\"hasPurchasedTimerBoost\\":true');

// 修改连胜激冻
body = body
  .replace(/\\"num_item_streak_freeze_total\\":\d+/g, '\\"num_item_streak_freeze_total\\":2')
  .replace(/\\"num_item_streak_freeze\\":\d+/g, '\\"num_item_streak_freeze\\":2')
  .replace(/\\"has_item_streak_freeze\\":false/g, '\\"has_item_streak_freeze\\":true');

// 修改宝石
body = body
  .replace(/\\"gems\\":\d+/g, '\\"gems\\":99999');
  
// 伪造购买记录，添加 Premium 订阅
body = body.replace(
  /\\"shopItems\\".*?\\"totalXp\\"/,
  `\\"shopItems\\":[{\\"purchaseId\\":\\"85025a2811bcc64c1f75ba303e06bb2c\\",\\"purchaseDate\\":${currentMonthStartTimestamp},\\"purchasePrice\\":0,\\"id\\":\\"streak_freeze\\",\\"itemName\\":\\"streak_freeze\\",\\"quantity\\":2},{\\"purchaseId\\":\\"0db09c5d29137ebf30bffd884880ca25\\",\\"purchaseDate\\":${currentMonthStartTimestamp},\\"purchasePrice\\":0,\\"id\\":\\"duo_streak_freeze\\",\\"itemName\\":\\"duo_streak_freeze\\",\\"quantity\\":2},{\\"purchaseId\\":\\"5cb70b12a901ff2a242612ab15c2a28b\\",\\"purchaseDate\\":${currentMonthStartTimestamp},\\"purchasePrice\\":9599,\\"id\\":\\"premium_subscription\\",\\"itemName\\":\\"premium_subscription\\",\\"subscriptionInfo\\":{\\"currency\\":\\"CNY\\",\\"expectedExpiration\\":${expectedExpiration},\\"isFreeTrialPeriod\\":false,\\"isIntroOfferPeriod\\":false,\\"isInBillingRetryPeriod\\":false,\\"periodLength\\":12,\\"price\\":58800,\\"productId\\":\\"com.duolingo.DuolingoMobile.subscription.Premium.TwelveMonth.25Q1Inc10o2.120\\",\\"renewer\\":\\"APPLE\\",\\"renewing\\":true,\\"tier\\":\\"twelve_month\\",\\"type\\":\\"premium\\",\\"vendorPurchaseId\\":\\"360002218235864\\",\\"promotionalOfferId\\":\\"\\"}},{\\"purchaseId\\":\\"821960f1727a74705da69aa5e0ce962c\\",\\"purchaseDate\\":${currentMonthStartTimestamp},\\"purchasePrice\\":0,\\"id\\":\\"streak_repair\\",\\"itemName\\":\\"streak_repair\\"}],\\"totalXp\\"`
);

// 伪造订阅配置
body = body.replace(
  /\\"subscriptionConfigs\\".*?\\"blockerUserIds\\"/,
  `\\"subscriptionConfigs\\":[{\\"vendorPurchaseId\\":\\"360002218235864\\",\\"isInBillingRetryPeriod\\":false,\\"isInGracePeriod\\":false,\\"pauseStart\\":${currentMonthStartTimestamp},\\"pauseEnd\\":null,\\"productId\\":\\"com.duolingo.DuolingoMobile.subscription.Premium.TwelveMonth.25Q1Inc10o2.120\\",\\"receiptSource\\":1}],\\"blockerUserIds\\"`
);

$done({ body });
