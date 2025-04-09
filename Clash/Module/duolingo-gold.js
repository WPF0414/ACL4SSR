// 计算时间戳
const now = Math.floor(Date.now() / 1000);
const currentDate = new Date();
currentDate.setDate(1);
const purchaseDate = Math.floor(currentDate.getTime() / 1000);
const expectedExpiration = purchaseDate + 365 * 24 * 60 * 60;
const oneDayLater = now + 24 * 60 * 60;

// 获取原始响应体并解析为JSON
let jsonObj;
try {
  jsonObj = JSON.parse($response.body);
} catch (e) {
  $done({});
  return;
}

// 直接修改JSON对象，避免字符串操作
// 1. 修改购买记录
jsonObj.shopItems = [
  {
    "purchaseId": "85025a2811bcc64c1f75ba303e06bb2c",
    "purchaseDate": purchaseDate,
    "purchasePrice": 0,
    "id": "streak_freeze",
    "itemName": "streak_freeze",
    "quantity": 2
  },
  {
    "purchaseId": "0db09c5d29137ebf30bffd884880ca25",
    "purchaseDate": purchaseDate,
    "purchasePrice": 0,
    "id": "duo_streak_freeze",
    "itemName": "duo_streak_freeze",
    "quantity": 2
  },
  {
    "purchaseId": "5cb70b12a901ff2a242612ab15c2a28b",
    "purchaseDate": purchaseDate,
    "purchasePrice": 9599,
    "id": "gold_subscription",
    "itemName": "gold_subscription",
    "subscriptionInfo": {
      "currency": "CNY",
      "expectedExpiration": expectedExpiration,
      "isFreeTrialPeriod": false,
      "isIntroOfferPeriod": false,
      "isInBillingRetryPeriod": false,
      "periodLength": 12,
      "price": 58800,
      "productId": "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120",
      "renewer": "APPLE",
      "renewing": true,
      "tier": "twelve_month",
      "type": "gold",
      "vendorPurchaseId": "360002218235864",
      "promotionalOfferId": ""
    }
  },
  {
    "purchaseId": "821960f1727a74705da69aa5e0ce962c",
    "purchaseDate": purchaseDate,
    "purchasePrice": 0,
    "id": "streak_repair",
    "itemName": "streak_repair"
  },
  {
    "purchaseId": "96d04a74bb24bc66f7899dacc229cace",
    "purchaseDate": now,
    "purchasePrice": 0,
    "id": "xp_boost_stackable",
    "itemName": "xp_boost_stackable",
    "remainingEffectDurationInSeconds": 86400,
    "expectedExpirationDate": oneDayLater,
    "xpBoostMultiplier": 2.0
  }
];

// 2. 修改订阅配置
jsonObj.subscriptionConfigs = [
  {
    "vendorPurchaseId": "360002218235864",
    "isInBillingRetryPeriod": false,
    "isInGracePeriod": false,
    "pauseStart": purchaseDate,
    "pauseEnd": null,
    "productId": "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120",
    "receiptSource": 1
  }
];

// 3. 修改订阅状态
jsonObj.has_item_gold_subscription = true;
jsonObj.subscriberLevel = "GOLD";

// 4. 修改时间宝
jsonObj.timerBoosts = 999;
jsonObj.hasPurchasedTimerBoost = true;

// 5. 修改连胜激冻
jsonObj.num_item_streak_freeze_total = 2;
jsonObj.num_item_streak_freeze = 2;
jsonObj.has_item_streak_freeze = true;

// 6. 修改宝石
jsonObj.gems = 99999;

// 将修改后的对象转回JSON字符串
$done({ body: JSON.stringify(jsonObj) });
