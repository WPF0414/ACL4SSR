const currentDate = new Date();

// 1. 本月第一天的时间戳
currentDate.setDate(1);
const purchaseDate = Math.floor(currentDate.getTime() / 1000);

// 2. 本月第一天加上一年的时间戳
const expectedExpiration = purchaseDate + 365 * 24 * 60 * 60;

// 3. 当前时间戳
const now = Math.floor(new Date().getTime() / 1000);

// 4. 当前时间+1天的时间戳
const oneDayLater = now + 24 * 60 * 60;

let body = $response.body;

// 创建一个替换规则数组
const replacements = [
  // 伪造购买记录，添加 Premium 订阅
  [
    /\\"shopItems\\".*?\\"totalXp\\"/,
    `\\"shopItems\\":[
      {\\"purchaseId\\":\\"85025a2811bcc64c1f75ba303e06bb2c\\",\\"purchaseDate\\":${purchaseDate},\\"purchasePrice\\":0,\\"id\\":\\"streak_freeze\\",\\"itemName\\":\\"streak_freeze\\",\\"quantity\\":2},
      {\\"purchaseId\\":\\"0db09c5d29137ebf30bffd884880ca25\\",\\"purchaseDate\\":${purchaseDate},\\"purchasePrice\\":0,\\"id\\":\\"duo_streak_freeze\\",\\"itemName\\":\\"duo_streak_freeze\\",\\"quantity\\":2},
      {\\"purchaseId\\":\\"5cb70b12a901ff2a242612ab15c2a28b\\",\\"purchaseDate\\":${purchaseDate},\\"purchasePrice\\":9599,\\"id\\":\\"gold_subscription\\",\\"itemName\\":\\"gold_subscription\\",\\"subscriptionInfo\\":{\\"currency\\":\\"CNY\\",\\"expectedExpiration\\":${expectedExpiration},\\"isFreeTrialPeriod\\":false,\\"isIntroOfferPeriod\\":false,\\"isInBillingRetryPeriod\\":false,\\"periodLength\\":12,\\"price\\":58800,\\"productId\\":\\"com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120\\",\\"renewer\\":\\"APPLE\\",\\"renewing\\":true,\\"tier\\":\\"twelve_month\\",\\"type\\":\\"gold\\",\\"vendorPurchaseId\\":\\"360002218235864\\",\\"promotionalOfferId\\":\\"\\"}},
      {\\"purchaseId\\":\\"821960f1727a74705da69aa5e0ce962c\\",\\"purchaseDate\\":${purchaseDate},\\"purchasePrice\\":0,\\"id\\":\\"streak_repair\\",\\"itemName\\":\\"streak_repair\\"},
      {\\"purchaseId\\":\\"96d04a74bb24bc66f7899dacc229cace\\",\\"purchaseDate\\":${now},\\"purchasePrice\\":0,\\"id\\":\\"xp_boost_stackable\\",\\"itemName\\":\\"xp_boost_stackable\\",\\"remainingEffectDurationInSeconds\\":86400,\\"expectedExpirationDate\\":${oneDayLater},\\"xpBoostMultiplier\\":2.0}
    ],\\"totalXp\\"`
  ],
  
  // 伪造订阅配置
  [
    /\\"subscriptionConfigs\\".*?\\"blockerUserIds\\"/,
    `\\"subscriptionConfigs\\":[
      {\\"vendorPurchaseId\\":\\"360002218235864\\",\\"isInBillingRetryPeriod\\":false,\\"isInGracePeriod\\":false,\\"pauseStart\\":${purchaseDate},\\"pauseEnd\\":null,\\"productId\\":\\"com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120\\",\\"receiptSource\\":1}
    ],\\"blockerUserIds\\"`
  ],
  
  // 修改订阅状态
  [/\\"has_item_gold_subscription\\":false/g, '\\"has_item_gold_subscription\\":true'],
  [/\\"subscriberLevel\\":\\"FREE\\"/g, '\\"subscriberLevel\\":\\"GOLD\\"'],
  
  // 修改时间宝
  [/\\"timerBoosts\\":\d+/g, '\\"timerBoosts\\":999'],
  [/\\"hasPurchasedTimerBoost\\":false/g, '\\"hasPurchasedTimerBoost\\":true'],
  
  // 修改连胜激冻
  [/\\"num_item_streak_freeze_total\\":\d+/g, '\\"num_item_streak_freeze_total\\":2'],
  [/\\"num_item_streak_freeze\\":\d+/g, '\\"num_item_streak_freeze\\":2'],
  [/\\"has_item_streak_freeze\\":false/g, '\\"has_item_streak_freeze\\":true'],
  
  // 修改宝石
  [/\\"gems\\":\d+/g, '\\"gems\\":99999']
];

// 应用所有替换规则
replacements.forEach(([pattern, replacement]) => {
  body = body.replace(pattern, replacement);
});

$done({ body });
