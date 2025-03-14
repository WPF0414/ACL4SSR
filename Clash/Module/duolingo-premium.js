const currentDate = new Date();
currentDate.setDate(1);
const purchaseDate = Math.floor(currentDate.getTime() / 1000);
const expectedExpiration = purchaseDate + 365 * 24 * 60 * 60;
const now = Math.floor(new Date().getTime() / 1000);
const oneDayLater = now + 24 * 60 * 60;

// 预定义修改数据
const shopItems = [
  { purchaseId: "85025a2811bcc64c1f75ba303e06bb2c", purchaseDate, purchasePrice: 0, id: "streak_freeze", itemName: "streak_freeze", quantity: 2 },
  { purchaseId: "0db09c5d29137ebf30bffd884880ca25", purchaseDate, purchasePrice: 0, id: "duo_streak_freeze", itemName: "duo_streak_freeze", quantity: 2 },
  { purchaseId: "5cb70b12a901ff2a242612ab15c2a28b", purchaseDate, purchasePrice: 9599, id: "gold_subscription", itemName: "gold_subscription", subscriptionInfo: {
      currency: "CNY", expectedExpiration, isFreeTrialPeriod: false, isIntroOfferPeriod: false, isInBillingRetryPeriod: false, periodLength: 12, price: 58800,
      productId: "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120", renewer: "APPLE", renewing: true, tier: "twelve_month", type: "gold",
      vendorPurchaseId: "360002218235864", promotionalOfferId: ""
    }
  },
  { purchaseId: "821960f1727a74705da69aa5e0ce962c", purchaseDate, purchasePrice: 0, id: "streak_repair", itemName: "streak_repair" },
  { purchaseId: "96d04a74bb24bc66f7899dacc229cace", purchaseDate: now, purchasePrice: 0, id: "xp_boost_stackable", itemName: "xp_boost_stackable", remainingEffectDurationInSeconds: 86400, expectedExpirationDate: oneDayLater, xpBoostMultiplier: 2.0 }
];

const subscriptionConfigs = [
  { vendorPurchaseId: "360002218235864", isInBillingRetryPeriod: false, isInGracePeriod: false, pauseStart: purchaseDate, pauseEnd: null, productId: "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120", receiptSource: 1 }
];

const updates = {
  shopItems,
  subscriptionConfigs,
  has_item_gold_subscription: true,
  subscriberLevel: "GOLD",
  timerBoosts: 999,
  hasPurchasedTimerBoost: true,
  num_item_streak_freeze_total: 2,
  num_item_streak_freeze: 2,
  has_item_streak_freeze: true,
  gems: 99999
};

// 处理响应
let body = $response.body;
try {
  const responsesObj = JSON.parse(body);
  if (responsesObj.responses?.[0]) {
    const bodyObj = JSON.parse(responsesObj.responses[0].body);
    Object.assign(bodyObj, updates); // 合并更新
    responsesObj.responses[0].body = JSON.stringify(bodyObj);
  }
  body = JSON.stringify(responsesObj);
} catch (e) {
  console.error("Error processing response:", e);
}

$done({ body });
