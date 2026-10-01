# ويدجت إمكانية الوصول — أمانة منطقة الرياض

الإصدار: v1.1.0

## التثبيت (يُرسل للمستفيد)

أضف السطر التالي قبل إغلاق وسم `</body>`:

```html
<script src="https://cdn.jsdelivr.net/gh/USER/REPO@v1.1.0/accessibility-widget.min.js" defer></script>
```

استبدل `USER/REPO` باسم الحساب والمستودع على GitHub.

### خيارات اختيارية

```html
<script src="..." defer
  data-position="bottom-left"
  data-color="#1B8354" data-color2="#146341" data-accent="#F2994A"
  data-lang="ar"></script>
```

## متطلبات على موقع المستفيد

إذا كان الموقع يستخدم سياسة أمان المحتوى (CSP)، يجب السماح بما يلي:

- `script-src`: `cdn.jsdelivr.net` و `translate.google.com` و `translate.googleapis.com`
- `style-src` و `font-src`: `fonts.googleapis.com` و `fonts.gstatic.com` و `cdn.jsdelivr.net`
- `frame-src`: `'self'`

## الملفات

- `accessibility-widget.min.js`: الملف المستخدم في الإنتاج
- `accessibility-widget.js`: النسخة المقروءة للتطوير
- `index.html`: صفحة لتجربة الويدجت

## إصدار تحديث

عدّل الملف، ثم أنشئ وسمًا جديدًا (مثلًا `v1.1.1`) وحدّث الرابط لدى المستفيد.
