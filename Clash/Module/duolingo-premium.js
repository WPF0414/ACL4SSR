// duolingo-premium.js

let body = $response.body;

// 修改订阅状态，解锁 Premium
body = body
  .replace(/\\"has_item_premium_subscription\\":false/g, '\\"has_item_premium_subscription\\":true')
  .replace(/\\"subscriberLevel\\":\\"FREE\\"/g, '\\"subscriberLevel\\":\\"PREMIUM\\"');

// 修改时间宝999
body = body
  .replace(/\\"timerBoosts\\":\d+/g, '\\"timerBoosts\\":999')
  .replace(/\\"hasPurchasedTimerBoost\\":false/g, '\\"hasPurchasedTimerBoost\\":true');


// 伪造购买记录，添加 Premium 订阅
body = body.replace(
  /\\"shopItems\\".*?\\"totalXp\\"/,
  `\\"shopItems\\":[{\\"purchaseId\\":\\"85025a2811bcc64c1f75ba303e06bb2c\\",\\"purchaseDate\\":1738549318,\\"purchasePrice\\":0,\\"id\\":\\"streak_freeze\\",\\"itemName\\":\\"streak_freeze\\",\\"quantity\\":1},{\\"purchaseId\\":\\"0db09c5d29137ebf30bffd884880ca25\\",\\"purchaseDate\\":1738855636,\\"purchasePrice\\":0,\\"id\\":\\"duo_streak_freeze\\",\\"itemName\\":\\"duo_streak_freeze\\",\\"quantity\\":1},{\\"purchaseId\\":\\"5cb70b12a901ff2a242612ab15c2a28b\\",\\"purchaseDate\\":1739112421,\\"purchasePrice\\":9599,\\"id\\":\\"premium_subscription\\",\\"itemName\\":\\"premium_subscription\\",\\"subscriptionInfo\\":{\\"currency\\":\\"CNY\\",\\"expectedExpiration\\":1770652800,\\"isFreeTrialPeriod\\":false,\\"isIntroOfferPeriod\\":false,\\"isInBillingRetryPeriod\\":false,\\"periodLength\\":12,\\"price\\":58800,\\"productId\\":\\"com.duolingo.DuolingoMobile.subscription.Premium.TwelveMonth.25Q1Inc10o2.120\\",\\"renewer\\":\\"APPLE\\",\\"renewing\\":true,\\"tier\\":\\"twelve_month\\",\\"type\\":\\"premium\\",\\"vendorPurchaseId\\":\\"360002218235864\\",\\"promotionalOfferId\\":\\"\\"}},{\\"purchaseId\\":\\"821960f1727a74705da69aa5e0ce962c\\",\\"purchaseDate\\":1739112493,\\"purchasePrice\\":0,\\"id\\":\\"streak_repair\\",\\"itemName\\":\\"streak_repair\\"}],\\"totalXp\\"`
);

// 伪造订阅配置
body = body.replace(
  /\\"subscriptionConfigs\\".*?\\"blockerUserIds\\"/,
  `\\"subscriptionConfigs\\":[{\\"vendorPurchaseId\\":\\"360002218235864\\",\\"isInBillingRetryPeriod\\":false,\\"isInGracePeriod\\":false,\\"pauseStart\\":1770652800,\\"pauseEnd\\":null,\\"productId\\":\\"com.duolingo.DuolingoMobile.subscription.Premium.TwelveMonth.25Q1Inc10o2.120\\",\\"receiptSource\\":1}],\\"blockerUserIds\\"`
);

$done({ body });
