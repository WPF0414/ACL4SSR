const currentDate = new Date();
currentDate.setDate(1);
const purchaseDate = Math.floor(currentDate.getTime() / 1000);
const expectedExpiration = purchaseDate + 365 * 24 * 60 * 60;
const now = Math.floor(new Date().getTime() / 1000);
const oneDayLater = Math.floor((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000);

let body = $response.body;

// 解析外层 JSON
let responsesObj = JSON.parse(body);

// 只处理第一个 response 的 body
if (responsesObj.responses && responsesObj.responses.length > 0) {
  let firstResponse = responsesObj.responses[0];
  
  // 解析 body 字符串为 JSON 对象
  let bodyObj = JSON.parse(firstResponse.body);

  // 修改 shopItems
  bodyObj.shopItems = [
    {
      purchaseId: "85025a2811bcc64c1f75ba303e06bb2c",
      purchaseDate: purchaseDate,
      purchasePrice: 0,
      id: "streak_freeze",
      itemName: "streak_freeze",
      quantity: 2
    },
    {
      purchaseId: "0db09c5d29137ebf30bffd884880ca25",
      purchaseDate: purchaseDate,
      purchasePrice: 0,
      id: "duo_streak_freeze",
      itemName: "duo_streak_freeze",
      quantity: 2
    },
    {
      purchaseId: "5cb70b12a901ff2a242612ab15c2a28b",
      purchaseDate: purchaseDate,
      purchasePrice: 9599,
      id: "gold_subscription",
      itemName: "gold_subscription",
      subscriptionInfo: {
        currency: "CNY",
        expectedExpiration: expectedExpiration,
        isFreeTrialPeriod: false,
        isIntroOfferPeriod: false,
        isInBillingRetryPeriod: false,
        periodLength: 12,
        price: 58800,
        productId: "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120",
        renewer: "APPLE",
        renewing: true,
        tier: "twelve_month",
        type: "gold",
        vendorPurchaseId: "360002218235864",
        promotionalOfferId: ""
      }
    },
    {
      purchaseId: "821960f1727a74705da69aa5e0ce962c",
      purchaseDate: purchaseDate,
      purchasePrice: 0,
      id: "streak_repair",
      itemName: "streak_repair"
    },
    {
      purchaseId: "96d04a74bb24bc66f7899dacc229cace",
      purchaseDate: now,
      purchasePrice: 0,
      id: "xp_boost_stackable",
      itemName: "xp_boost_stackable",
      remainingEffectDurationInSeconds: 86400,
      expectedExpirationDate: oneDayLater,
      xpBoostMultiplier: 2.0
    }
  ];

  // 修改 subscriptionConfigs
  bodyObj.subscriptionConfigs = [
    {
      vendorPurchaseId: "360002218235864",
      isInBillingRetryPeriod: false,
      isInGracePeriod: false,
      pauseStart: purchaseDate,
      pauseEnd: null,
      productId: "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120",
      receiptSource: 1
    }
  ];

  // 修改其他字段
  bodyObj.has_item_gold_subscription = true;
  bodyObj.subscriberLevel = "GOLD";
  bodyObj.timerBoosts = 999;
  bodyObj.hasPurchasedTimerBoost = true;
  bodyObj.num_item_streak_freeze_total = 2;
  bodyObj.num_item_streak_freeze = 2;
  bodyObj.has_item_streak_freeze = true;
  bodyObj.gems = 99999;

  // 将修改后的 bodyObj 序列化回转义字符串
  firstResponse.body = JSON.stringify(bodyObj);
}

// 将外层对象序列化回字符串
body = JSON.stringify(responsesObj);

$done({ body });
