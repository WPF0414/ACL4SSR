/*
 * 多邻国会员解锁 —— 合并版（duolingo-premium + duolingo-gold）
 * 支持接口：
 *   /2023-05-23/batch                （body 为字符串化 JSON，键名形如 \"shopItems\"，原 premium 版）
 *   /2023-05-23/users/{id}?fields=*  （普通 JSON，键名形如 "shopItems"，原 gold 版）
 * 自动识别 body 是否为转义形式，两个接口共用同一套逻辑。
 * 更新日期：2026.11.16
 * 版本：2.0
 */

const currentDate = new Date();

// 1. 本月第一天的时间戳
currentDate.setDate(1);
const purchaseDate = Math.floor(currentDate.getTime() / 1000);

// 2. 本月第一天加上一年的时间戳
const expectedExpiration = purchaseDate + 365 * 24 * 60 * 60;

// 3. 当前时间戳
const now = Math.floor(Date.now() / 1000);

// 4. 当前时间 + 1 天的时间戳
const oneDayLater = Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000);

let body = typeof $response !== "undefined" && $response.body ? $response.body : "";

if (!body) {
  $done({});
} else {
  // 判断 body 是否为转义形式（/batch 返回字符串化 JSON）
  const escaped =
    body.indexOf('\\"shopItems\\"') !== -1 ||
    body.indexOf('\\"subscriberLevel\\"') !== -1 ||
    body.indexOf('\\"has_item_gold_subscription\\"') !== -1;

  // 正则源码：转义模式下引号前需要一个真正的反斜杠 -> \\"
  const RX = (s) => (escaped ? s.replace(/"/g, () => '\\\\"') : s);
  // 替换文本：转义模式下引号前需要一个转义用的反斜杠 -> \"
  const RP = (s) => (escaped ? s.replace(/"/g, () => '\\"') : s);

  // 统一替换器
  const R = (pattern, replacement, global) => {
    body = body.replace(new RegExp(RX(pattern), global ? "g" : ""), RP(replacement));
  };

  // ── 伪造购买记录，添加 Premium 订阅 ──
  R(
    '"shopItems".*?"totalXp"',
    `"shopItems":[` +
      `{"purchaseId":"85025a2811bcc64c1f75ba303e06bb2c","purchaseDate":${purchaseDate},"purchasePrice":0,"id":"streak_freeze","itemName":"streak_freeze","quantity":2},` +
      `{"purchaseId":"0db09c5d29137ebf30bffd884880ca25","purchaseDate":${purchaseDate},"purchasePrice":0,"id":"duo_streak_freeze","itemName":"duo_streak_freeze","quantity":2},` +
      `{"purchaseId":"5cb70b12a901ff2a242612ab15c2a28b","purchaseDate":${purchaseDate},"purchasePrice":9599,"id":"gold_subscription","itemName":"gold_subscription","subscriptionInfo":{"currency":"CNY","expectedExpiration":${expectedExpiration},"isFreeTrialPeriod":false,"isIntroOfferPeriod":false,"isInBillingRetryPeriod":false,"periodLength":12,"price":58800,"productId":"com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120","renewer":"APPLE","renewing":true,"tier":"twelve_month","type":"gold","vendorPurchaseId":"360002218235864","promotionalOfferId":""}},` +
      `{"purchaseId":"821960f1727a74705da69aa5e0ce962c","purchaseDate":${purchaseDate},"purchasePrice":0,"id":"streak_repair","itemName":"streak_repair"},` +
      `{"purchaseId":"96d04a74bb24bc66f7899dacc229cace","purchaseDate":${now},"purchasePrice":0,"id":"xp_boost_stackable","itemName":"xp_boost_stackable","remainingEffectDurationInSeconds":86400,"expectedExpirationDate":${oneDayLater},"xpBoostMultiplier":3.0}` +
      `],"totalXp"`
  );

  // ── 伪造订阅配置 ──
  R(
    '"subscriptionConfigs".*?"blockerUserIds"',
    `"subscriptionConfigs":[{"vendorPurchaseId":"360002218235864","isInBillingRetryPeriod":false,"isInGracePeriod":false,"pauseStart":${purchaseDate},"pauseEnd":null,"productId":"com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.25Q1Inc10o2.120","receiptSource":1}],"blockerUserIds"`
  );

  // ── 订阅状态，解锁 Premium ──
  R('"has_item_gold_subscription":false', '"has_item_gold_subscription":true', true);
  R('"subscriberLevel":"FREE"', '"subscriberLevel":"GOLD"', true);

  // ── 时间宝 ──
  R('"timerBoosts":\\d+', '"timerBoosts":999', true);
  R('"hasPurchasedTimerBoost":false', '"hasPurchasedTimerBoost":true', true);

  // ── 连胜激冻 ──
  R('"num_item_streak_freeze_total":\\d+', '"num_item_streak_freeze_total":2', true);
  R('"num_item_streak_freeze":\\d+', '"num_item_streak_freeze":2', true);
  R('"has_item_streak_freeze":false', '"has_item_streak_freeze":true', true);

  // ── 宝石 ──
  R('"gems":\\d+', '"gems":99999', true);

  $done({ body });
}
