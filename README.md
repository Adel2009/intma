# ويدجت إمكانية الوصول — أمانة منطقة الرياض

الإصدار الحالي: v1.3.0

## رابط التثبيت (يُرسل للمستفيد مرة واحدة)

```html
<script src="https://cdn.jsdelivr.net/gh/USER/REPO@1/accessibility-widget.min.js" defer></script>
```

- `@1` يعني: أحدث إصدار من الفئة 1.x. أي تحديث تنشره بوسم مثل `v1.3.1` يصل للمستفيد دون تغيير الرابط.
- jsDelivr يولّد ملف `.min.js` مصغّرًا تلقائيًا من `accessibility-widget.js`، فلا حاجة لرفع نسخة مصغرة.

## فترة التشغيل

في أعلى الملف `accessibility-widget.js`:

```js
var SCHEDULE = {
  start: "2026-10-01T00:00:00+03:00",
  end: "2027-09-30T23:59:59+03:00",
};
```

- قبل البداية وبعد النهاية لا يظهر الويدجت ولا يُطبَّق أي إعداد على الصفحة.
- اترك القيمة `""` لإلغاء الحد.
- إذا كُتب التاريخ بصيغة خاطئة لا يعمل الويدجت، وتظهر رسالة في Console المتصفح.

## خطوات تعديل التواريخ

1. عدّل `SCHEDULE` في `accessibility-widget.js` على GitHub، ثم احفظ التعديل (Commit).
2. أنشئ إصدارًا جديدًا من Releases بوسم أعلى، مثل `v1.3.1`.
3. امسح ذاكرة jsDelivr المؤقتة من https://www.jsdelivr.com/tools/purge بإدخال الرابط أعلاه.

## متطلبات CSP على موقع المستفيد

- `script-src`: `cdn.jsdelivr.net` و `translate.google.com` و `translate.googleapis.com`
- `style-src` و `font-src`: `fonts.googleapis.com` و `fonts.gstatic.com` و `cdn.jsdelivr.net`

## أوضاع التباين

| الوضع | الخلفية | النص | الروابط | المستوى |
|---|---|---|---|---|
| تباين عالي | `#000000` | `#FFFFFF` (21:1) | `#FFFF00` (19.6:1) | أعلى من AAA |
| تباين داكن | `#121212` | `#E8EAED` (15.5:1) | `#8AB4F8` (8.9:1) | AAA |
| تباين فاتح | `#FFFFFF` | `#1A1A1A` (17.4:1) | `#0645AD` (8.5:1) | AAA |
