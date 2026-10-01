/*!
 * ويدجت إمكانية الوصول — بهوية أمانة منطقة الرياض
 * الإصدار 1.3.0 (فترة تشغيل بتاريخ بداية ونهاية، أوضاع تباين قياسية وفق WCAG 2.2، دعم اللمس والجوال، حفظ الإعدادات)
 *
 * التثبيت: أضف هذا السطر قبل إغلاق </body>
 * <script src="https://cdn.jsdelivr.net/gh/USER/REPO@1/accessibility-widget.min.js" defer></script>
 *
 * خيارات اختيارية على وسم السكريبت:
 * data-position="bottom-right" | "bottom-left"  (افتراضي: bottom-left)
 * data-color="#1B8354"   لون الهوية الأساسي
 * data-color2="#146341"  لون داكن مساند
 * data-accent="#F2994A"  لون تمييز التركيز
 * data-lang="ar"         لغة الصفحة الأصلية
 */
!(function () {
  "use strict";

  /* ================== فترة التشغيل (عدّل هنا فقط) ==================
   * الصيغة: "YYYY-MM-DDTHH:MM:SS+03:00"  (‎+03:00 = توقيت الرياض)
   * اترك القيمة فارغة "" لإلغاء الحد (بدون تاريخ بداية أو بدون تاريخ نهاية).
   * قبل تاريخ البداية وبعد تاريخ النهاية لا يظهر الويدجت ولا يُطبَّق أي إعداد على الصفحة.
   * ================================================================= */
  var SCHEDULE = {
    start: "2026-10-01T00:00:00+03:00",
    end: "2026-10-15T23:59:59+03:00",
  };

  function inSchedule() {
    var now = Date.now(), st = SCHEDULE.start ? Date.parse(SCHEDULE.start) : -Infinity,
      en = SCHEDULE.end ? Date.parse(SCHEDULE.end) : Infinity;
    if (isNaN(st) || isNaN(en)) {
      console.error("[a11y-widget] صيغة التاريخ في SCHEDULE غير صحيحة؛ لن يعمل الويدجت.");
      return !1;
    }
    if (now < st) { console.info("[a11y-widget] لم يبدأ التشغيل بعد: " + SCHEDULE.start); return !1; }
    if (now > en) { console.info("[a11y-widget] انتهت فترة التشغيل: " + SCHEDULE.end); return !1; }
    return !0;
  }
  if (!inSchedule()) return;

  if (window.__a11yWidgetLoaded) return; // منع التحميل المزدوج
  window.__a11yWidgetLoaded = true;

  var e = document.currentScript,
    t = {
      position: (e && e.getAttribute("data-position")) || "bottom-left",
      color: (e && e.getAttribute("data-color")) || "#1B8354",
      color2: (e && e.getAttribute("data-color2")) || "#146341",
      accent: (e && e.getAttribute("data-accent")) || "#F2994A",
      originalLang: (e && e.getAttribute("data-lang")) || "ar",
    },
    STORE_KEY = "a11yWidgetState_v1",
    a = [
      ["en", "الإنجليزية"], ["fr", "الفرنسية"], ["es", "الإسبانية"], ["de", "الألمانية"],
      ["it", "الإيطالية"], ["pt", "البرتغالية"], ["ru", "الروسية"], ["zh-CN", "الصينية (مبسطة)"],
      ["zh-TW", "الصينية (تقليدية)"], ["ja", "اليابانية"], ["ko", "الكورية"], ["tr", "التركية"],
      ["fa", "الفارسية"], ["ur", "الأردية"], ["he", "العبرية"], ["hi", "الهندية"],
      ["bn", "البنغالية"], ["id", "الإندونيسية"], ["ms", "الماليزية"], ["th", "التايلاندية"],
      ["vi", "الفيتنامية"], ["nl", "الهولندية"], ["sv", "السويدية"], ["no", "النرويجية"],
      ["da", "الدنماركية"], ["fi", "الفنلندية"], ["pl", "البولندية"], ["cs", "التشيكية"],
      ["sk", "السلوفاكية"], ["ro", "الرومانية"], ["hu", "المجرية"], ["el", "اليونانية"],
      ["bg", "البلغارية"], ["uk", "الأوكرانية"], ["sr", "الصربية"], ["hr", "الكرواتية"],
      ["sl", "السلوفينية"], ["lt", "الليتوانية"], ["lv", "اللاتفية"], ["et", "الإستونية"],
      ["sq", "الألبانية"], ["az", "الأذربيجانية"], ["hy", "الأرمينية"], ["ka", "الجورجية"],
      ["kk", "الكازاخية"], ["uz", "الأوزبكية"], ["tg", "الطاجيكية"], ["ps", "البشتوية"],
      ["ku", "الكردية"], ["am", "الأمهرية"], ["so", "الصومالية"], ["sw", "السواحيلية"],
      ["zu", "الزولو"], ["xh", "الخوسا"], ["af", "الأفريكانية"], ["ha", "الهاوسا"],
      ["yo", "اليوروبا"], ["ig", "الإيغبو"], ["sn", "الشونا"], ["mg", "الملغاشية"],
      ["ml", "المالايالامية"], ["ta", "التاميلية"], ["te", "التيلوغوية"], ["kn", "الكانادية"],
      ["gu", "الغوجاراتية"], ["mr", "الماراثية"], ["pa", "البنجابية"], ["si", "السنهالية"],
      ["ne", "النيبالية"], ["my", "البورمية"], ["km", "الخميرية"], ["lo", "اللاوية"],
      ["mn", "المنغولية"], ["tl", "الفلبينية"], ["jv", "الجاوية"], ["su", "السوندية"],
      ["gl", "الغاليسية"], ["ca", "الكتالونية"], ["eu", "الباسكية"], ["is", "الآيسلندية"],
      ["ga", "الأيرلندية"], ["cy", "الويلزية"], ["mt", "المالطية"], ["lb", "اللوكسمبورغية"],
      ["gd", "الغيلية الاسكتلندية"], ["co", "الكورسيكية"], ["la", "اللاتينية"], ["eo", "الإسبرانتو"],
      ["ht", "الكريولية الهايتية"], ["yi", "اليديشية"], ["sd", "السندية"], ["ceb", "السيبوانية"],
      ["hmn", "الهمونغية"], ["haw", "الهاوايية"], ["mi", "الماورية"], ["sm", "الساموانية"],
      ["st", "السيسوتو"], ["tt", "التتارية"], ["tk", "التركمانية"], ["ug", "الأويغورية"],
      ["ar", "العربية (الأصلية)"],
    ],
    i = [
      ["ar-SA", "العربية"], ["en-US", "الإنجليزية"], ["fr-FR", "الفرنسية"], ["es-ES", "الإسبانية"],
      ["de-DE", "الألمانية"], ["it-IT", "الإيطالية"], ["pt-PT", "البرتغالية"], ["ru-RU", "الروسية"],
      ["zh-CN", "الصينية"], ["ja-JP", "اليابانية"], ["ko-KR", "الكورية"], ["tr-TR", "التركية"],
      ["fa-IR", "الفارسية"], ["ur-PK", "الأردية"], ["he-IL", "العبرية"], ["hi-IN", "الهندية"],
      ["id-ID", "الإندونيسية"], ["vi-VN", "الفيتنامية"], ["th-TH", "التايلاندية"], ["nl-NL", "الهولندية"],
      ["sv-SE", "السويدية"], ["pl-PL", "البولندية"], ["uk-UA", "الأوكرانية"], ["el-GR", "اليونانية"],
      ["ro-RO", "الرومانية"], ["cs-CZ", "التشيكية"], ["hu-HU", "المجرية"], ["da-DK", "الدنماركية"],
      ["fi-FI", "الفنلندية"], ["nb-NO", "النرويجية"], ["sk-SK", "السلوفاكية"], ["bg-BG", "البلغارية"],
      ["hr-HR", "الكرواتية"], ["ms-MY", "الماليزية"], ["bn-BD", "البنغالية"], ["ta-IN", "التاميلية"],
      ["te-IN", "التيلوغوية"], ["ml-IN", "المالايالامية"], ["mr-IN", "الماراثية"], ["pa-IN", "البنجابية"],
      ["sw-KE", "السواحيلية"], ["am-ET", "الأمهرية"],
    ],
    o = {
      ar: {
        headerTitle: "قائمة إمكانية الوصول",
        headerSubtitle: "خصّص طريقة عرض الموقع",
        openMenu: "فتح قائمة إمكانية الوصول",
        closeMenu: "إغلاق القائمة",
        resetShort: "إعادة الضبط",
        fontInc: "تكبير الخط",
        fontDec: "تصغير الخط",
        tabA11y: "إمكانية الوصول",
        tabTranslate: "الترجمة",
        langDropdown: "العربية (Arabic)",
        secProfiles: "ملفات تعريف إمكانية الوصول",
        secContent: "تعديلات المحتوى",
        secVisual: "المساعدات البصرية والتنقل",
        secColors: "تعديلات الألوان",
        secExtra: "أدوات إضافية",
        pBlindT: "ملف المكفوفين",
        pBlindD: "يُفعّل قارئ الشاشة للتنقل السمعي",
        pSeizureT: "ملف آمن للنوبات",
        pSeizureD: "يوقف الرسوم المتحركة ويقلل تشبع الألوان",
        pADHDT: "ملف مناسب لاضطراب ADHD",
        pADHDD: "يقلل المشتتات لتركيز أفضل",
        pLowVisionT: "ملف ضعاف البصر",
        pLowVisionD: "يحسّن التباين وقابلية القراءة لضعاف البصر",
        pMotorT: "ملف الإعاقة الحركية",
        pMotorD: "يحسّن الموقع للتنقل بلوحة المفاتيح فقط",
        pCognitiveT: "ملف المعرفة والتعلم",
        pCognitiveD: "أدوات مفيدة للقراءة والفهم",
        fontSize: "تعديل حجم الخط",
        letterSpacing: "تباعد الحروف",
        lineHeight: "ارتفاع السطر",
        bold: "سماكة الخط",
        highlightHeadings: "تسليط الضوء على العنوان",
        highlightLinks: "تسليط الضوء على الروابط",
        dyslexia: "خط القراءة لمن يعانون من عسر القراءة",
        screenReader: "قارئ الشاشة",
        pdfReader: "قارئ PDF",
        superFocus: "تركيز فائق",
        pageStructure: "هيكل الصفحة",
        bigCursor: "حجم المؤشر",
        readingGuide: "دليل القراءة",
        magnifierTile: "عدسة مكبّرة",
        cursorOff: "عادي",
        cursorMedium: "متوسط",
        cursorLarge: "كبير",
        cursorXLarge: "كبير جدًا",
        ttsLangLabel: "لغة القراءة الصوتية",
        saturateHigh: "تشبع عالي",
        saturateLow: "تشبع منخفض",
        grayscale: "أحادي اللون",
        highContrast: "تباين عالي",
        lightMode: "تباين فاتح",
        darkMode: "تباين داكن",
        imageTooltips: "تلميحات الصور",
        hideImages: "إخفاء الصور",
        stopAnim: "إيقاف الرسوم المتحركة",
        resetBtn: "إعادة ضبط الإعدادات",
        translateTitle: "ترجمة الصفحة",
        translateNote: "تُترجم الصفحة كاملة عبر خدمة Google Translate المجانية.",
        translateSearch: "ابحث عن لغة...",
        structureTitle: "هيكل الصفحة",
        structureEmpty: "لا توجد عناوين في هذه الصفحة",
        structureClose: "إغلاق",
        openingFile: "جاري فتح ملف ",
      },
      en: {
        headerTitle: "Accessibility Menu",
        headerSubtitle: "Customize how you view this site",
        openMenu: "Open accessibility menu",
        closeMenu: "Close menu",
        resetShort: "Reset",
        fontInc: "Increase font size",
        fontDec: "Decrease font size",
        tabA11y: "Accessibility",
        tabTranslate: "Translate",
        langDropdown: "English",
        secProfiles: "Accessibility Profiles",
        secContent: "Content Adjustments",
        secVisual: "Visual & Navigation Aids",
        secColors: "Color Adjustments",
        secExtra: "Extra Tools",
        pBlindT: "Blind Profile",
        pBlindD: "Enables the screen reader for audio navigation",
        pSeizureT: "Seizure Safe Profile",
        pSeizureD: "Stops animations and lowers color saturation",
        pADHDT: "ADHD Friendly Profile",
        pADHDD: "Reduces distractions for better focus",
        pLowVisionT: "Low Vision Profile",
        pLowVisionD: "Improves contrast and readability",
        pMotorT: "Motor Impaired Profile",
        pMotorD: "Optimizes the site for keyboard-only navigation",
        pCognitiveT: "Cognitive & Learning Profile",
        pCognitiveD: "Helpful tools for reading and comprehension",
        fontSize: "Font Size",
        letterSpacing: "Letter Spacing",
        lineHeight: "Line Height",
        bold: "Font Weight",
        highlightHeadings: "Highlight Titles",
        highlightLinks: "Highlight Links",
        dyslexia: "Dyslexia Friendly Font",
        screenReader: "Screen Reader",
        pdfReader: "PDF Reader",
        superFocus: "Super Focus",
        pageStructure: "Page Structure",
        bigCursor: "Cursor Size",
        readingGuide: "Reading Guide",
        magnifierTile: "Magnifier Lens",
        cursorOff: "Normal",
        cursorMedium: "Medium",
        cursorLarge: "Large",
        cursorXLarge: "Extra Large",
        ttsLangLabel: "Reading Voice Language",
        saturateHigh: "High Saturation",
        saturateLow: "Low Saturation",
        grayscale: "Monochrome",
        highContrast: "High Contrast",
        lightMode: "Light Contrast",
        darkMode: "Dark Contrast",
        imageTooltips: "Image Tooltips",
        hideImages: "Hide Images",
        stopAnim: "Stop Animations",
        resetBtn: "Reset Settings",
        translateTitle: "Translate Page",
        translateNote: "The full page is translated via the free Google Translate service.",
        translateSearch: "Search a language...",
        structureTitle: "Page Structure",
        structureEmpty: "No headings found on this page",
        structureClose: "Close",
        openingFile: "Opening file ",
      },
    };

  function n(e, t) {
    return (
      '<svg aria-hidden="true" focusable="false" viewBox="' + (t || "0 0 24 24") +
      '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
      e + "</svg>"
    );
  }
  var r = {
    person: n('<circle cx="12" cy="7" r="3.2"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/>'),
    reset: n('<path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5"/>'),
    close: n('<path d="M6 6l12 12M18 6 6 18"/>'),
    chevron: n('<path d="M6 9l6 6 6-6"/>'),
    info: n('<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>'),
    eyeSlash: n('<path d="M3 3l18 18"/><path d="M10.6 5.1A9.6 9.6 0 0 1 12 5c5 0 9 4 10 7-.6 1.6-2 3.5-3.8 5M6.3 6.3C4.4 7.7 3 9.6 2 12c1 3 5 7 10 7 1.1 0 2.2-.2 3.2-.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
    boltSlash: n('<path d="M13 2 4 14h6l-1 8 9-12h-6z"/><path d="M3 3l18 18"/>'),
    eye: n('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
    lens: n('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-4.8-4.8"/><path d="M10.5 7.5v6M7.5 10.5h6"/>'),
    target: n('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'),
    book: n('<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5V4.5"/>'),
    font: n('<path d="M5 19 10 5h1l5 14M6.8 14h6.4"/>'),
    line: n('<path d="M4 6h16M4 12h16M4 18h10"/>'),
    letter: n('<path d="M3 19V5M8 19V9a3 3 0 0 1 6 0v10M8 14h6M17 9v10M21 9h-4"/>'),
    bold: n('<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/>'),
    heading: n('<path d="M5 5v14M15 5v14M5 12h10M18 8v10"/>'),
    link: n('<path d="M9 15 15 9M8 13l-2 2a3 3 0 1 0 4 4l2-2M16 11l2-2a3 3 0 1 0-4-4l-2 2"/>'),
    dyslexia: n('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h6"/>'),
    speaker: n('<path d="M3 9v6h4l5 5V4L7 9z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/>'),
    pdf: n('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13v6M8 16h1.6a1.6 1.6 0 0 0 0-3H8"/><path d="M13 19v-6h1.6a1.6 1.6 0 0 1 0 3H13"/><path d="M17.5 19v-6H19M17.5 16H19"/>'),
    crosshair: n('<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>'),
    layers: n('<path d="M12 2 2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'),
    cursor: n('<path d="M6 3l14 8-6 1.5L12 19z"/>'),
    guide: n('<path d="M3 12h18"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>'),
    drop: n('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
    grayscale: n('<circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/>'),
    contrast: n('<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>'),
    sun: n('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: n('<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>'),
    chat: n('<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-.99L3 21l1.99-5.5A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z"/>'),
    image: n('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none"/><path d="M21 16l-5.5-5.5L9 17"/>'),
    pause: n('<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>'),
    globe: n('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>'),
    search: n('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
  };

  function s(e, t, a, i) {
    return (
      '<div class="a11y-profile-card" data-profile="' + e +
      '"><div class="a11y-profile-top"><button type="button" class="a11y-toggle-switch" data-profile-toggle="' + e +
      '" data-i18n-label="' + a + '" aria-pressed="false"></button><span class="a11y-profile-icon">' + r[t] +
      '</span></div><p class="a11y-profile-title" data-i18n="' + a + '"></p><p class="a11y-profile-desc" data-i18n="' + i +
      '"></p></div>'
    );
  }
  function l(e, t, a) {
    return (
      '<button type="button" class="a11y-tile" data-toggle="' + e + '" aria-pressed="false"><span class="a11y-tile-ico">' + r[t] +
      '</span><span class="a11y-tile-label" data-i18n="' + a + '"></span></button>'
    );
  }

  /* ---------- اتجاه الصفحة وموضع الزر ---------- */
  var htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase(),
    htmlDir = (document.documentElement.getAttribute("dir") || (document.body && document.body.getAttribute("dir")) || "").toLowerCase(),
    isRTLPage = /^(ar|fa|ur|he)/.test(htmlLang) || htmlDir === "rtl",
    side = isRTLPage
      ? "bottom-right" === t.position ? "left" : "right"
      : "bottom-right" === t.position ? "right" : "left";

  var d = [
      "*{box-sizing:border-box}",
      "html,body{margin:0;padding:0;background:transparent;font-family:'Tajawal','Segoe UI',system-ui,-apple-system,sans-serif;direction:rtl;-webkit-text-size-adjust:100%;text-size-adjust:100%}",
      ".a11y-wrap{position:absolute;inset:0;}",
      ".a11y-btn{position:absolute;bottom:19px;width:56px;height:56px;border-radius:50%;background:var(--a11y-c);color:#fff;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(20,99,65,.35);transition:transform .15s ease;-webkit-tap-highlight-color:transparent;touch-action:manipulation}",
      ".side-left .a11y-btn{left:14px}.side-right .a11y-btn{right:14px}",
      ".a11y-btn svg{width:26px;height:26px}",
      "@media (hover:hover){.a11y-btn:hover{transform:scale(1.06)}}",
      ".a11y-btn:focus-visible{outline:3px solid var(--a11y-a);outline-offset:2px}",
      ".a11y-panel{position:absolute;top:8px;bottom:84px;left:8px;right:8px;background:#fff;border-radius:16px;box-shadow:0 18px 44px rgba(10,40,25,.28);display:none;flex-direction:column;overflow:hidden;border:1px solid #E5EBE7}",
      ".a11y-panel.open{display:flex}",
      ".a11y-head{background:var(--a11y-c);color:#fff;padding:14px 16px;flex:none}",
      ".a11y-head-top{display:flex;align-items:center;justify-content:space-between;gap:8px}",
      ".a11y-head strong{font-size:14.5px;font-weight:800;display:block}",
      ".a11y-head small{font-size:11px;opacity:.9}",
      ".a11y-head-actions{display:flex;gap:6px;flex:none}",
      ".a11y-icon-btn{background:rgba(255,255,255,.16);border:none;color:#fff;width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;touch-action:manipulation}",
      ".a11y-icon-btn svg{width:16px;height:16px}",
      ".a11y-icon-btn:hover{background:rgba(255,255,255,.3)}",
      ".a11y-tabs{display:flex;background:#EFF4F1;border-bottom:1px solid #E1E9E4;flex:none}",
      ".a11y-tab{flex:1;padding:11px 4px;font-size:12.5px;font-weight:800;border:none;background:transparent;color:#5E6B64;cursor:pointer;border-bottom:2.5px solid transparent;font-family:inherit}",
      ".a11y-tab.active{color:var(--a11y-c);border-bottom-color:var(--a11y-c);background:#fff}",
      ".a11y-body{padding:12px 14px;overflow-y:auto;flex:1;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}",
      ".a11y-view{display:none}",
      ".a11y-view.active{display:block}",
      ".a11y-dropdown{position:relative;margin-bottom:12px}",
      ".a11y-dropdown-btn{width:100%;display:flex;align-items:center;justify-content:space-between;background:#fff;border:1.4px solid #E1E9E4;border-radius:11px;padding:10px 12px;font-size:12.5px;font-weight:700;color:#25302B;cursor:pointer;font-family:inherit}",
      ".a11y-dropdown-btn svg{width:14px;height:14px;color:#7C8A82}",
      ".a11y-dropdown-list{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1.4px solid #E1E9E4;border-radius:11px;box-shadow:0 10px 24px rgba(0,0,0,.12);z-index:5;display:none;overflow:hidden}",
      ".a11y-dropdown-list.open{display:block}",
      ".a11y-dropdown-item{display:block;width:100%;text-align:start;border:none;background:transparent;padding:10px 12px;font-size:12.5px;font-weight:600;cursor:pointer;color:#25302B;font-family:inherit}",
      ".a11y-dropdown-item:hover{background:#EFF4F1}",
      ".a11y-sec{background:#EFF4F1;border-radius:14px;padding:12px;margin-bottom:12px}",
      ".a11y-sec-title{display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:800;color:#4B5A52;margin:0 2px 10px}",
      ".a11y-sec-title svg{width:15px;height:15px;color:#8A9690}",
      ".a11y-profiles-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".a11y-profile-card{background:#fff;border:1.4px solid #E5EBE7;border-radius:13px;padding:11px;min-width:0}",
      ".a11y-profile-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}",
      ".a11y-profile-icon{width:32px;height:32px;border-radius:50%;background:#E7F5EC;display:flex;align-items:center;justify-content:center;color:var(--a11y-c)}",
      ".a11y-profile-icon svg{width:16px;height:16px}",
      ".a11y-profile-title{font-size:11.5px;font-weight:800;color:#20281F;margin:0 0 3px}",
      ".a11y-profile-desc{font-size:10.5px;color:#6E7A73;line-height:1.4;margin:0}",
      ".a11y-toggle-switch{width:40px;height:24px;border-radius:20px;background:#C9CED6;border:none;position:relative;cursor:pointer;flex:none;padding:0;touch-action:manipulation}",
      ".a11y-toggle-switch::after{content:'';position:absolute;top:2px;inset-inline-end:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s ease;box-shadow:0 1px 3px rgba(0,0,0,.25)}",
      ".a11y-toggle-switch.on{background:var(--a11y-c)}",
      "[dir=rtl] .a11y-toggle-switch.on::after{transform:translateX(-16px)}",
      "[dir=ltr] .a11y-toggle-switch.on::after{transform:translateX(16px)}",
      ".a11y-fontsize-label{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:#25302B;margin:0 0 10px}",
      ".a11y-fontsize-label svg{width:15px;height:15px;color:var(--a11y-c)}",
      ".a11y-fontsize-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}",
      ".a11y-fontsize-row button{width:42px;height:42px;border-radius:50%;border:none;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08);font-size:18px;font-weight:800;color:#25302B;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:inherit;touch-action:manipulation}",
      ".a11y-fontsize-row span{font-size:16px;font-weight:800;color:#25302B}",
      ".a11y-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}",
      ".a11y-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:12px 4px;border-radius:13px;border:1.4px solid #E5EBE7;background:#fff;cursor:pointer;text-align:center;min-height:78px;position:relative;font-family:inherit;touch-action:manipulation;min-width:0}",
      "@media (hover:hover){.a11y-tile:hover{border-color:var(--a11y-c)}}",
      ".a11y-tile-ico{color:#3C4A42;display:flex}",
      ".a11y-tile-ico svg{width:20px;height:20px}",
      ".a11y-tile-label{font-size:10.5px;font-weight:700;color:#3C4A42;line-height:1.25;overflow-wrap:anywhere}",
      ".a11y-tile-state{font-size:9px;font-weight:800;color:#6E7A73;margin-top:-3px}",
      ".a11y-tile.active{background:var(--a11y-c);border-color:var(--a11y-c)}",
      ".a11y-tile.active .a11y-tile-ico,.a11y-tile.active .a11y-tile-label{color:#fff}",
      ".a11y-tile.active .a11y-tile-state{color:rgba(255,255,255,.9)}",
      ".a11y-tile:focus-visible,.a11y-toggle-switch:focus-visible,.a11y-icon-btn:focus-visible,.a11y-tab:focus-visible,.a11y-dropdown-btn:focus-visible,.a11y-dropdown-item:focus-visible,.a11y-lang-btn:focus-visible,.a11y-fontsize-row button:focus-visible,.a11y-reset-all:focus-visible,.a11y-tts-row select:focus-visible,.a11y-lang-search input:focus-visible{outline:2.5px solid var(--a11y-a);outline-offset:2px}",
      ".a11y-tts-row{margin-top:8px;background:#fff;border:1.4px solid #E5EBE7;border-radius:12px;padding:9px 11px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}",
      ".a11y-tts-row label{font-size:11px;font-weight:700;color:#3C4A42;white-space:nowrap}",
      ".a11y-tts-row select{flex:1;min-width:120px;border:1px solid #E1E9E4;border-radius:8px;padding:7px 8px;font-size:16px;font-family:inherit;color:#25302B;background:#FAFCFB}",
      "@media (min-width:360px){.a11y-tts-row select{font-size:12px}}",
      ".a11y-reset-all{width:100%;display:flex;align-items:center;justify-content:center;gap:7px;padding:13px;border-radius:12px;border:none;background:var(--a11y-c);color:#fff;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit}",
      ".a11y-reset-all svg{width:15px;height:15px}",
      ".a11y-reset-all:hover{background:var(--a11y-c2)}",
      ".a11y-translate-head{display:flex;align-items:center;gap:8px;margin-bottom:4px}",
      ".a11y-translate-head svg{width:18px;height:18px;color:var(--a11y-c)}",
      ".a11y-translate-head strong{font-size:13px;color:#20281F}",
      ".a11y-translate-note{font-size:10.5px;color:#6E7A73;margin:0 0 10px;line-height:1.5}",
      ".a11y-lang-search{display:flex;align-items:center;gap:6px;background:#EFF4F1;border-radius:10px;padding:8px 10px;margin-bottom:8px}",
      /* 16px يمنع تكبير iOS التلقائي عند الكتابة */
      ".a11y-lang-search input{border:none;background:transparent;outline:none;font-size:16px;width:100%;font-family:inherit}",
      ".a11y-lang-search svg{width:15px;height:15px;color:#8A9690;flex:none}",
      ".a11y-lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}",
      ".a11y-lang-btn{padding:9px 6px;border-radius:9px;border:1.4px solid #E5EBE7;background:#fff;font-size:11.5px;cursor:pointer;color:#3C4A42;text-align:center;font-weight:600;font-family:inherit;touch-action:manipulation}",
      ".a11y-lang-btn:hover{border-color:var(--a11y-c)}",
      ".a11y-lang-btn.active{background:var(--a11y-c);border-color:var(--a11y-c);color:#fff;font-weight:800}",
      ".a11y-hidden{display:none !important}",
      "::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#D7E2DB;border-radius:6px}",
      "@media (max-width:330px){.a11y-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}.a11y-profiles-grid{grid-template-columns:1fr !important;}.a11y-panel{border-radius:12px;left:4px;right:4px}}",
      "@media (max-height:520px){.a11y-panel{top:4px;}.a11y-head{padding:10px 14px}.a11y-tile{min-height:64px;padding:8px 4px}}",
      "@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}",
    ].join(""),
    c =
      '<div class="a11y-wrap side-' + side + '"><button type="button" class="a11y-btn" id="a11yToggle" aria-haspopup="dialog" aria-controls="a11yPanel" aria-expanded="false" data-i18n-label="openMenu" title="' +
      o.ar.headerTitle + '">' + r.person +
      '</button><div class="a11y-panel" id="a11yPanel" role="dialog" aria-modal="false" aria-labelledby="a11yTitle"><div class="a11y-head"><div class="a11y-head-top"><div><strong id="a11yTitle" data-i18n="headerTitle"></strong><small data-i18n="headerSubtitle"></small></div><div class="a11y-head-actions"><button type="button" class="a11y-icon-btn" id="a11yHeadReset" data-i18n-label="resetShort">' +
      r.reset + '</button><button type="button" class="a11y-icon-btn" id="a11yClose" data-i18n-label="closeMenu">' + r.close +
      '</button></div></div></div><div class="a11y-tabs" role="tablist"><button type="button" role="tab" aria-selected="true" class="a11y-tab active" data-view="a11y" data-i18n="tabA11y"></button><button type="button" role="tab" aria-selected="false" class="a11y-tab" data-view="translate" data-i18n="tabTranslate"></button></div><div id="a11yLiveRegion" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;"></div><div class="a11y-body"><div class="a11y-view active" data-view="a11y"><div class="a11y-dropdown"><button type="button" class="a11y-dropdown-btn" id="a11yLangDropBtn" aria-haspopup="listbox" aria-expanded="false"><span id="a11yLangDropLabel" data-i18n="langDropdown"></span>' +
      r.chevron +
      '</button><div class="a11y-dropdown-list" id="a11yLangDropList"><button type="button" class="a11y-dropdown-item" data-ui-lang="ar" lang="ar">العربية (Arabic)</button><button type="button" class="a11y-dropdown-item" data-ui-lang="en" lang="en">English</button></div></div><div class="a11y-sec"><p class="a11y-sec-title"><span data-i18n="secProfiles"></span>' +
      r.info + '</p><div class="a11y-profiles-grid">' +
      s("profileBlind", "eyeSlash", "pBlindT", "pBlindD") +
      s("profileSeizure", "boltSlash", "pSeizureT", "pSeizureD") +
      s("profileADHD", "info", "pADHDT", "pADHDD") +
      s("profileLowVision", "lens", "pLowVisionT", "pLowVisionD") +
      s("profileMotor", "target", "pMotorT", "pMotorD") +
      s("profileCognitive", "book", "pCognitiveT", "pCognitiveD") +
      '</div></div><div class="a11y-sec"><p class="a11y-sec-title"><span data-i18n="secContent"></span>' + r.info +
      '</p><p class="a11y-fontsize-label">' + r.font +
      '<span data-i18n="fontSize"></span></p><div class="a11y-fontsize-row"><button type="button" data-act="fontDown" data-i18n-label="fontDec">−</button><span id="fontVal" aria-live="polite">100%</span><button type="button" data-act="fontUp" data-i18n-label="fontInc">+</button></div><div class="a11y-grid">' +
      l("letterSpacing", "letter", "letterSpacing") +
      l("lineHeight", "line", "lineHeight") +
      l("fontWeightBold", "bold", "bold") +
      l("highlightHeadings", "heading", "highlightHeadings") +
      l("highlightLinks", "link", "highlightLinks") +
      l("dyslexia", "dyslexia", "dyslexia") +
      '</div></div><div class="a11y-sec"><p class="a11y-sec-title"><span data-i18n="secVisual"></span>' + r.info +
      '</p><div class="a11y-grid">' +
      l("screenReader", "speaker", "screenReader") +
      l("pdfReader", "pdf", "pdfReader") +
      l("superFocus", "crosshair", "superFocus") +
      l("pageStructure", "layers", "pageStructure") +
      '<button type="button" class="a11y-tile" data-cycle="cursorSize" aria-pressed="false"><span class="a11y-tile-ico">' + r.cursor +
      '</span><span class="a11y-tile-label" data-i18n="bigCursor"></span><span class="a11y-tile-state" data-cycle-state="cursorSize"></span></button>' +
      l("readingGuide", "guide", "readingGuide") +
      l("magnifier", "lens", "magnifierTile") +
      '</div><div class="a11y-tts-row"><label for="a11yTtsLang" data-i18n="ttsLangLabel"></label><select id="a11yTtsLang">' +
      (function () {
        for (var e = "", t = 0; t < i.length; t++)
          e += '<option value="' + i[t][0] + '"' + ("ar-SA" === i[t][0] ? " selected" : "") + ">" + i[t][1] + "</option>";
        return e;
      })() +
      '</select></div></div><div class="a11y-sec"><p class="a11y-sec-title"><span data-i18n="secColors"></span>' + r.info +
      '</p><div class="a11y-grid">' +
      l("saturateHigh", "drop", "saturateHigh") +
      l("saturateLow", "drop", "saturateLow") +
      l("grayscale", "grayscale", "grayscale") +
      l("highContrast", "contrast", "highContrast") +
      l("lightMode", "sun", "lightMode") +
      l("darkMode", "moon", "darkMode") +
      '</div></div><div class="a11y-sec"><p class="a11y-sec-title"><span data-i18n="secExtra"></span>' + r.info +
      '</p><div class="a11y-grid">' +
      l("imageTooltips", "chat", "imageTooltips") +
      l("hideImages", "image", "hideImages") +
      l("stopAnim", "pause", "stopAnim") +
      '</div></div><button type="button" class="a11y-reset-all" id="a11yResetAll">' + r.reset +
      '<span data-i18n="resetBtn"></span></button></div><div class="a11y-view" data-view="translate"><div class="a11y-translate-head">' + r.globe +
      '<strong data-i18n="translateTitle"></strong></div><p class="a11y-translate-note" data-i18n="translateNote"></p><div class="a11y-lang-search">' + r.search +
      '<input type="search" id="a11yLangSearch" data-i18n-ph="translateSearch" data-i18n-label="translateSearch" /></div><div class="a11y-lang-grid" id="a11yLangGrid">' +
      (function () {
        for (var e = "", t = 0; t < a.length; t++)
          e += '<button type="button" class="a11y-lang-btn" data-lang="' + a[t][0] + '">' + a[t][1] + "</button>";
        return e;
      })() +
      "</div></div></div></div></div>";

  var p = document.documentElement,
    g = "ar",
    DEFAULTS = {
      fontStep: 0, letterSpacing: !1, lineHeight: !1, fontWeightBold: !1, highlightHeadings: !1,
      highlightLinks: !1, dyslexia: !1, screenReader: !1, screenReaderLang: "ar-SA", pdfReader: !1,
      superFocus: !1, pageStructure: !1, cursorSize: 0, readingGuide: !1, magnifier: !1,
      saturateHigh: !1, saturateLow: !1, grayscale: !1, highContrast: !1, lightMode: !1, darkMode: !1,
      imageTooltips: !1, hideImages: !1, stopAnim: !1, profileBlind: !1, profileSeizure: !1,
      profileADHD: !1, profileLowVision: !1, profileMotor: !1, profileCognitive: !1,
    },
    u = clone(DEFAULTS),
    // خيارات لا تجتمع معًا
    h = [
      ["saturateHigh", "saturateLow"],
      ["highContrast", "lightMode", "darkMode"],
    ],
    y = {
      profileBlind: { screenReader: !0 },
      profileSeizure: { stopAnim: !0, saturateLow: !0 },
      profileADHD: { superFocus: !0, stopAnim: !0 },
      profileLowVision: { highContrast: !0, fontStep: 2, magnifier: !0 },
      profileMotor: { cursorSize: 2, readingGuide: !0 },
      profileCognitive: { dyslexia: !0, lineHeight: !0, readingGuide: !0 },
    },
    f = null,
    v = [0, 42, 64, 92],
    isTouch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0,
    frameEl = null;

  function clone(o) { var r = {}; for (var k in o) r[k] = o[k]; return r; }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ s: u, g: g })); } catch (_) {}
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (d && d.s) for (var k in DEFAULTS) if (k in d.s) u[k] = d.s[k];
      if (d && (d.g === "ar" || d.g === "en")) g = d.g;
    } catch (_) {}
  }
  function exclusive(key) {
    for (var t = 0; t < h.length; t++) {
      var grp = h[t];
      if (u[key] && grp.indexOf(key) !== -1)
        for (var i = 0; i < grp.length; i++) grp[i] !== key && (u[grp[i]] = !1);
    }
  }
  function speechOff() { "speechSynthesis" in window && window.speechSynthesis.cancel(); }


  /* ---------- أوضاع التباين (وفق WCAG 2.2 ومفهوم Windows High Contrast / forced-colors) ----------
   * لا نستخدم عكس الألوان (invert)؛ كل وضع يعيد تلوين النصوص والخلفيات بلوحة ثابتة مُتحقَّق منها:
   *  - تباين عالي (hc):  أسود/أبيض بأقصى تباين 21:1، الروابط أصفر 19.6:1 — مثل وضع Windows "High Contrast Black"
   *  - تباين داكن (dark): خلفية رمادية داكنة #121212 ونص فاتح 15.5:1، روابط 8.9:1 — مستوى AAA بإرهاق أقل للعين
   *  - تباين فاتح (light): خلفية بيضاء ونص داكن 17.4:1، روابط 8.5:1 — مستوى AAA
   * جميع ألوان النصوص ≥ 7:1 (WCAG 1.4.6 AAA)، وحدود العناصر ومؤشر التركيز ≥ 3:1 (WCAG 1.4.11 و 2.4.13).
   * الصور والفيديو تبقى بألوانها الأصلية. */
  var THEMES = {
    hc: { key: "highContrast", bg: "#000000", surface: "#000000", text: "#FFFFFF", heading: "#FFFFFF",
      link: "#FFFF00", visited: "#FFB3FF", focus: "#FFFF00", border: "#FFFFFF", placeholder: "#D0D0D0",
      disabled: "#3FF23F", selBg: "#1AEBFF", selText: "#000000", borderW: "2px" },
    dark: { key: "darkMode", bg: "#121212", surface: "#1E1E1E", text: "#E8EAED", heading: "#FFFFFF",
      link: "#8AB4F8", visited: "#D7AEFB", focus: "#FDD663", border: "#9AA0A6", placeholder: "#B0B0B0",
      disabled: "#9AA0A6", selBg: "#8AB4F8", selText: "#000000", borderW: "1px" },
    light: { key: "lightMode", bg: "#FFFFFF", surface: "#F5F5F5", text: "#1A1A1A", heading: "#000000",
      link: "#0645AD", visited: "#5A2D91", focus: "#0B57D0", border: "#5F6368", placeholder: "#595959",
      disabled: "#5F6368", selBg: "#0B57D0", selText: "#FFFFFF", borderW: "1px" },
  };
  function currentTheme() {
    for (var k in THEMES) if (u[THEMES[k].key]) return k;
    return null;
  }
  function themeCSS() {
    var k = currentTheme();
    if (!k) return "";
    var c = THEMES[k], R = "html.a11y-theme-" + k,
      // عناصر الويدجت نفسها (دليل القراءة، العدسة، طبقة التركيز) تُستثنى حتى لا تُغطّى بلون صلب
      // :where() يجعل وزن هذا المحدد منخفضًا حتى تتغلب عليه قواعد العناوين والروابط والحقول أدناه
      ALL = R + " :where(body, body *):not(:where(img, video, picture, canvas, iframe, svg, svg *, #a11y-reading-guide, #a11y-focus, #a11y-lens))",
      CTRL = R + " button, " + R + " input, " + R + " select, " + R + " textarea, " + R + " [role=button]";
    return (
      ALL + "{background-color:" + c.bg + " !important;color:" + c.text + " !important;border-color:" + c.border +
        " !important;text-shadow:none !important;background-image:none !important;}" +
      R + " h1," + R + " h2," + R + " h3," + R + " h4," + R + " h5," + R + " h6{color:" + c.heading + " !important;}" +
      R + " a:link, " + R + " a:link *{color:" + c.link + " !important;text-decoration:underline !important;}" +
      R + " a:visited, " + R + " a:visited *{color:" + c.visited + " !important;}" +
      CTRL + "{background-color:" + c.surface + " !important;color:" + c.text + " !important;border:" + c.borderW +
        " solid " + c.border + " !important;}" +
      R + " ::placeholder{color:" + c.placeholder + " !important;opacity:1 !important;}" +
      R + " :disabled, " + R + " [aria-disabled=true]{color:" + c.disabled + " !important;border-color:" + c.disabled + " !important;}" +
      R + " *:focus-visible{outline:3px solid " + c.focus + " !important;outline-offset:2px !important;}" +
      R + " ::selection{background:" + c.selBg + " !important;color:" + c.selText + " !important;}" +
      // أيقونات SVG التي ترث لون النص تتبع لوحة الوضع تلقائيًا
      R + " svg{color:inherit;}" +
      R + "{color-scheme:" + (k === "light" ? "light" : "dark") + " !important;}"
    );
  }

  /* ---------- تطبيق الأنماط على الصفحة ---------- */
  var NOT_ICONS = ":not(i):not([class*='icon']):not([class*='fa-']):not([class^='fa']):not(.material-icons):not(.material-symbols-outlined)";
  function m() {
    var e, a = themeCSS(); // أوضاع التباين أولًا حتى تبقى ميزات مثل "تسليط الضوء على الروابط" ظاهرة فوقها
    u.dyslexia &&
      (a +=
        "@font-face{font-family:'OpenDyslexic';src:url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/woff/OpenDyslexic-Regular.woff') format('woff');font-display:swap;}" +
        "html.a11y-dyslexia body *" + NOT_ICONS + "{font-family:'OpenDyslexic','Tajawal',sans-serif !important;}");
    u.fontWeightBold && (a += "body *" + NOT_ICONS + "{font-weight:700 !important;}");
    u.letterSpacing && (a += "body *{letter-spacing:.09em !important;word-spacing:.16em !important;}");
    u.lineHeight && (a += "body *{line-height:2 !important;}");
    u.highlightLinks &&
      (a += ":root body a:any-link, :root body a:any-link *{background:#FFF176 !important;color:#111 !important;text-decoration:underline !important;}");
    u.highlightHeadings &&
      (a += "h1,h2,h3,h4,h5,h6,[role=heading]{outline:3px solid " + t.color + " !important;outline-offset:3px;background:rgba(27,131,84,.07) !important;}");
    u.hideImages &&
      (a += "img,picture,svg image,video,[role=img]{opacity:0 !important;} *{background-image:none !important;}");
    u.stopAnim &&
      (a += "*,*::before,*::after{animation-play-state:paused !important;animation-duration:0s !important;transition:none !important;scroll-behavior:auto !important;}");
    u.cursorSize > 0 &&
      (a +=
        "html, html *{cursor:url(" +
        ((e = v[u.cursorSize]),
        "data:image/svg+xml;base64," +
          btoa('<svg xmlns="http://www.w3.org/2000/svg" width="' + e + '" height="' + e + '" viewBox="0 0 24 24"><path d="M4 2l14 8-6 1.6L14 19z" fill="black" stroke="white" stroke-width="1.2"/></svg>')) +
        ") 4 4, auto !important;}");
    u.profileMotor &&
      (a += "*:focus{outline:3px solid " + t.accent + " !important;outline-offset:2px !important;}");
    // إخفاء شريط Google Translate العلوي
    a += "body{top:0 !important;} .goog-te-banner-frame,.skiptranslate>iframe{display:none !important;} .goog-tooltip, .goog-tooltip:hover{display:none !important;} .goog-text-highlight{background:none !important;box-shadow:none !important;}";

    var i = 100 + 10 * u.fontStep;
    100 !== i &&
      ((a += "html{zoom:" + i + "% !important;}"),
      (a += "#a11yWidgetFrame{zoom:" + (1e4 / i).toFixed(4) + "% !important;}"),
      (a += "#a11y-reading-guide,#a11y-lens,#a11y-structure,#a11y-focus{zoom:" + (1e4 / i).toFixed(4) + "% !important;}"));

    (f || ((f = document.createElement("style")), (f.id = "a11y-injected-styles"), document.head.appendChild(f)),
      (f.textContent = a));
    var th = currentTheme();
    for (var tk in THEMES) p.classList.toggle("a11y-theme-" + tk, th === tk);
    p.classList.toggle("a11y-dyslexia", !!u.dyslexia);

    var o = [];
    u.grayscale && o.push("grayscale(1)");
    u.saturateHigh && o.push("saturate(1.7)");
    u.saturateLow && o.push("saturate(.45)");
    p.style.filter = o.length ? o.join(" ") : "";
    save();
  }

  /* ---------- أدوات تعمل بالماوس واللمس ولوحة المفاتيح ---------- */
  function pt(ev) {
    var tt = ev.touches && ev.touches[0];
    return tt ? { x: tt.clientX, y: tt.clientY } : { x: ev.clientX, y: ev.clientY };
  }
  function isWidget(el) {
    return el && el.closest && el.closest("#a11yWidgetFrame,#a11y-structure");
  }

  var b = null;
  function x(ev) { if (b) { var q = pt(ev); b.style.top = q.y - 19 + "px"; } }

  var w = null, focusTarget = null;
  function placeFocus() {
    if (!w || !focusTarget) return;
    var a = focusTarget.getBoundingClientRect();
    w.style.left = a.left - 6 + "px";
    w.style.top = a.top - 6 + "px";
    w.style.width = a.width + 12 + "px";
    w.style.height = a.height + 12 + "px";
    w.style.opacity = "1";
  }
  function L(ev) {
    var tg = ev.target.closest && ev.target.closest("p,h1,h2,h3,h4,h5,h6,li,a,button,img,td,blockquote,figure,input,select,textarea");
    if (tg && w && !isWidget(tg)) { focusTarget = tg; placeFocus(); }
  }

  var E = null, k = null;
  function M(ev) {
    if (E && k) {
      var q = pt(ev);
      E.style.left = q.x - 95 + "px";
      E.style.top = q.y - 95 - (ev.touches ? 110 : 0) + "px"; // على اللمس نرفع العدسة فوق الإصبع
      var t2 = 50 - (q.x + window.scrollX), a2 = 50 - (q.y + window.scrollY);
      k.style.transform = "scale(1.9) translate(" + t2 + "px," + a2 + "px)";
    }
  }

  var S = null, A = null;
  function C(e) {
    if ("speechSynthesis" in window && e) {
      window.speechSynthesis.cancel();
      var t3 = new SpeechSynthesisUtterance(e);
      t3.lang = u.screenReaderLang || "ar-SA";
      // اختيار صوت مطابق للغة إن وُجد
      try {
        var vs = window.speechSynthesis.getVoices(), base = t3.lang.split("-")[0];
        for (var z = 0; z < vs.length; z++) if (vs[z].lang && vs[z].lang.toLowerCase().indexOf(base) === 0) { t3.voice = vs[z]; break; }
      } catch (_) {}
      window.speechSynthesis.speak(t3);
    }
  }
  var READ_SEL = "p,h1,h2,h3,h4,h5,h6,a,button,li,span,td,th,figcaption,label,img,input,select,textarea";
  function textOf(el) {
    if (el.tagName === "IMG") return el.alt || "";
    var lab = el.getAttribute("aria-label");
    if (lab) return lab;
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
      var lb = el.id && document.querySelector('label[for="' + el.id + '"]');
      return (lb ? lb.innerText : "") || el.placeholder || el.value || "";
    }
    return el.innerText || el.textContent || "";
  }
  function T(ev) { // مرور الماوس (سطح المكتب)
    if (ev.pointerType && ev.pointerType !== "mouse") return;
    var tg = ev.target.closest && ev.target.closest(READ_SEL);
    if (tg && !isWidget(tg)) {
      var a3 = textOf(tg).trim();
      a3 && (clearTimeout(A), (A = setTimeout(function () { C(a3.slice(0, 300)); }, 350)));
    }
  }
  function z() { clearTimeout(A); }
  function readFocus(ev) { // التنقل بلوحة المفاتيح
    var tg = ev.target;
    if (tg && tg.nodeType === 1 && !isWidget(tg)) { var s3 = textOf(tg).trim(); s3 && C(s3.slice(0, 300)); }
  }
  function readTap(ev) { // اللمس: النطق داخل حدث النقر لأن iOS يشترط تفاعل المستخدم
    if (ev.pointerType === "mouse") return;
    var tg = ev.target.closest && ev.target.closest(READ_SEL);
    if (tg && !isWidget(tg)) { var s4 = textOf(tg).trim(); s4 && C(s4.slice(0, 300)); }
  }

  function D(ev) {
    var tg = ev.target.closest && ev.target.closest("a");
    if (tg) {
      var href = tg.getAttribute("href") || "";
      if (/\.pdf(\?|#|$)/i.test(href)) {
        ev.preventDefault();
        // الفتح فورًا داخل حدث النقر حتى لا تحجبه المتصفحات كنافذة منبثقة
        var win = window.open(tg.href, "_blank", "noopener");
        if (!win) window.location.href = tg.href;
        C(o[g].openingFile + (tg.innerText || "").trim());
      }
    }
  }

  function onScrollRefresh() { placeFocus(); }

  var B = {
    readingGuide: function (on) {
      on
        ? b ||
          ((b = document.createElement("div")),
          (b.id = "a11y-reading-guide"),
          b.setAttribute("aria-hidden", "true"),
          (b.style.cssText =
            "position:fixed;left:0;right:0;height:38px;background:rgba(27,131,84,.14);border-top:2px solid " + t.color +
            ";border-bottom:2px solid " + t.color + ";pointer-events:none;z-index:2147483646;top:40%;"),
          document.body.appendChild(b),
          document.addEventListener("pointermove", x, { passive: !0 }),
          document.addEventListener("touchmove", x, { passive: !0 }),
          document.addEventListener("touchstart", x, { passive: !0 }))
        : b &&
          (document.removeEventListener("pointermove", x),
          document.removeEventListener("touchmove", x),
          document.removeEventListener("touchstart", x),
          b.remove(),
          (b = null));
    },
    superFocus: function (on) {
      on
        ? w ||
          ((w = document.createElement("div")),
          (w.id = "a11y-focus"),
          w.setAttribute("aria-hidden", "true"),
          (w.style.cssText =
            "position:fixed;pointer-events:none;z-index:2147483645;border-radius:8px;box-shadow:0 0 0 9999px rgba(0,0,0,.6);transition:left .1s ease,top .1s ease,width .1s ease,height .1s ease;opacity:0;"),
          document.body.appendChild(w),
          document.addEventListener("pointerover", L),
          document.addEventListener("focusin", L),
          window.addEventListener("scroll", onScrollRefresh, { passive: !0 }),
          window.addEventListener("resize", onScrollRefresh))
        : w &&
          (document.removeEventListener("pointerover", L),
          document.removeEventListener("focusin", L),
          window.removeEventListener("scroll", onScrollRefresh),
          window.removeEventListener("resize", onScrollRefresh),
          w.remove(),
          (w = null),
          (focusTarget = null));
    },
    pageStructure: function e2(on) {
      if (on) {
        if (S) return;
        var hs = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
        S = document.createElement("div");
        S.id = "a11y-structure";
        S.setAttribute("role", "navigation");
        S.setAttribute("aria-label", o[g].structureTitle);
        S.style.cssText =
          "position:fixed;top:16px;" + (side === "left" ? "right" : "left") +
          ":16px;width:min(280px,calc(100vw - 32px));max-height:70vh;overflow-y:auto;background:#fff;border-radius:12px;box-shadow:0 14px 34px rgba(0,0,0,.22);z-index:2147483646;font-family:'Tajawal',system-ui,sans-serif;direction:" +
          ("ar" === g ? "rtl" : "ltr") + ";padding:10px;";
        var hd = document.createElement("div");
        hd.style.cssText =
          "display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:13px;color:#20281F;margin-bottom:8px;padding:0 4px;";
        hd.textContent = o[g].structureTitle;
        var cb = document.createElement("button");
        cb.type = "button";
        cb.textContent = "✕";
        cb.setAttribute("aria-label", o[g].structureClose);
        cb.style.cssText = "border:none;background:#F1F1F1;border-radius:6px;width:30px;height:30px;cursor:pointer;flex:none;";
        cb.addEventListener("click", function () {
          u.pageStructure = !1;
          e2(!1);
          save();
          window.__a11ySyncUI && window.__a11ySyncUI();
        });
        hd.appendChild(cb);
        S.appendChild(hd);
        if (hs.length)
          for (var r2 = 0; r2 < hs.length; r2++)
            (function (h0) {
              if (isWidget(h0)) return;
              var lvl = parseInt(h0.tagName.substring(1), 10), bt = document.createElement("button");
              bt.type = "button";
              bt.textContent = (h0.innerText || "").trim().slice(0, 60) || h0.tagName;
              bt.style.cssText =
                "display:block;width:100%;text-align:start;border:none;background:transparent;padding:8px " +
                (6 + 10 * (lvl - 1)) + "px;font-size:12px;color:#3C4A42;cursor:pointer;border-radius:6px;font-family:inherit;";
              bt.addEventListener("mouseover", function () { bt.style.background = "#EFF4F1"; });
              bt.addEventListener("mouseout", function () { bt.style.background = "transparent"; });
              bt.addEventListener("click", function () {
                h0.scrollIntoView({ behavior: "smooth", block: "center" });
                if (!h0.hasAttribute("tabindex")) h0.setAttribute("tabindex", "-1");
                try { h0.focus({ preventScroll: !0 }); } catch (_) {}
              });
              S.appendChild(bt);
            })(hs[r2]);
        else {
          var em = document.createElement("p");
          em.style.cssText = "font-size:12px;color:#6E7A73;padding:4px;";
          em.textContent = o[g].structureEmpty;
          S.appendChild(em);
        }
        document.body.appendChild(S);
      } else S && (S.remove(), (S = null));
    },
    screenReader: function (on) {
      on
        ? (document.addEventListener("pointerover", T),
          document.addEventListener("pointerout", z),
          document.addEventListener("focusin", readFocus),
          document.addEventListener("click", readTap, !0))
        : (document.removeEventListener("pointerover", T),
          document.removeEventListener("pointerout", z),
          document.removeEventListener("focusin", readFocus),
          document.removeEventListener("click", readTap, !0),
          speechOff());
    },
    pdfReader: function (on) {
      on ? document.addEventListener("click", D, !0) : document.removeEventListener("click", D, !0);
    },
    imageTooltips: function (on) {
      if (on) {
        for (var imgs = document.querySelectorAll("img[alt]"), a4 = 0; a4 < imgs.length; a4++) {
          var im = imgs[a4];
          if (im.dataset.a11yTip || !im.alt || !im.alt.trim() || isWidget(im)) continue;
          // نضيف الوصف بعد الصورة (أو بعد <picture>) دون تغليفها، حتى لا تنكسر تخطيطات الصفحة
          var anchor = (im.parentElement && im.parentElement.tagName === "PICTURE") ? im.parentElement : im;
          var cap = document.createElement("span");
          cap.className = "a11y-img-caption";
          cap.textContent = im.alt;
          cap.style.cssText =
            "display:block;max-width:100%;font-size:12px;line-height:1.5;background:#111;color:#fff;padding:4px 8px;text-align:center;font-family:'Tajawal',system-ui,sans-serif;";
          anchor.parentNode && anchor.parentNode.insertBefore(cap, anchor.nextSibling);
          im.dataset.a11yTip = "1";
        }
      } else {
        for (var caps = document.querySelectorAll(".a11y-img-caption"), s5 = 0; s5 < caps.length; s5++) caps[s5].remove();
        for (var tips = document.querySelectorAll("img[data-a11y-tip]"), s6 = 0; s6 < tips.length; s6++) tips[s6].removeAttribute("data-a11y-tip");
      }
    },
    magnifier: function (on) {
      if (on) {
        if (E) return;
        E = document.createElement("div");
        E.id = "a11y-lens";
        E.setAttribute("aria-hidden", "true");
        E.style.cssText =
          "position:fixed;width:190px;height:190px;border-radius:50%;border:5px solid " + t.color +
          ";box-shadow:0 10px 28px rgba(0,0,0,.4);overflow:hidden;pointer-events:none;z-index:2147483647;background:#fff;left:-999px;top:-999px;";
        k = document.body.cloneNode(!0);
        var rm = k.querySelectorAll("#a11yWidgetFrame,#a11y-lens,#a11y-reading-guide,#a11y-focus,#a11y-structure,script,iframe,video,audio");
        for (var q1 = 0; q1 < rm.length; q1++) rm[q1].remove();
        // إزالة المعرّفات المكررة حتى لا تتعارض مع سكربتات الموقع
        k.removeAttribute("id");
        var ids = k.querySelectorAll("[id]");
        for (var q2 = 0; q2 < ids.length; q2++) ids[q2].removeAttribute("id");
        k.style.cssText =
          "position:absolute;top:0;left:0;margin:0;transform-origin:0 0;pointer-events:none;width:" + document.body.scrollWidth + "px;";
        E.appendChild(k);
        document.body.appendChild(E);
        document.addEventListener("pointermove", M, { passive: !0 });
        document.addEventListener("touchmove", M, { passive: !0 });
        document.addEventListener("touchstart", M, { passive: !0 });
      } else
        E &&
          (document.removeEventListener("pointermove", M),
          document.removeEventListener("touchmove", M),
          document.removeEventListener("touchstart", M),
          E.remove(),
          (E = null),
          (k = null));
    },
  },
  H = !1;

  /* ---------- الترجمة ---------- */
  function clearGoogTrans() {
    var exp = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans" + exp;
    var parts = location.hostname.split(".");
    for (var i5 = 0; i5 < parts.length - 1; i5++) {
      var dm = parts.slice(i5).join(".");
      document.cookie = "googtrans" + exp + " domain=" + dm + ";";
      document.cookie = "googtrans" + exp + " domain=." + dm + ";";
    }
  }
  function F(lang) {
    if (lang === t.originalLang) { clearGoogTrans(); window.location.reload(); return; }
    !(function (cb) {
      if (H) return cb();
      var holder = document.getElementById("a11y-google-translate");
      holder ||
        ((holder = document.createElement("div")),
        (holder.id = "a11y-google-translate"),
        (holder.style.cssText = "display:none;"),
        document.body.appendChild(holder));
      window.a11yTranslateInit = function () {
        new google.translate.TranslateElement({ pageLanguage: t.originalLang, autoDisplay: !1 }, "a11y-google-translate");
        H = !0;
        cb();
      };
      if (document.getElementById("a11y-google-translate-script")) {
        var iv = setInterval(function () { H && (clearInterval(iv), cb()); }, 200);
      } else {
        var sc = document.createElement("script");
        sc.id = "a11y-google-translate-script";
        sc.src = "https://translate.google.com/translate_a/element.js?cb=a11yTranslateInit";
        document.body.appendChild(sc);
      }
    })(function () {
      var n2 = 0,
        iv2 = setInterval(function () {
          var sel = document.querySelector("select.goog-te-combo");
          n2++;
          sel
            ? (clearInterval(iv2), (sel.value = lang), sel.dispatchEvent(new Event("change")))
            : n2 > 40 && clearInterval(iv2);
        }, 200);
    });
  }

  function I(key, on) {
    var map = y[key];
    u[key] = on;
    for (var s7 in map) {
      u[s7] = on ? map[s7] : "boolean" != typeof map[s7] && 0;
      if (on) exclusive(s7);
    }
    for (var b2 in B) B[b2](!!u[b2]);
    m();
  }
  function R() {
    for (var e3 = Object.keys(B), t4 = 0; t4 < e3.length; t4++) B[e3[t4]](!1);
    speechOff();
    u = clone(DEFAULTS);
    m();
  }

  function viewport() {
    var vv = window.visualViewport;
    return { w: vv ? vv.width : window.innerWidth, h: vv ? vv.height : window.innerHeight };
  }

  /* ---------- بناء الإطار وتهيئته ---------- */
  function q() {
    if (document.getElementById("a11yWidgetFrame")) return;
    load();
    var fr = document.createElement("iframe");
    fr.setAttribute("id", "a11yWidgetFrame");
    fr.setAttribute("title", o.ar.headerTitle);
    fr.setAttribute("scrolling", "no");
    fr.setAttribute("translate", "no");
    fr.className = "notranslate";
    fr.style.cssText =
      "position:fixed;bottom:env(safe-area-inset-bottom,0px);" + side +
      ":env(safe-area-inset-" + side + ",0px);width:90px;height:90px;max-width:100vw;border:0;z-index:2147483647;background:transparent;color-scheme:light;transition:width .22s ease, height .22s ease;pointer-events:auto;display:block;";
    document.body.appendChild(fr);
    frameEl = fr;
    var doc = fr.contentDocument || fr.contentWindow.document;
    doc.open();
    doc.write(
      "<!doctype html><html lang='ar' dir='rtl'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>" +
        "<link rel='preconnect' href='https://fonts.googleapis.com'>" +
        "<link href='https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap' rel='stylesheet'>" +
        "<style>:root{--a11y-c:" + t.color + ";--a11y-c2:" + t.color2 + ";--a11y-a:" + t.accent + "}" + d + "</style></head><body>" +
        c + "</body></html>"
    );
    doc.close();
    // DOM الإطار جاهز مباشرة بعد write/close، فلا نعتمد على حدث load (غير مضمون في بعض المتصفحات)
    init(fr);
  }

  function init(fr) {
    var t5 = fr.contentDocument,
      btn = t5.getElementById("a11yToggle"),
      panel = t5.getElementById("a11yPanel"),
      closeBtn = t5.getElementById("a11yClose");

    function i18n() {
      for (var e4 = t5.querySelectorAll("[data-i18n]"), a5 = 0; a5 < e4.length; a5++) {
        var key = e4[a5].getAttribute("data-i18n");
        o[g][key] && (e4[a5].textContent = o[g][key]);
      }
      for (var n3 = t5.querySelectorAll("[data-i18n-ph]"), r3 = 0; r3 < n3.length; r3++) {
        var k3 = n3[r3].getAttribute("data-i18n-ph");
        o[g][k3] && n3[r3].setAttribute("placeholder", o[g][k3]);
      }
      for (var n4 = t5.querySelectorAll("[data-i18n-label]"), r4 = 0; r4 < n4.length; r4++) {
        var k4 = n4[r4].getAttribute("data-i18n-label");
        o[g][k4] && n4[r4].setAttribute("aria-label", o[g][k4]);
      }
      t5.getElementById("a11yLangDropLabel").textContent = "ar" === g ? "العربية (Arabic)" : "English";
      t5.documentElement.setAttribute("dir", "ar" === g ? "rtl" : "ltr");
      t5.documentElement.setAttribute("lang", g);
      fr.setAttribute("title", o[g].headerTitle);
    }
    function size() {
      var vp = viewport(),
        W = Math.min(392, Math.floor(vp.w) - (vp.w < 420 ? 0 : 16)),
        Hh = Math.min(680, Math.floor(vp.h) - 8);
      fr.style.width = W + "px";
      fr.style.height = Hh + "px";
    }
    function closePanel(focusBack) {
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      fr.style.width = "90px";
      fr.style.height = "90px";
      if (focusBack) btn.focus();
    }
    function openPanel() {
      panel.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      size();
      setTimeout(function () { closeBtn.focus(); }, 30);
    }

    i18n();
    btn.addEventListener("click", function () {
      panel.classList.contains("open") ? closePanel(!1) : openPanel();
    });
    closeBtn.addEventListener("click", function () { closePanel(!0); });
    t5.getElementById("a11yHeadReset").addEventListener("click", function () { R(); sync(); });
    t5.addEventListener("keydown", function (ev) {
      "Escape" === ev.key && (closePanel(!0), dropList.classList.remove("open"), speechOff());
    });
    document.addEventListener("keydown", function (ev) {
      if ("Escape" === ev.key) {
        speechOff();
        panel.classList.contains("open") && closePanel(!1);
      }
    });

    var tabs = t5.querySelectorAll(".a11y-tab"), views = t5.querySelectorAll(".a11y-view");
    for (var p2 = 0; p2 < tabs.length; p2++)
      tabs[p2].addEventListener("click", function () {
        for (var e5 = 0; e5 < tabs.length; e5++) { tabs[e5].classList.remove("active"); tabs[e5].setAttribute("aria-selected", "false"); }
        for (var a6 = 0; a6 < views.length; a6++) views[a6].classList.remove("active");
        this.classList.add("active");
        this.setAttribute("aria-selected", "true");
        t5.querySelector('.a11y-view[data-view="' + this.getAttribute("data-view") + '"]').classList.add("active");
      });

    var dropBtn = t5.getElementById("a11yLangDropBtn"), dropList = t5.getElementById("a11yLangDropList");
    dropBtn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      var op = dropList.classList.toggle("open");
      dropBtn.setAttribute("aria-expanded", op ? "true" : "false");
    });
    t5.addEventListener("click", function () {
      dropList.classList.remove("open");
      dropBtn.setAttribute("aria-expanded", "false");
    });
    for (var items = t5.querySelectorAll(".a11y-dropdown-item"), b3 = 0; b3 < items.length; b3++)
      items[b3].addEventListener("click", function () {
        g = this.getAttribute("data-ui-lang");
        i18n();
        sync();
        save();
        dropList.classList.remove("open");
        dropBtn.setAttribute("aria-expanded", "false");
        dropBtn.focus();
      });

    function sync() {
      for (var e6 = t5.querySelectorAll("[data-toggle]"), a7 = 0; a7 < e6.length; a7++) {
        var k5 = e6[a7].getAttribute("data-toggle");
        e6[a7].classList.toggle("active", !!u[k5]);
        e6[a7].setAttribute("aria-pressed", !!u[k5]);
      }
      for (
        var cy = t5.querySelectorAll("[data-cycle]"),
          labels = [o[g].cursorOff, o[g].cursorMedium, o[g].cursorLarge, o[g].cursorXLarge],
          s8 = 0;
        s8 < cy.length;
        s8++
      ) {
        var k6 = cy[s8].getAttribute("data-cycle"), d6 = u[k6] || 0;
        cy[s8].classList.toggle("active", d6 > 0);
        cy[s8].setAttribute("aria-pressed", d6 > 0);
        var st = t5.querySelector('[data-cycle-state="' + k6 + '"]');
        st && (st.textContent = labels[d6] || labels[0]);
      }
      for (var pr = t5.querySelectorAll("[data-profile-toggle]"), h2 = 0; h2 < pr.length; h2++) {
        var k7 = pr[h2].getAttribute("data-profile-toggle");
        pr[h2].classList.toggle("on", !!u[k7]);
        pr[h2].setAttribute("aria-pressed", !!u[k7]);
      }
      t5.getElementById("fontVal").textContent = 100 + 10 * u.fontStep + "%";
      t5.getElementById("a11yTtsLang").value = u.screenReaderLang;
    }
    window.__a11ySyncUI = sync;

    var live = t5.getElementById("a11yLiveRegion");
    function announce(msg) { live && (live.textContent = msg); }
    var ONOFF = { ar: ["مفعّل", "غير مفعّل"], en: ["on", "off"] };

    for (var tg2 = t5.querySelectorAll("[data-toggle]"), M2 = 0; M2 < tg2.length; M2++)
      tg2[M2].addEventListener("click", function () {
        var key = this.getAttribute("data-toggle");
        u[key] = !u[key];
        exclusive(key);
        for (var b4 in B) B[b4](!!u[b4]);
        m();
        sync();
        var lb2 = this.querySelector(".a11y-tile-label");
        announce((lb2 ? lb2.textContent : key) + ": " + (u[key] ? ONOFF[g][0] : ONOFF[g][1]));
      });
    for (var cyc = t5.querySelectorAll("[data-cycle]"), A2 = 0; A2 < cyc.length; A2++)
      cyc[A2].addEventListener("click", function () {
        var key = this.getAttribute("data-cycle");
        u[key] = ((u[key] || 0) + 1) % 4;
        m();
        sync();
        var st2 = this.querySelector(".a11y-tile-state"), lb3 = this.querySelector(".a11y-tile-label");
        announce((lb3 ? lb3.textContent : key) + ": " + (st2 ? st2.textContent : ""));
      });
    for (var pt2 = t5.querySelectorAll("[data-profile-toggle]"), T2 = 0; T2 < pt2.length; T2++)
      pt2[T2].addEventListener("click", function () {
        var key = this.getAttribute("data-profile-toggle");
        I(key, !u[key]);
        sync();
        var tl = this.parentElement.parentElement.querySelector(".a11y-profile-title");
        announce((tl ? tl.textContent : key) + ": " + (u[key] ? ONOFF[g][0] : ONOFF[g][1]));
      });
    t5.querySelector('[data-act="fontUp"]').addEventListener("click", function () {
      u.fontStep = Math.min(6, u.fontStep + 1); m(); sync();
    });
    t5.querySelector('[data-act="fontDown"]').addEventListener("click", function () {
      u.fontStep = Math.max(-3, u.fontStep - 1); m(); sync();
    });
    t5.getElementById("a11yTtsLang").addEventListener("change", function () {
      u.screenReaderLang = this.value; save();
    });

    var langBtns = t5.querySelectorAll(".a11y-lang-btn");
    for (var D2 = 0; D2 < langBtns.length; D2++)
      langBtns[D2].addEventListener("click", function () {
        for (var e7 = 0; e7 < langBtns.length; e7++) langBtns[e7].classList.remove("active");
        this.classList.add("active");
        F(this.getAttribute("data-lang"));
      });
    t5.getElementById("a11yLangSearch").addEventListener("input", function () {
      for (var val = this.value.trim().toLowerCase(), e8 = 0; e8 < langBtns.length; e8++) {
        var txt = langBtns[e8].textContent.toLowerCase() + " " + langBtns[e8].getAttribute("data-lang").toLowerCase();
        langBtns[e8].classList.toggle("a11y-hidden", !!val && -1 === txt.indexOf(val));
      }
    });
    t5.getElementById("a11yResetAll").addEventListener("click", function () {
      R();
      sync();
      for (var e9 = 0; e9 < langBtns.length; e9++) langBtns[e9].classList.remove("active");
    });

    function onResize() { panel.classList.contains("open") && size(); }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", function () { setTimeout(onResize, 250); });
    window.visualViewport && window.visualViewport.addEventListener("resize", onResize);

    // استعادة الإعدادات المحفوظة من الزيارة السابقة
    for (var b5 in B) u[b5] && B[b5](!0);
    m();
    sync();
  }

  "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", q) : q();
})();
