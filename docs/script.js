document.addEventListener('DOMContentLoaded', () => {

    // --- 1. انتخاب عناصر HTML ---
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name-display');
    const apiKeyInput = document.getElementById('api-key-input');
    const modelListDiv = document.getElementById('model-list');
    const addModelBtn = document.getElementById('add-model-btn');
    const tempSlider = document.getElementById('temperature-slider');
    const tempValue = document.getElementById('temp-value');
    const topPSlider = document.getElementById('top-p-slider');
    const topPValue = document.getElementById('top-p-value');
    const promptListDiv = document.getElementById('prompt-list');
    const addPromptBtn = document.getElementById('add-prompt-btn');
    const promptDisplayArea = document.getElementById('prompt-display-area');
    const resetAllBtn = document.getElementById('reset-all-btn');
    const translateBtn = document.getElementById('translate-btn');
    const progressSection = document.getElementById('progress-section');
    const progressTitle = document.getElementById('progress-title');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    const liveOutput = document.getElementById('live-output');
    const downloadBtn = document.getElementById('download-btn');
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.getElementById('error-message');
    // New elements
    const stopTranslationBtn = document.getElementById('stop-translation-btn');
    const translationStatusMessage = document.getElementById('translation-status-message');
    const vpnWarningText = document.getElementById('vpn-warning-text');
       // عناصر برای تنظیمات ایمنی
    const safetyHarassmentToggle = document.getElementById('safety-harassment-toggle');
    const safetyHateSpeechToggle = document.getElementById('safety-hate-speech-toggle');
    const safetySexuallyExplicitToggle = document.getElementById('safety-sexually-explicit-toggle');
    const safetyDangerousContentToggle = document.getElementById('safety-dangerous-content-toggle');
     // START: عناصر جدید برای نمایش/عدم نمایش کلید API
    const toggleApiKeyVisibilityBtn = document.getElementById('toggle-api-key-visibility');
    const eyeOpenIcon = document.getElementById('eye-open');
    const eyeSlashedIcon = document.getElementById('eye-slashed');
    // END: عناصر جدید
   // =================================================================
// بخش جدید: مدیریت تیک‌پراکسی و متن هشدار
// =================================================================
const proxyToggle = document.getElementById('proxy-toggle');

function updateVpnWarningVisibility() {
    // اگر تیک‌ پراکسی فعال بود، متن هشدار را مخفی کن، در غیر این صورت نمایش بده
    if (vpnWarningText) {
        vpnWarningText.style.display = proxyToggle.checked ? 'none' : 'block';
    }
}

// بارگذاری وضعیت ذخیره شده تیک‌پراکسی از حافظه
const savedProxyState = localStorage.getItem('proxyEnabled') === 'true';
proxyToggle.checked = savedProxyState;
updateVpnWarningVisibility(); // << تنظیم وضعیت اولیه متن هشدار

// ذخیره وضعیت جدید و به‌روزرسانی نمایش هنگام تغییر تیک
proxyToggle.addEventListener('change', () => {
    localStorage.setItem('proxyEnabled', proxyToggle.checked);
    updateVpnWarningVisibility(); // << به‌روزرسانی زنده متن هشدار
});
// =================================================================
  


    // --- 2. ثابت‌ها و متغیرهای اصلی ---
    
   
const COUNTER_API_PROXY_URL = 'https://anime-counter.khalilkhko.workers.dev'; 
    // IMPORTANT: DO NOT MODIFY THIS PROMPT. IT IS HIGHLY OPTIMIZED.
    const DEFAULT_PROMPT = `پرامپت پیشرفته و یکپارچه برای ترجمه حرفه‌ای زیرنویس انیمه (فرمت 'میکرو دی وی دی') 

مأموریت شما:
شما یک دستیار هوش مصنوعی متخصص در ترجمه حرفه‌ای و بومی‌سازی زیرنویس انیمه هستید. وظیفه شما دریافت یک فایل زیرنویس انگلیسی با فرمت 'میکرو دی وی دی' و ارائه ترجمه‌ای بی‌نقص، روان، جذاب و وفادار به زبان فارسی است، به گونه‌ای که تجربه تماشای انیمه برای مخاطب فارسی‌زبان، غنی و لذت‌بخش باشد.

فایل ورودی:
یک فایل متنی حاوی زیرنویس انگلیسی یک انیمه در فرمت 'میکرو دی وی دی'.

---

فرایند پردازش و ترجمه (مبتنی بر خود-اصلاحی):

شما باید این فرآیند را در سه گام ذهنی و متوالی اجرا کنید:

گام ۱: تحلیل جامع و تولید پیش‌نویس اولیه
*   اسم انیمه را از نام فایل ورودی شناسایی کرده و بر اساس موضوع داستانی آن، تحلیل را آغاز کن.
*   پیش از شروع ترجمه، کل محتوای زیرنویس را بخوانید تا ژانر، فضای داستانی، و ویژگی‌های شخصیتی کاراکترها را (تا حد امکان بر اساس دیالوگ‌های موجود) درک کنید.
*   ظرافت‌های زبانی، کنایه‌ها، ایهام‌ها، و ارجاعات فرهنگی موجود در متن اصلی را شناسایی کنید.
*   در مرحله‌ی اندیشیدن، بر اساس این درک عمیق، یک پیش‌نویس اولیه از ترجمه را تولید کنید. (این پیش‌نویس داخلی است و به کاربر نمایش داده نمی‌شود).

گام ۲: بازبینی موشکافانه و پالایش (مرحله خود-اصلاحی)
*   حالا با نگاه یک ویراستار سخت‌گیر، پیش‌نویس خود را به چالش بکشید. هر خط را با در نظر گرفتن تمام اصول کلیدی ترجمه (که در ادامه آمده) بازبینی کنید.
*   از خود بپرسید: آیا این جمله روان است یا "بوی ترجمه" می‌دهد؟ آیا لحن شخصیت حفظ شده؟ آیا معادل بهتری برای این اصطلاح وجود دارد؟
*   متن را ویرایش و پالایش کنید تا به بهترین نسخه ممکن برسید.

گام ۳: ارائه خروجی نهایی
*   نسخه نهایی و بی‌نقص را که حاصل گام دوم است، به عنوان خروجی قطعی ارائه دهید.

---

اصول کلیدی ترجمه (قوانین حاکم بر گام‌های بالا):

1.  وفاداری به معنا و مفهوم، نه ترجمه تحت‌اللفظی: هدف اصلی، انتقال دقیق پیام و حس دیالوگ اصلی است. از ترجمه کلمه به کلمه که منجر به عبارات نامأنوس یا بی‌معنی در فارسی می‌شود، اکیداً پرهیز کنید.
2.  روانی، سلیس بودن و جذابیت کلام: ترجمه باید به زبان فارسی امروزی، طبیعی و پویا باشد. متن نهایی باید به‌راحتی خوانده شود و برای مخاطب عام فارسی‌زبان کاملاً قابل فهم و گیرا باشد.
3.  حفظ لحن و سبک شخصیت‌ها: لحن هر کاراکتر (رسمی، دوستانه، طنزآمیز، جدی، خشن، معصومانه و...) و سبک گفتاری او باید با دقت در ترجمه فارسی بازتاب داده شود.
4.  بومی‌سازی هوشمندانه اصطلاحات و ارجاعات فرهنگی:
    *   اصطلاحات، ضرب‌المثل‌ها، شوخی‌ها و عبارات خاص فرهنگی انیمه را شناسایی کنید.
    *   اولویت با یافتن معادل‌های دقیق، رایج و طبیعی در زبان و فرهنگ فارسی است.
    *   در صورتی که معادل مستقیمی وجود ندارد، یا استفاده از آن به اصالت اثر لطمه می‌زند، سعی کنید مفهوم را با خلاقیت و به شکلی که برای مخاطب فارسی‌زبان قابل درک باشد، منتقل کنید. (مثلاً گاهی یک توضیح کوتاه درون پرانتز در خود زیرنویس لازم است، اما این مورد را تنها در صورت ضرورت انجام دهید و اولویت با معادل‌یابی است).
5.  دقت و صحت کامل:
    *   ترجمه باید عاری از هرگونه اشتباه گرامری, املایی و معنایی باشد.
    *   تمامی جزئیات موجود در زیرنویس اصلی، از جمله اعداد، اسامی خاص (شخصیت‌ها، مکان‌ها، تکنیک‌ها و...) و علائم نگارشی باید با دقت و به درستی به فارسی برگردانده شوند.
6.  یکپارچگی و ثبات: در طول ترجمه کل فایل، برای اسامی، اصطلاحات و عبارات تکرارشونده، از معادل‌های یکسان استفاده کنید تا انسجام متن حفظ شود.

---

محدودیت‌های زبانی:

*   زبان پایه فارسی: ترجمه باید کاملاً به زبان فارسی باشد.
*   استفاده از واژگان انگلیسی: از به‌کار بردن کلمات غیرفارسی پرهیز کنید. تنها در صورتی مجاز به استفاده از واژه انگلیسی هستید که آن واژه یک نام خاص، برند، یا اصطلاح فنی شناخته‌شده باشد که معادل فارسی رایج و جاافتاده‌ای ندارد و استفاده از اصل کلمه به درک بهتر کمک می‌کند. اولویت مطلق با واژگان فارسی است.
*   حفظ کاراکتر : در صورت وجود کاراکتر پایپ‌لاین (\`|\`) و کاراکترهای آکولاد (\`{\`) و (\`}\`) در متن اصلی، این کاراکتر باید بدون هیچ تغییری در متن ترجمه‌شده نیز حفظ شود.
*   نکته آکولاد: تعداد آکولاد خروجی باید برابر با ورودی باشه، و وجود آن در ترجمه نباید تاثیر منفی بگذارد و قرار دادن آن در خروجی فقط یک استایل نمایشی می‌باشد.


---

ساختار و فرمت خروجی:

1.  تطابق کامل با فرمت ورودی: خروجی باید *دقیقا* با حفظ ساختار، فرمت، شماره‌گذاری خطوط و به‌ویژه زمان‌بندی فایل اصلی 'میکرو دی وی دی' ارائه شود. هر خط ترجمه شده باید متناظر با خط اصلی در فایل ورودی باشد.
2.  محتوای خروجی: خروجی نهایی باید *صرفاً* یک بلوک کد باشد که *فقط و فقط* شامل متن ترجمه‌شده‌ی زیرنویس به فارسی است.
3.  عدم وجود اطلاعات اضافی در بلوک کد: هیچ‌گونه توضیح، مقدمه، تفسیر، یادداشت مترجم یا هرگونه متن اضافی دیگری نباید *درون* این بلوک کد قرار گیرد.

تأکید نهایی:
شما باید تمامی این دستورالعمل‌ها را با دقت مرور کرده و اطمینان حاصل کنید که خروجی شما دقیقاً مطابق با موارد ذکر شده است. هدف، ارائه یک ترجمه حرفه‌ای و بی‌نقص است که نیازی به ویرایش مجدد نداشته باشد.`;

    let uploadedFile = null;
    let translatedMicroDVDContent = '';
    let originalMicroDVDLines = 0;
    
    let models = [];
    let selectedModelApiName = '';
    let prompts = [];
    let selectedPromptId = 'default';

    let abortController = null;
    let originalLastEndFrame = 0;
    
    let ffprobeWorker = null;
    let ffmpegWorker = null;

    // START: Variable for the thinking-phase timer
    let thinkingPhaseTimer = null;
    // END: Variable for the thinking-phase timer
  
    // --- Mobile/Browser Detection Helpers ---
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }

    // --- 3. توابع تبدیل فرمت ---
    function timeToFrames(time, fps) {
        const parts = time.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
        if (!parts) return 0;
        const hours = parseInt(parts[1], 10);
        const minutes = parseInt(parts[2], 10);
        const seconds = parseInt(parts[3], 10);
        const milliseconds = parseInt(parts[4], 10);
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds + (milliseconds / 1000);
        return Math.floor(totalSeconds * fps);
    }
           function convertSrtToMicroDVD(srtContent, fps = 23.976) {
       
        // 1. نرمال‌سازی خطوط جدید و تقسیم فایل به بلوک‌های مجزا بر اساس خطوط خالی.
        const blocks = srtContent.replace(/\r\n/g, '\n').split(/\n\n+/);
        let microDVD = '';
        
        // الگوی Regex برای پیدا کردن خط زمان‌بندی در هر بلوک
        const timeRegex = /(\d{2}:\d{2}:\d{2},\d{3})\s+-->\s+(\d{2}:\d{2}:\d{2},\d{3})/;

        for (const block of blocks) {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) {
                continue; // از بلوک‌های کاملاً خالی صرف نظر کن
            }

            const lines = trimmedBlock.split('\n');
            
            // یک بلوک معتبر حداقل به 2 خط نیاز دارد (شماره و زمانبندی)
            if (lines.length < 2) {
                continue;
            }

            // پیدا کردن خطی که شامل زمان‌بندی است
            const timeLineIndex = lines.findIndex(line => timeRegex.test(line));

            // اگر هیچ خط زمانبندی در بلوک پیدا نشد، بلوک نامعتبر است
            if (timeLineIndex === -1) {
                continue;
            }

            const timeMatch = lines[timeLineIndex].match(timeRegex);
            
            // تمام خطوط بعد از خط زمانبندی، به عنوان متن دیالوگ در نظر گرفته می‌شوند.
            const textLines = lines.slice(timeLineIndex + 1);

            // خطوط متن را با کاراکتر | به هم متصل کرده و فضاهای خالی ابتدا و انتها را حذف می‌کنیم
            const text = textLines.join('|').trim();

            // *** این شرط اصلی و نهایی است ***
            // اگر پس از پردازش، متنی باقی مانده باشد، آن را به خروجی اضافه کن.
            // در غیر این صورت (بلوک بدون دیالوگ)، کل بلوک نادیده گرفته می‌شود.
            if (text) {
                const startTime = timeMatch[1];
                const endTime = timeMatch[2];
                const startFrame = timeToFrames(startTime, fps);
                const endFrame = timeToFrames(endTime, fps);
                
                microDVD += `{${startFrame}}{${endFrame}}${text}\n`;
            }
        }
        return microDVD.trim();
    }
    function framesToSrtTime(frames, fps) {
        const totalSeconds = frames / fps;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const milliseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(3, '0')}`;
    }
       function convertMicroDVDtoSrt(microDVDContent, fps = 23.976) {
        const lines = microDVDContent.split('\n');
        let srt = '';
        let index = 1;
        const lineRegex = /\{(\d+)\}\{(\d+)\}(.*)/;
        for (const line of lines) {
            const match = line.trim().match(lineRegex);
            if (match) {
                const startFrame = parseInt(match[1], 10);
                const endFrame = parseInt(match[2], 10);
                let text = match[3];
                const startTime = framesToSrtTime(startFrame, fps);
                const endTime = framesToSrtTime(endFrame, fps);

                const rtlFixedText = text.replace(/\|/g, '\r\n').split('\r\n').map(line => `\u202B${line.trim()}\u202C`).join('\r\n');
                
                srt += `${index}\r\n${startTime} --> ${endTime}\r\n${rtlFixedText}\r\n\r\n`;
                index++;
            }
        }
        return srt;
       }

 

// === START: تابع جدید برای مرتب‌سازی فایل‌های SRT ===
function sortSrtContent(srtContent) {
    // تابع کمکی برای تبدیل زمان SRT به میلی‌ثانیه
    function srtTimeToMS(timeStr) {
        const parts = timeStr.split(/[:,]/);
        const h = parseInt(parts[0], 10) || 0;
        const m = parseInt(parts[1], 10) || 0;
        const s = parseInt(parts[2], 10) || 0;
        const ms = parseInt(parts[3], 10) || 0;
        return (h * 3600 + m * 60 + s) * 1000 + ms;
    }

    const srtBlockRegex = /(\d+)\s*\n(\d{2}:\d{2}:\d{2},\d{3})\s-->\s(\d{2}:\d{2}:\d{2},\d{3})\s*\n([\s\S]+?)(?=\n\n|\n*$)/g;
    const subs = [];
    let match;

    while ((match = srtBlockRegex.exec(srtContent)) !== null) {
        subs.push({
            startMS: srtTimeToMS(match[2]),
            fullBlock: match[0] // کل بلوک زیرنویس را نگه می‌داریم
        });
    }

    // مرتب‌سازی بر اساس زمان شروع
    subs.sort((a, b) => a.startMS - b.startMS);

    // بازسازی فایل SRT با شماره‌گذاری جدید و صحیح
    let newSrtContent = '';
    subs.forEach((sub, index) => {
        // شماره ایندکس قدیمی را با شماره جدید جایگزین می‌کنیم
        const correctedBlock = sub.fullBlock.replace(/^\d+/, index + 1);
        newSrtContent += correctedBlock + '\r\n\r\n';
    });

    return newSrtContent.trim();
}
// === END: تابع  ===```




// === START: تابع نهایی با روش استخراج متن اصلاح شده و فیلترهای شما ===
function cleanAssToSrt(assContent) {
    function assTimeToMS(timeStr) {
        if (!timeStr) return 0;
        const parts = timeStr.split(/[:.]/);
        const h = parseInt(parts[0], 10) || 0;
        const m = parseInt(parts[1], 10) || 0;
        const s = parseInt(parts[2], 10) || 0;
        const cs = parseInt(parts[3], 10) || 0;
        return (h * 3600 + m * 60 + s) * 1000 + cs * 10;
    }

    function msToSrtTime(ms) {
        const date = new Date(ms);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
        return `${hours}:${minutes}:${seconds},${milliseconds}`;
    }

    const lines = assContent.split('\n');
    const dialogues = [];
    
    // --- START: فیلتر جدید نقاشی ---
    const drawingCommandRegex = /^\s*(m|l|b|s|p|c)\s+\d/i; // برای تشخیص شروع دستور نقاشی
    const nonCommandLettersRegex = /[a-gi-k-z]/gi; // برای پیدا کردن حروف الفبای غیر دستوری
    // --- END: فیلتر جدید نقاشی ---

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('Dialogue:')) {
            const parts = trimmedLine.split(',');
            if (parts.length < 10) continue;

            const startTimeStr = parts[1];
            const endTimeStr = parts[2];
            const rawText = parts.slice(9).join(',');
            
            // ۱. حذف تگ‌ها برای تحلیل متن
            const textWithoutTags = rawText.replace(/\{[^}]*\}/g, '').trim();

            // فیلتر ۱: حذف خطوط طراحی {\p0}
            if (rawText.trim().endsWith('{\\p0}')) {
                continue;
            }

            // --- START: اعمال فیلتر جدید نقاشی ---
            const isDrawingCommand = drawingCommandRegex.test(textWithoutTags);
            const otherLetters = textWithoutTags.match(nonCommandLettersRegex);
           if (isDrawingCommand) {
    continue;
}
            // --- END: اعمال فیلتر ---

            // فیلتر ۲: حذف خطوط کارائوکه تک‌حرفی
            if (rawText.includes('{') && textWithoutTags.length === 1) {
                continue;
            }
            
            const cleanedText = textWithoutTags.replace(/\\h/g, ' ').replace(/\\n/g, '\r\n').replace(/\\N/g, '\r\n');

            if (cleanedText) {
                dialogues.push({
                    start: assTimeToMS(startTimeStr),
                    end: assTimeToMS(endTimeStr),
                    text: cleanedText
                });
            }
        }
    }

    dialogues.sort((a, b) => a.start - b.start);

    let srtOutput = '';
    let srtIndex = 1;
    for (const sub of dialogues) {
        const startTime = msToSrtTime(sub.start);
        const endTime = msToSrtTime(sub.end);
        srtOutput += `${srtIndex}\r\n${startTime} --> ${endTime}\r\n${sub.text}\r\n\r\n`;
        srtIndex++;
    }

    return srtOutput.trim();
}
// === END: تابع نهایی و اصلاح شده ===

// === START: موتور تحلیلگر جدید و متقارکز برای خطوط دیالوگ ASS ===

/**
 * این تابع یک بخش دیالوگ ASS را به توکن‌های "متن" و "تگ" تجزیه می‌کند.
 * این موتور مرکزی است که تقارن را در کل فرآیند تضمین می‌کند.
 * @param {string} dialoguePart - بخش متن یک خط دیالوگ ASS.
 * @returns {Array<{type: 'text'|'tag', content: string}>} - آرایه‌ای از توکن‌ها.
 */
function analyzeAssDialogueLine(dialoguePart) {
    const tokens = [];
    // این Regex هم تگ‌ها ({...}) و هم متن بین آنها را پیدا می‌کند.
    const tokenRegex = /(\{[^}]*?\})|([^{}]+)/g;
    let match;

    while ((match = tokenRegex.exec(dialoguePart)) !== null) {
        if (match[1]) { // اگر گروه اول پیدا شد، یک تگ است.
            tokens.push({ type: 'tag', content: match[1] });
        } else if (match[2]) { // اگر گروه دوم پیدا شد، متن است.
            tokens.push({ type: 'text', content: match[2] });
        }
    }
    return tokens;
}

// === END: موتور تحلیلگر جدید ===

// === START: مجموعه توابع جدید برای پردازش خروجی ASS ===

function processAssForTranslationAndMapping(assContent, fps = 23.976) {
    const lines = assContent.split(/\r?\n/);
    const mapping = [];
    const microdvdLines = [];

    function assTimeToMS(timeStr) {
        if (!timeStr) return 0;
        const parts = timeStr.split(/[:.]/);
        return ((parseInt(parts[0],10)||0)*3600 + (parseInt(parts[1],10)||0)*60 + (parseInt(parts[2],10)||0))*1000 + (parseInt(parts[3],10)||0)*10;
    }
    function msToFrames(ms, fps) {
        return Math.floor((ms / 1000) * fps);
    }
    
    const drawingCommandRegex = /^\s*(m|l|b|s|p|c)\s+\d/i;
    const nonCommandLettersRegex = /[a-gi-k-z]/gi;

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('Dialogue:')) {
            const parts = trimmedLine.split(',');
            if (parts.length < 10) return;

            const dialoguePart = parts.slice(9).join(',');
            
            // <<<<<<<<<<< اینجا نقطه اصلاح شده اصلی است >>>>>>>>>>
            const textWithoutTags = dialoguePart.replace(/\{[^}]*\}/g, '').trim();

            if (dialoguePart.trim().endsWith('{\\p0}')) return;

            const isDrawingCommand = drawingCommandRegex.test(textWithoutTags);
            const otherLetters = textWithoutTags.match(nonCommandLettersRegex);
            if (isDrawingCommand) {
    return;
}

            if (dialoguePart.includes('{') && textWithoutTags.replace(/\\N/g, '').replace(/\\h/g, '').length <= 1 && textWithoutTags.length > 0) return;

            let textForAI = '';
            let isComplex = false;
            let segmentsForRemapping = null;
            
            // <<<<<<<<<<< اینجا هم از textWithoutTags استفاده می‌شود >>>>>>>>>>
            const dialogueWithoutItalics = dialoguePart.replace(/\{\\i1\}/g, '').replace(/\{\\i0\}/g, '');
            const originalTextOnly = dialogueWithoutItalics.replace(/\{[^}]*\}/g, '');

            if (dialogueWithoutItalics.replace(originalTextOnly, '') === dialogueWithoutItalics && originalTextOnly.trim() !== '') {
                isComplex = true;
                segmentsForRemapping = [];
                const segments = dialoguePart.split(/(\{[^}]*?\})/g).filter(Boolean);

                segments.forEach(segment => {
                    const isTag = segment.startsWith('{') && segment.endsWith('}');
                    segmentsForRemapping.push({ isTag: isTag, content: segment });
                    if (!isTag) {
                        const cleanSegment = segment.replace(/\\N/g, '|').replace(/\\h/g, ' ').trim();
                        if (cleanSegment) {
                            textForAI += `{${cleanSegment}}`;
                        }
                    }
                });
                textForAI = textForAI.trim();
            } else {
                isComplex = false;
                // <<<<<<<<<<< اینجا هم textWithoutTags استفاده می‌شود >>>>>>>>>>
                textForAI = textWithoutTags.replace(/\\N/g, '|').replace(/\\h/g, ' ');
            }

            if (textForAI.trim()) {
                const startTimeMs = assTimeToMS(parts[1]);
                const endTimeMs = assTimeToMS(parts[2]);
                const startFrame = msToFrames(startTimeMs, fps);
                const endFrame = msToFrames(endTimeMs, fps);
                const microdvdTime = `{${startFrame}}{${endFrame}}`;
                
                mapping.push({
                    lineNumber: index,
                    microdvdTime: microdvdTime,
                    isComplex: isComplex,
                    segments: segmentsForRemapping
                });
                
                microdvdLines.push(`${microdvdTime}${textForAI}`);
            }
        }
    });

    return {
        map: mapping,
        microdvdForAI: microdvdLines.join('\n')
    };
}

function createTranslationLookupMap(translatedMicroDVD) {
    const lookupMap = new Map();
    const lines = translatedMicroDVD.split(/\r?\n/);
    const lineRegex = /^\{(\d+)\}\{(\d+)\}(.*)$/;

    for (const line of lines) {
        const match = line.trim().match(lineRegex);
        if (match) {
            const timeKey = `{${match[1]}}{${match[2]}}`;
            let text = match[3];

            // --- START: راه حل هوشمندانه شما برای اعمال RTL در همان ابتدا ---
            if (text.startsWith('{') && text.endsWith('}')) {
                // این یک خط پیچیده است، RTL را روی هر قطعه اعمال می‌کنیم
                const segments = text.replace(/^\{|\}$/g, '').split('}{');
                const rtlFixedSegments = segments.map(segment => 
                    segment.split('|').map(part => `\u202B${part.trim()}\u202C`).join('|')
                );
                text = `{${rtlFixedSegments.join('}{')}}`;
            } else {
                // این یک خط استاندارد است، RTL را روی کل آن اعمال می‌کنemos
                text = text.split('|').map(part => `\u202B${part.trim()}\u202C`).join('|');
            }
            // --- END: راه حل هوشمندانه ---

            if (lookupMap.has(timeKey)) {
                lookupMap.get(timeKey).push(text);
            } else {
                lookupMap.set(timeKey, [text]);
            }
        }
    }
    return lookupMap;
}

function rebuildAssFromTranslation(originalAssContent, mapping, translationLookup) {
    const originalLines = originalAssContent.split(/\r?\n/);
    let untranslatedInRebuild = 0;
    let styleReplacementFailureCount = 0;

    mapping.forEach(mapItem => {
        const { lineNumber, microdvdTime, isComplex, segments } = mapItem;

        if (translationLookup.has(microdvdTime) && translationLookup.get(microdvdTime).length > 0) {
            const translatedText = translationLookup.get(microdvdTime).shift(); 
            
            const originalLine = originalLines[lineNumber];
            const parts = originalLine.split(',');

            if (parts.length < 10) return;

            let newDialoguePart = '';

            if (isComplex) {
                const translatedSegments = translatedText.replace(/^\{|\}$/g, '').split('}{');
                const originalTextSegments = segments.filter(s => !s.isTag && s.content.replace(/\\N/g, ' ').replace(/\\h/g, ' ').trim());

                if (originalTextSegments.length !== translatedSegments.length) {
                    styleReplacementFailureCount++;
                    const dialoguePart = parts.slice(9).join(',');
                    const firstBraceIndex = dialoguePart.indexOf('}');
                    
                    if (firstBraceIndex !== -1) {
                        const styleHeader = dialoguePart.substring(0, firstBraceIndex + 1);
                        const cleanTranslation = translatedText.replace(/\{/g, '').replace(/\}/g, ' ').replace(/\|/g, '\\N').trim();
                        newDialoguePart = styleHeader + cleanTranslation;
                    } else {
                        newDialoguePart = translatedText.replace(/\{/g, '').replace(/\}/g, ' ').replace(/\|/g, '\\N').trim();
                    }
                } else {
                    translatedSegments.reverse();
                    let translatedIndex = 0;
                    
                    const rebuiltSegments = segments.map(segment => {
                        if (segment.isTag) {
                            return segment.content;
                        } else {
                            const cleanOriginalSegment = segment.content.replace(/\\N/g, ' ').replace(/\\h/g, ' ').trim();
                            if (cleanOriginalSegment && translatedIndex < translatedSegments.length) {
                                // ترجمه از قبل آماده RTL است، فقط | را به \N تبدیل می‌کنیم
                                const currentTranslation = translatedSegments[translatedIndex].replace(/\|/g, '\\N');
                                translatedIndex++;
                                return currentTranslation;
                            }
                            return '';
                        }
                    });
                    newDialoguePart = rebuiltSegments.join('');
                }

            } else {
                // مسیر استاندارد (ترجمه از قبل آماده RTL است)
                const finalTranslation = translatedText.replace(/\|/g, '\\N');
                const originalDialoguePart = parts.slice(9).join(',');
                const dialogueWithoutItalics = originalDialoguePart.replace(/\{\\i1\}/g, '').replace(/\{\\i0}/g, '');
                const originalTextOnly = dialogueWithoutItalics.replace(/\{[^}]*\}/g, '');
                
                newDialoguePart = dialogueWithoutItalics.replace(originalTextOnly, finalTranslation);
            }

            const newParts = parts.slice(0, 9);
            newParts.push(newDialoguePart);
            originalLines[lineNumber] = newParts.join(',');

        } else {
            untranslatedInRebuild++;
        }
    });
    
    return {
        rebuiltAss: originalLines.join('\r\n'), // <<<<<<<<<< اصلاح شده
        untranslatedCount: untranslatedInRebuild,
        styleReplacementFailureCount: styleReplacementFailureCount
    };
}
// === END: مجموعه توابع جدید برای پردازش خروجی ASS ===


    
// === START: تابع نهایی "پیوند" بر اساس فرمان شما (نسخه بی‌نقص) ===
function mergeTrustedFramesWithAiText(originalMicroDVD, aiOutputMicroDVD) {
    if (!originalMicroDVD) return { mergedText: '', untranslatedCount: 0 };
    const originalLines = originalMicroDVD.trim().split('\n');
    if (!aiOutputMicroDVD) return { mergedText: originalMicroDVD, untranslatedCount: originalLines.length };

    const aiLines = aiOutputMicroDVD.trim().split('\n');
    
    // مرحله ۱: ساخت یک "فرهنگ لغت" (Map) از ترجمه‌های سالم AI
    // کلید: بلوک زمانی کامل "{start}{end}"
    // مقدار: متن ترجمه شده
    const translatedTextMap = new Map();
    const microDVDLineRegex = /^{(\d+)}{(\d+)}(.*)$/;

    for (const line of aiLines) {
        const match = line.trim().match(microDVDLineRegex);
        if (match) {
            const startFrame = match[1];
            const endFrame = match[2];
            const text = match[3];
            const timeBlockKey = `{${startFrame}}{${endFrame}}`; // کلید اصلی ما
            translatedTextMap.set(timeBlockKey, text);
        } else {
            console.warn("خط خراب از خروجی هوش مصنوعی نادیده گرفته شد:", line.trim());
        }
    }

    // مرحله ۲: بازسازی زیرنویس نهایی با استفاده از فایل اصلی به عنوان نقشه راه
    const mergedLines = [];
    let untranslatedCount = 0; // شمارنده برای خطوط ترجمه نشده
    for (const originalLine of originalLines) {
        const originalMatch = originalLine.match(microDVDLineRegex);
        if (originalMatch) {
            const startFrame = originalMatch[1];
            const endFrame = originalMatch[2];
            const timeBlockKey = `{${startFrame}}{${endFrame}}`;

            // اگر ترجمه‌ای با این بلوک زمانی دقیق پیدا شد، از آن استفاده می‌کنیم
            if (translatedTextMap.has(timeBlockKey)) {
                const translatedText = translatedTextMap.get(timeBlockKey);
                mergedLines.push(`${timeBlockKey}${translatedText}`);
            } else {
                // اگر پیدا نشد، خود خط اصلی انگلیسی را دست‌نخورده نگه می‌داریم
                console.warn(`ترجمه‌ای برای بلوک زمانی ${timeBlockKey} یافت نشد. خط اصلی انگلیسی حفظ می‌شود.`);
                mergedLines.push(originalLine);
                untranslatedCount++; // افزایش شمارنده
            }
        }
    }

    return {
        mergedText: mergedLines.join('\n'),
        untranslatedCount: untranslatedCount
    };
}
// === END: تابع نهایی "پیوند" ===

    

    
    // --- 4. توابع مدیریت برنامه ---

    

// تابع ۱: افزایش شمارنده (با استفاده از پراکسی و مسیر کامل)

async function incrementCounter(slug) {
    try {
               await fetch(`${COUNTER_API_PROXY_URL}/v1/anime-translator-project/${slug}/up`);
    } catch (error) {
        console.error(`Could not increment ${slug} counter:`, error);
    }
}


// تابع ۲: دریافت و نمایش آمار (با استفاده از پراکسی و مسیر کامل)
async function displayStats() {
    const downloadsElement = document.getElementById('downloads-counter');
    if (!downloadsElement) return;

    try {
        const downloadsResponse = await fetch(`${COUNTER_API_PROXY_URL}/v1/anime-translator-project/downloadfile`);
        const downloadsData = await downloadsResponse.json();
        downloadsElement.textContent = (downloadsData.count || 0).toLocaleString('fa-IR');
    } catch (error) {
        console.error("Could not fetch stats:", error);
        downloadsElement.textContent = 'N/A';
    }
}


// === START: تابع نهایی برای فارسی‌سازی استایل، حذف فونت داخلی و پیوست فونت ===
async function finalizeAssFile(assContent) {
    try {
        const fontResponse = await fetch('./fontVazirmatn.txt');
        if (!fontResponse.ok) throw new Error('فایل فونت پیدا نشد.');
        const fontData = await fontResponse.text();

        const lines = assContent.split(/\r?\n/);
        const newLines = [];
        let inStylesSection = false;
        let inEventsSection = false;
        let inFontsSection = false;
        
        // Regex برای پیدا کردن و حذف تگ \fn
        const fnTagRegex = /\\fn[^\\}]+/g;
        // Regex جدید شما برای پیدا کردن و حذف تگ \fsp
        const fspTagRegex = /\\fsp-?\d+/g;

        for (const line of lines) {
            let currentLine = line;
            const trimmedLine = line.trim().toLowerCase();

            if (trimmedLine === '[v4+ styles]') {
                inStylesSection = true; inEventsSection = false; inFontsSection = false;
            } else if (trimmedLine === '[events]') {
                inStylesSection = false; inEventsSection = true; inFontsSection = false;
            } else if (trimmedLine === '[fonts]') {
                inStylesSection = false; inEventsSection = false; inFontsSection = true;
            } else if (trimmedLine.startsWith('[')) {
                inStylesSection = false; inEventsSection = false; inFontsSection = false;
            }

            if (inStylesSection && line.toLowerCase().startsWith('style:')) {
                const parts = line.split(',');
                if (parts.length > 2) {
                    parts[1] = 'Vazirmatn Medium'; // تغییر نام فونت
                    // اصلاح انکودینگ: آخرین بخش را به 1 تغییر می‌دهیم
                    parts[parts.length - 1] = '1';
                    currentLine = parts.join(',');
                }
            } else if (inEventsSection && line.toLowerCase().startsWith('dialogue:')) {
                // --- START: اعمال هر دو قانون پاکسازی ---
                // ۱. حذف تگ \fn از داخل خط دیالوگ
                currentLine = line.replace(fnTagRegex, '');
                // ۲. حذف تگ \fsp از داخل خط دیالوگ
                currentLine = currentLine.replace(fspTagRegex, '');
                // --- END: اعمال هر دو قانون ---
            } else if (inFontsSection) {
                // تمام خطوط داخل بخش فونت قدیمی را نادیده می‌گیریм
                continue;
            }
            
            newLines.push(currentLine);
        }

        let finalContent = newLines.join('\r\n');
        finalContent = finalContent.replace(/\[Fonts\][\s\S]*/, '').trim();
        
        finalContent += '\r\n\r\n[Fonts]\r\n' + fontData;

        return finalContent;
    } catch (error) {
        console.error("خطا در پیوست کردن فونت:", error);
        alert("خطایی در فرآیند پیوست کردن فونت رخ داد. فایل زیرنویس بدون فونت پیوست‌شده دانلود خواهد شد.");
        return assContent;
    }
}

// === END: تابع نهایی ===
    
    function updateProgress(percentage, title) {
        const p = Math.min(100, Math.max(0, percentage));
        if (title) {
            progressTitle.textContent = title;
        }
        progressBarFill.style.width = `${p}%`;
        progressText.textContent = `${Math.round(p)}٪`;
    }

    function renderModels() {
        modelListDiv.innerHTML = '';
        models.forEach((model, index) => {
            const modelDiv = document.createElement('div');
            modelDiv.className = 'model-item';
            if (model.apiName === selectedModelApiName) modelDiv.classList.add('selected');
            modelDiv.innerHTML = `<div class="model-info"><span class="model-display-name">${model.displayName}</span><span class="model-api-name">${model.apiName}</span></div>${models.length > 1 ? `<button class="delete-model-btn" title="حذف مدل" data-index="${index}"><svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg></button>` : ''}`;
            modelDiv.addEventListener('click', (e) => { if (!e.target.closest('.delete-model-btn')) selectModel(model.apiName); });
            if (models.length > 1) {
                modelDiv.querySelector('.delete-model-btn').addEventListener('click', (e) => { e.stopPropagation(); deleteModel(index); });
            }
            modelListDiv.appendChild(modelDiv);
        });
    }
    function saveModels() { localStorage.setItem('userModels', JSON.stringify(models)); localStorage.setItem('selectedModel', selectedModelApiName); }
    function loadModels() { const savedModels = localStorage.getItem('userModels'); const savedSelected = localStorage.getItem('selectedModel'); models = savedModels && JSON.parse(savedModels).length > 0 ? JSON.parse(savedModels) : [{ displayName: 'Gemini 2.5 Pro', apiName: 'gemini-2.5-pro' }]; selectedModelApiName = savedSelected && models.some(m => m.apiName === savedSelected) ? savedSelected : models[0]?.apiName || ''; renderModels(); }
    function selectModel(apiName) { selectedModelApiName = apiName; saveModels(); renderModels(); }
    function addModel() { const displayName = prompt("یک نام نمایشی برای مدل وارد کنید (مثلا: Gemini Flash):"); if (!displayName) return; const apiName = prompt("نام دقیق API مدل را وارد کنید (مثلا: gemini-1.5-flash-latest):"); if (!apiName) return; if (models.some(m => m.apiName === apiName)) return alert("این مدل از قبل وجود دارد."); models.push({ displayName, apiName }); selectModel(apiName); }
    function deleteModel(index) { if (!confirm(`آیا از حذف مدل "${models[index].displayName}" مطمئن هستید؟`)) return; const deletedModelWasSelected = models[index].apiName === selectedModelApiName; models.splice(index, 1); if (deletedModelWasSelected && models.length > 0) { selectModel(models[0].apiName); } else { saveModels(); renderModels(); } }

    function renderPrompts() {
        promptListDiv.innerHTML = '';
        const defaultPromptDiv = document.createElement('div');
        defaultPromptDiv.className = 'prompt-item';
        if ('default' === selectedPromptId) defaultPromptDiv.classList.add('selected');
        defaultPromptDiv.innerHTML = `<div class="prompt-info"><span class="prompt-display-name">پرامپت پیش‌فرض زیرنویس انگلیسی</span><span class="prompt-type-name">(توصیه شده - غیرقابل ویرایش)</span></div>`;
        defaultPromptDiv.addEventListener('click', () => selectPrompt('default'));
        promptListDiv.appendChild(defaultPromptDiv);
        prompts.forEach((prompt) => {
            const promptDiv = document.createElement('div');
            promptDiv.className = 'prompt-item';
            if (prompt.id === selectedPromptId) promptDiv.classList.add('selected');
            promptDiv.innerHTML = `<div class="prompt-info"><span class="prompt-display-name">${prompt.name}</span><span class="prompt-type-name">سفارشی</span></div><button class="delete-model-btn" title="حذف پرامپت" data-id="${prompt.id}"><svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg></button>`;
            promptDiv.addEventListener('click', (e) => { if (!e.target.closest('.delete-model-btn')) selectPrompt(prompt.id); });
            promptDiv.querySelector('.delete-model-btn').addEventListener('click', (e) => { e.stopPropagation(); deletePrompt(prompt.id); });
            promptListDiv.appendChild(promptDiv);
        });
        updatePromptDisplay();
    }
    function updatePromptDisplay() { const isDefault = selectedPromptId === 'default'; promptDisplayArea.value = getActivePromptContent(); promptDisplayArea.readOnly = isDefault; }
    function getActivePromptContent() { if (selectedPromptId === 'default') { return DEFAULT_PROMPT; } const selected = prompts.find(p => p.id === selectedPromptId); return selected ? selected.content : DEFAULT_PROMPT; }
    function savePrompts() { localStorage.setItem('userPrompts', JSON.stringify(prompts)); localStorage.setItem('selectedPrompt', selectedPromptId); }
    function loadPrompts() { const savedPrompts = localStorage.getItem('userPrompts'); const savedSelected = localStorage.getItem('selectedPrompt'); prompts = savedPrompts ? JSON.parse(savedPrompts) : []; selectedPromptId = savedSelected || 'default'; renderPrompts(); }
    function selectPrompt(id) { selectedPromptId = id; savePrompts(); renderPrompts(); }
    function addPrompt() { const name = prompt("یک نام برای پرامپت سفارشی خود وارد کنید:"); if (!name || name.trim() === '') return; const newPrompt = { id: Date.now().toString(), name: name.trim(), content: `// پرامپت جدید برای "${name.trim()}"\n// محتوای خود را اینجا وارد کنید.` }; prompts.push(newPrompt); selectPrompt(newPrompt.id); }
    function deletePrompt(id) { const promptToDelete = prompts.find(p => p.id === id); if (!promptToDelete || !confirm(`آیا از حذف پرامپت "${promptToDelete.name}" مطمئن هستید؟`)) return; prompts = prompts.filter(p => p.id !== id); if (selectedPromptId === id) { selectPrompt('default'); } else { savePrompts(); renderPrompts(); } }
    function handlePromptEditing() { if (selectedPromptId === 'default') return; const currentPrompt = prompts.find(p => p.id === selectedPromptId); if (currentPrompt) { currentPrompt.content = promptDisplayArea.value; savePrompts(); } }
    function resetAllSettings() { if (confirm("هشدار! آیا مطمئن هستید که می‌خواهید تمام تنظیمات (کلید API، لیست مدل‌ها و پرامپت‌های سفارشی) را پاک کنید؟ این عمل غیرقابل بازگشت است.")) { localStorage.removeItem('geminiApiKey'); localStorage.removeItem('userModels'); localStorage.removeItem('selectedModel'); localStorage.removeItem('userPrompts'); localStorage.removeItem('selectedPrompt'); apiKeyInput.value = ''; loadModels(); loadPrompts(); checkFormValidity(); alert('تمام تنظیمات با موفقیت به حالت اولیه بازگردانده شد.'); } }

    //  توابع  برای مدیریت تنظیمات ایمنی
    function saveSafetySettings() {
        const settings = {
            harassment: safetyHarassmentToggle.checked,
            hateSpeech: safetyHateSpeechToggle.checked,
            sexuallyExplicit: safetySexuallyExplicitToggle.checked,
            dangerousContent: safetyDangerousContentToggle.checked
        };
        localStorage.setItem('safetySettings', JSON.stringify(settings));
    }

    function loadSafetySettings() {
        const savedSettings = localStorage.getItem('safetySettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            safetyHarassmentToggle.checked = settings.harassment || false;
            safetyHateSpeechToggle.checked = settings.hateSpeech || false;
            safetySexuallyExplicitToggle.checked = settings.sexuallyExplicit || false;
            safetyDangerousContentToggle.checked = settings.dangerousContent || false;
        }
        // اگر چیزی ذخیره نشده باشد، چک‌باکس‌ها به صورت پیش‌فرض تیک‌نخورده باقی می‌مانند.
    }
    //  توابع  برای مدیریت تنظیمات ایمنی
    
    function checkFormValidity() { translateBtn.disabled = !(uploadedFile && apiKeyInput.value.trim() !== ''); }
   async function handleFileSelect(file) {
    // --- START: Reset states for new file ---
    uploadedFile = null;
    fileNameDisplay.innerHTML = '';
    errorDisplay.classList.add('hidden');
    isAssInput = false;
    originalAssContent = '';
    document.getElementById('output-format-selector').classList.add('hidden');
    checkFormValidity();
    // --- END: Reset states ---

    if (!file) return;

    const fileName = file.name.toLowerCase();
    const supportedVideoFormats = ['.mkv', '.mp4'];
    const supportedSubtitleFormats = ['.srt', '.ass'];

    const handleAssInput = async (fileObject) => {
        isAssInput = true;
        originalAssContent = await fileObject.text();
        document.getElementById('output-format-selector').classList.remove('hidden');
    };

    if (supportedSubtitleFormats.some(ext => fileName.endsWith(ext))) {
        uploadedFile = file;
        const filenameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
        const fullFilename = `${filenameWithoutExt}${fileName.substring(file.name.lastIndexOf('.'))}`;
        fileNameDisplay.innerHTML = `فایل انتخاب شده:<br><span class="filename-text">${fullFilename}</span>`;
        
        if (fileName.endsWith('.ass')) {
            await handleAssInput(file);
        }
        checkFormValidity();

    } else if (supportedVideoFormats.some(ext => fileName.endsWith(ext))) {
        if (isMobile() && !isFirefox()) {
            alert("برای استخراج زیرنویس از فایل‌های ویدیویی (mkv, mp4) در موبایل، توصیه می‌شود از مرورگر Firefox استفاده کنید؛ چرا که سایر مرورگرها ممکن است از این قابلیت پشتیبانی نکنند.");
        }

        fileNameDisplay.innerHTML = `لطفاً کمی صبر کنید:<br><span class="filename-text">${file.name}</span>`;
        translateBtn.disabled = true;

        try {
            const result = await runFFprobeCommand(file, ['/data/' + file.name, '-print_format', 'json', '-show_streams', '-show_format']);
            const parsedResult = JSON.parse(result.stdout);
            if (!parsedResult.streams || parsedResult.streams.length === 0) throw new Error('هیچ ترکی در فایل ویدیویی یافت نشد.');

            const subtitleStreams = parsedResult.streams.filter(s => s.codec_type === 'subtitle' && (s.codec_name === 'subrip' || s.codec_name === 'ass'));
            if (subtitleStreams.length === 0) {
                alert('هیچ ترک زیرنویس با فرمت SRT یا ASS در این فایل ویدیویی یافت نشد.');
                fileNameDisplay.innerHTML = '';
                return;
            }

            const streamOptions = subtitleStreams.map((s, index) => {
                const lang = s.tags?.language || 'unk';
                const title = s.tags?.title ? `(${s.tags.title})` : '';
                return `${index + 1}. [${lang}] ${s.codec_name} ${title}`.trim();
            }).join('\n');
            
            let selectedIndex = -1;
            const promptMessage = `چندین ترک زیرنویس در فایل یافت شد. لطفاً شماره ترک مورد نظر را وارد کنید:\n\n${streamOptions}`;
            while (selectedIndex < 0 || selectedIndex >= subtitleStreams.length) {
                const input = prompt(promptMessage);
                if (input === null) { fileNameDisplay.innerHTML = ''; return; }
                selectedIndex = parseInt(input, 10) - 1;
                if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= subtitleStreams.length) {
                    alert('انتخاب نامعتبر. لطفاً یک شماره صحیح از لیست وارد کنید.');
                    selectedIndex = -1;
                }
            }

            const selectedStream = subtitleStreams[selectedIndex];

            if (selectedStream.codec_name === 'ass') {
                isAssInput = true;
                document.getElementById('output-format-selector').classList.remove('hidden');
            }

            uploadedFile = {
                file: file,
                streamIndex: selectedStream.index,
                type: selectedStream.codec_name,
                name: `${file.name.substring(0, file.name.lastIndexOf('.'))}.track${selectedStream.index}.${selectedStream.codec_name}`,
                duration: parseFloat(parsedResult.format?.duration || 0)
            };
            const trackInfo = `[${selectedStream.tags?.language || 'unk'}] (فرمت: ${selectedStream.codec_name})`;
            fileNameDisplay.innerHTML = `ترک انتخاب شده:<br><span class="filename-text">${trackInfo}</span>`;
            checkFormValidity();

        } catch (error) {
            console.error("Error processing video file:", error);
            errorMessage.textContent = `خطا در تحلیل فایل ویدیویی: ${error.message}`;
            errorDisplay.classList.remove('hidden');
            fileNameDisplay.innerHTML = '';
        }
    } else {
        alert('فرمت فایل پشتیبانی نمی‌شود. لطفاً یک فایل با فرمت .srt, .ass, .mkv, .mp4 انتخاب کنید.');
    }
}
   async function handleFetchError(response) {
    // ابتدا کل پاسخ را به صورت متن می‌خوانیم
    const errorText = await response.text();

    // 1. بررسی خطاهای HTML شناخته شده از سمت پراکسی (Cloudflare)
    if (errorText.trim().startsWith('<!DOCTYPE html>') || errorText.includes('</head>')) {
        if (errorText.includes('Error 524')) {
            return 'خطای Timeout از پراکسی (Error 524): به نظر می‌رسد پاسخ از سرور گوگل بیش از حد طول کشیده است. این مشکل معمولاً به دلیل کندی یا ناپایداری اینترنت شما رخ می‌دهد. لطفاً چند دقیقه دیگر یا با یک اینترنت قوی‌تر دوباره امتحان کنید.';
        }
        if (errorText.includes('Error 522')) {
            return 'خطای Connection Timeout از پراکسی (Error 522): پراکسی نتوانست به سرور گوگل متصل شود. لطفاً از فعال بودن فیلترشکن (در صورت عدم استفاده از پراکسی) یا پایداری اینترنت خود اطمینان حاصل کنید.';
        }
        if (errorText.includes('Error 520')) {
            return 'خطای ناشناخته از پراکسی (Error 520): پراکسی یک پاسخ نامعتبر از سرور گوگل دریافت کرده است. این یک خطای نادر است، لطفاً دوباره امتحان کنید.';
        }
        // اگر یک صفحه HTML دیگر بود که ما نمی‌شناسیم
        console.error("یک خطای HTML ناشناخته دریافت شد:", errorText);
        return 'یک خطای ناشناخته از سمت پراکسی دریافت شد. لطفاً وضعیت اینترنت و پراکسی را بررسی کنید.';
    }

    // 2. اگر HTML نبود، تلاش برای پارس کردن به عنوان خطای استاندارد JSON از API
    try {
        const errorJson = JSON.parse(errorText);
        // اگر پیام خطای مشخصی در JSON وجود داشت، آن را برمی‌گردانیم
        if (errorJson.error && errorJson.error.message) {
            return errorJson.error.message;
        }
        // اگر ساختار JSON متفاوت بود، کل آن را به صورت خوانا برمی‌گردانیم
        return `پاسخ JSON نامعتبر از سرور: ${JSON.stringify(errorJson, null, 2)}`;
    } catch (e) {
        // 3. اگر پاسخ نه HTML بود و نه JSON، به عنوان یک خطای متنی ساده با آن برخورد می‌کنیم
        // این حالت معمولاً برای خطاهای سطح پایین شبکه رخ می‌دهد
        console.error("یک خطای متنی غیرقابل پارس دریافت شد:", errorText);
        // فقط بخش کوچکی از متن را نمایش می‌دهیم تا صفحه به هم نریزد
        return `یک پاسخ غیرمنتظره از سرور دریافت شد: "${errorText.substring(0, 100)}..."`;
    }
   }

    function runFFprobeCommand(file, args) {
        return new Promise((resolve, reject) => {
            if (ffprobeWorker) ffprobeWorker.terminate();
            ffprobeWorker = new Worker('./ffprobe-worker-mkve.js');
            let stdout = '', stderr = '';
            ffprobeWorker.addEventListener('error', (e) => reject(new Error(`FFprobe Worker error: ${e.message}`)));
            ffprobeWorker.addEventListener('message', (e) => {
                const msg = e.data;
                switch (msg.type) {
                    case 'ready': ffprobeWorker.postMessage({ type: 'run', arguments: args, mounts: [{ type: 'WORKERFS', opts: { files: [file] }, mountpoint: '/data' }] }); break;
                    case 'stdout': stdout += msg.data + '\n'; break;
                    case 'stderr': stderr += msg.data + '\n'; break;
                    case 'done': ffprobeWorker.terminate(); ffprobeWorker = null; resolve({ stdout, stderr, files: msg.data.MEMFS }); break;
                }
            });
        });
    }
    
    function runFFmpegCommand(file, args, duration, onProgress) {
        return new Promise((resolve, reject) => {
            if (ffmpegWorker) ffmpegWorker.terminate();
            ffmpegWorker = new Worker('./ffmpeg-worker-mkve.js');
            let stdout = '', stderr = '';
            ffmpegWorker.addEventListener('error', (e) => reject(new Error(`FFmpeg Worker error: ${e.message}`)));
            ffmpegWorker.addEventListener('message', (e) => {
                const msg = e.data;
                switch (msg.type) {
                    case 'ready': ffmpegWorker.postMessage({ type: 'run', arguments: args, mounts: [{ type: 'WORKERFS', opts: { files: [file] }, mountpoint: '/data' }] }); break;
                    case 'stdout': stdout += msg.data + '\n'; break;
                    case 'stderr': 
                        stderr += msg.data + '\n';
                        if (duration > 0 && typeof onProgress === 'function') {
                            const timeMatch = msg.data.match(/time=(\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
                            if (timeMatch) {
                                const hours = parseInt(timeMatch[1], 10);
                                const minutes = parseInt(timeMatch[2], 10);
                                const seconds = parseInt(timeMatch[3], 10);
                                const centiseconds = parseInt(timeMatch[4], 10);
                                const currentTime = (hours * 3600) + (minutes * 60) + seconds + (centiseconds / 100);
                                const percentage = (currentTime / duration) * 100;
                                onProgress(percentage);
                            }
                        }
                        break;
                    case 'done': 
                        if(typeof onProgress === 'function') onProgress(100);
                        ffmpegWorker.terminate(); 
                        ffmpegWorker = null; 
                        resolve({ stdout, stderr, files: msg.data.MEMFS }); 
                        break;
                    case 'error': 
                        ffmpegWorker.terminate(); 
                        ffmpegWorker = null; 
                        reject(new Error(msg.data)); 
                        break;
                }
            });
        });
    }

    function uploadFileToGemini(processedText, originalFilename, apiKey, onProgress) {
        return new Promise((resolve, reject) => {
            progressTitle.textContent = "مرحله ۲ از ۴: آپلود فایل به سرور گوگل...";
            const formData = new FormData();
            const fileToUpload = new File([processedText], originalFilename, { type: 'text/plain' });
            formData.append('file', fileToUpload);
            // const url = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`;
              const proxyEnabled = document.getElementById('proxy-toggle').checked;
              const GEMINI_BASE_URL = proxyEnabled ? 'https://anime-translator-web.khalilkhko.workers.dev' : 'https://generativelanguage.googleapis.com';
              const url = `${GEMINI_BASE_URL}/upload/v1beta/files?key=${apiKey}`;
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && typeof onProgress === 'function') {
                    const percentage = (event.loaded / event.total) * 100;
                    onProgress(percentage);
                }
            };
            
            xhr.onload = async () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if(typeof onProgress === 'function') onProgress(100);
                    resolve(JSON.parse(xhr.responseText).file.uri);
                } else {
                    const errorMsg = await handleFetchError({ text: () => Promise.resolve(xhr.responseText) });
                    reject(new Error(`خطا در آپلود فایل: ${errorMsg}`));
                }
            };
            
            xhr.onerror = () => {
                reject(new Error('خطای شبکه هنگام آپلود فایل رخ داد.'));
            };
            
            xhr.send(formData);
        });
    }



async function getTranslationStream(fileUri, onChunk, onEnd, onError, abortSignal) {
    const apiKey = apiKeyInput.value.trim();
    
    const proxyEnabled = document.getElementById('proxy-toggle').checked;
    const GEMINI_BASE_URL = proxyEnabled ? 'https://anime-translator-web.khalilkhko.workers.dev' : 'https://generativelanguage.googleapis.com';
    const url = `${GEMINI_BASE_URL}/v1beta/models/${selectedModelApiName}:streamGenerateContent?alt=sse&key=${apiKey}`;

    try {
        const activePrompt = getActivePromptContent();
        const safetySettings = [];
        if (safetyHarassmentToggle.checked) safetySettings.push({ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" });
        if (safetyHateSpeechToggle.checked) safetySettings.push({ category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" });
        if (safetySexuallyExplicitToggle.checked) safetySettings.push({ category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" });
        if (safetyDangerousContentToggle.checked) safetySettings.push({ category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" });

        const requestBody = {
            contents: [{
                parts: [
                    { text: activePrompt },
                    { fileData: { mime_type: "text/plain", file_uri: fileUri } }
                ]
            }],
            generationConfig: {
                temperature: parseFloat(tempSlider.value),
                topP: parseFloat(topPSlider.value)
            }
        };

        if (safetySettings.length > 0) {
            requestBody.safetySettings = safetySettings;
        }

        console.log("درخواست ارسالی به API:", requestBody);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
            signal: abortSignal
        });
        
        if (!response.ok) throw new Error(await handleFetchError(response));
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        
        // --- START OF ROBUST STREAM HANDLING ---
        let buffer = ''; // بافر برای نگهداری داده‌های ناقص

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                // اگر در پایان کار چیزی در بافر مانده بود، آن را نیز پردازش کن
                if (buffer.startsWith('data: ')) {
                     try {
                        const jsonStr = buffer.substring(5);
                        const parsed = JSON.parse(jsonStr);
                        const textPart = parsed.candidates[0]?.content?.parts[0]?.text;
                        if (textPart) {
                            fullText += textPart;
                        }
                    } catch (e) { console.warn("Could not parse final buffer chunk:", buffer); }
                }
                break;
            }

            // بسته جدید را به بافر اضافه کرده و بر اساس خط جدید تقسیم می‌کنیم
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');

            // آخرین خط را در بافر نگه می‌داریم چون ممکن است ناقص باشد
            buffer = lines.pop(); 

            // حالا فقط خطوط کامل را پردازش می‌کنیم
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.substring(5);
                    try {
                        const parsed = JSON.parse(jsonStr);
                        const textPart = parsed.candidates[0]?.content?.parts[0]?.text;
                        if (textPart) {
                            fullText += textPart;
                            onChunk(fullText); // نمایش زنده را با متن کامل و انباشته شده به‌روز کن
                        }
                    } catch (e) { console.warn("Could not parse a JSON chunk:", jsonStr); }
                }
            }
        }
        // --- END OF ROBUST STREAM HANDLING ---

        onEnd(fullText); // پس از اتمام کامل استریم، متن نهایی را ارسال کن

    } catch(error) { 
        if (error.name === 'AbortError') {
            console.log('Fetch aborted by user.');
            throw error;
        }
        onError(error); 
    }
}
    function checkTranslationCompleteness(translatedMicroDVD, originalLastEndFrame) {
        const lines = translatedMicroDVD.split('\n');
        const lineRegex = /\{(\d+)\}\{(\d+)\}(.*)/;
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim();
            const match = line.match(lineRegex);
            if (match) {
                const translatedEndFrame = parseInt(match[2], 10);
                return translatedEndFrame === originalLastEndFrame;
            }
        }
        return false; 
    }
    
    // --- 5. اتصال Event Listener ها و اجرای اصلی ---
    
    apiKeyInput.addEventListener('input', () => { localStorage.setItem('geminiApiKey', apiKeyInput.value); checkFormValidity(); });
    const savedApiKey = localStorage.getItem('geminiApiKey'); if (savedApiKey) apiKeyInput.value = savedApiKey;
    
    addModelBtn.addEventListener('click', addModel);
    addPromptBtn.addEventListener('click', addPrompt);
    resetAllBtn.addEventListener('click', resetAllSettings);
    promptDisplayArea.addEventListener('input', handlePromptEditing);
    
    // START: اتصال Event Listener های تنظیمات ایمنی
    [safetyHarassmentToggle, safetyHateSpeechToggle, safetySexuallyExplicitToggle, safetyDangerousContentToggle].forEach(toggle => {
        toggle.addEventListener('change', saveSafetySettings);
    });
    // END: اتصال Event Listener های تنظیمات ایمنی
    
    tempSlider.addEventListener('input', (e) => tempValue.textContent = e.target.value);
    topPSlider.addEventListener('input', (e) => topPValue.textContent = e.target.value);
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) handleFileSelect(fileInput.files[0]);
    });

    
    toggleApiKeyVisibilityBtn.addEventListener('click', () => {
        const isPassword = apiKeyInput.type === 'password';
        
        if (isPassword) {
            apiKeyInput.type = 'text';
            eyeOpenIcon.style.display = 'none';
            eyeSlashedIcon.style.display = 'block';
        } else {
            apiKeyInput.type = 'password';
            eyeOpenIcon.style.display = 'block';
            eyeSlashedIcon.style.display = 'none';
        }
    });



       translateBtn.addEventListener('click', async () => {
    if (!uploadedFile || !apiKeyInput.value.trim()) return;

    progressSection.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    errorDisplay.classList.add('hidden');
    translationStatusMessage.classList.add('hidden');
    stopTranslationBtn.classList.remove('hidden');
    stopTranslationBtn.disabled = false;
    translateBtn.disabled = true;
    liveOutput.textContent = 'در حال آماده سازی...';
    translationStatusMessage.classList.remove('status-complete', 'status-incomplete', 'status-aborted');
    abortController = new AbortController();
    const signal = abortController.signal;

    clearInterval(thinkingPhaseTimer);
    thinkingPhaseTimer = null;
    
    try {
        let rawSubtitleContent = '';
        let outputFileNameBase = '';

        // --- فاز ۱: استخراج محتوا ---
        // اگر فایل از ویدیو آمده باشد، الان زمان استخراج است
        if (uploadedFile.streamIndex !== undefined) {
            const videoFile = uploadedFile.file;
            outputFileNameBase = videoFile.name.substring(0, videoFile.name.lastIndexOf('.'));
            
            // نمایش نوار پیشرفت "فاز استخراج"
            const onFfmpegProgress = (p) => {
                updateProgress(p, 'مرحله ۱ از ۴: استخراج زیرنویس از فایل ویدیویی...');
            };

            const outputFormat = uploadedFile.type === 'subrip' ? 'srt' : 'ass';
            const outputFilename = `output.${outputFormat}`;
            const ffmpegResult = await runFFmpegCommand(videoFile,
                ['-i', '/data/' + videoFile.name, '-map', `0:${uploadedFile.streamIndex}`, '-codec', 'copy', outputFilename],
                uploadedFile.duration, onFfmpegProgress
            );
            if (!ffmpegResult.files || ffmpegResult.files.length === 0) throw new Error('استخراج زیرنویس از فایل ویدیویی ناموفق بود.');
            
            rawSubtitleContent = await new Response(ffmpegResult.files[0].data).text();

            // اگر ترک استخراجی ASS بود، محتوای آن را برای مسیر ASS آماده می‌کنیم
            if (uploadedFile.type === 'ass') {
                originalAssContent = rawSubtitleContent;
            }
        } else {
            // اگر فایل مستقیم آپلود شده بود، محتوای آن را بخوان
            rawSubtitleContent = await uploadedFile.text();
            outputFileNameBase = uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.'));
        }
        
        // --- فاز ۲: پردازش محتوای استخراج شده ---
        const outputFormatChoice = document.querySelector('input[name="output-format"]:checked').value;
        const useAssPath = isAssInput && outputFormatChoice === 'ass';

        let microDVDContent = '';
        let assMapping = [];
        
        updateProgress(0, 'مرحله ۱ از ۴: پردازش فایل ورودی...');

        if (useAssPath) {
            // `originalAssContent` در هر دو حالت (مستقیم یا ویدیو) آماده است
            const processResult = processAssForTranslationAndMapping(originalAssContent);
            microDVDContent = processResult.microdvdForAI;
            assMapping = processResult.map;
            updateProgress(100, 'مرحله ۱ از ۴: پردازش فایل ورودی...');
        } else {
            // مسیر SRT (یا ASS به SRT)
            let cleanSrtContent = '';
            const sourceIsAss = isAssInput || (uploadedFile.type === 'ass');
            
            if (sourceIsAss) {
                updateProgress(50, 'مرحله ۱ از ۴: تبدیل ASS به SRT و حذف استایل‌ها...');
                cleanSrtContent = cleanAssToSrt(rawSubtitleContent);
            } else { 
                 cleanSrtContent = sortSrtContent(rawSubtitleContent);
            }
            updateProgress(100, 'مرحله ۱ از ۴: پردازش فایل ورودی...');

            if (!cleanSrtContent || cleanSrtContent.trim() === '') {
                 throw new Error("فایل زیرنویس پس از پردازش خالی است. ممکن است فرمت داخلی آن پشتیبانی نشود.");
            }
            microDVDContent = convertSrtToMicroDVD(cleanSrtContent);
        }
        
        if (!microDVDContent) throw new Error("فایل زیرنویس ورودی خالی است یا فرمت آن صحیح نیست.");
        
        originalMicroDVDLines = microDVDContent.split('\n').length;
        const microDVDLines = microDVDContent.split('\n');
        const lastOriginalLine = microDVDLines[microDVDLines.length - 1] || '';
        const originalLineMatch = lastOriginalLine.match(/\{(\d+)\}\{(\d+)\}(.*)/);
        originalLastEndFrame = originalLineMatch ? parseInt(originalLineMatch[2], 10) : 0;
        
        liveOutput.textContent = 'فایل پردازش شد. در حال آماده‌سازی برای آپلود...';

        const onUploadProgress = (p) => {
             updateProgress(p, 'مرحله ۲ از ۴: آپلود فایل زیرنویس به سرور گوگل...');
        };
        const fileUri = await uploadFileToGemini(microDVDContent, outputFileNameBase + '.txt', apiKeyInput.value.trim(), onUploadProgress);
        
        const thinkingStartTime = Date.now();
        const baseThinkingText = 'مرحلهٔ تفکر هوش‌مصنوعی، اتمام فرایند ممکن است چند دقیقه‌ای طول بکشد، لطفاً صبور باشید: ';
        liveOutput.textContent = baseThinkingText + '0.0 s';
        updateProgress(0, 'مرحله ۳ از ۴: هوش مصنوعی در حال تفکر است...');

        thinkingPhaseTimer = setInterval(() => {
            const elapsedTime = ((Date.now() - thinkingStartTime) / 1000).toFixed(1);
            liveOutput.textContent = baseThinkingText + `${elapsedTime} ثانیه`;
        }, 100);
        
        let isFirstChunk = true;
        const onChunkReceived = (currentFullText) => {
            if (isFirstChunk) {
                clearInterval(thinkingPhaseTimer);
                thinkingPhaseTimer = null;
                isFirstChunk = false;
                updateProgress(0, "مرحله ۴ از ۴: در حال دریافت ترجمه...");
            }
            const translatedLines = currentFullText.split('\n');
            liveOutput.textContent = translatedLines.map(line => (line.match(/\{(\d+)\}\{(\d+)\}(.*)/) || [])[3] || '').join('\n').replace(/\|/g, ' ');
            liveOutput.scrollTop = liveOutput.scrollHeight;
            const percentage = Math.min(99, Math.round((translatedLines.length / originalMicroDVDLines) * 100));
            updateProgress(percentage, "مرحله ۴ از ۴: در حال دریافت ترجمه...");
        };
        const onStreamEnd = (finalText) => {
            clearInterval(thinkingPhaseTimer);
            updateProgress(100, "ترجمه با موفقیت انجام شد!");
            
            if (useAssPath) {
                const translationLookup = createTranslationLookupMap(finalText);
                const rebuildResult = rebuildAssFromTranslation(originalAssContent, assMapping, translationLookup);
                translatedAssContent = rebuildResult.rebuiltAss;
                const untranslatedCount = rebuildResult.untranslatedCount;
                const styleFailures = rebuildResult.styleReplacementFailureCount; 
                
                const isComplete = checkTranslationCompleteness(finalText, originalLastEndFrame);

                let statusText = isComplete ? '✔️ ترجمه کامل است و استایل‌ها حفظ شده‌اند.' : '⚠️ ترجمه ممکن است ناقص باشد.';
                if (untranslatedCount > 0) {
                    statusText += ` (توجه: ترجمه ${untranslatedCount} خط یافت نشد.)`;
                }
                if (styleFailures > 0) {
                    statusText += `<br><small>(هشدار: بازسازی ${styleFailures} خط با استایل بسیار پیچیده با روش جایگزین انجام شد.)</small>`;
                }

                translationStatusMessage.innerHTML = statusText;
                translationStatusMessage.classList.add(isComplete ? 'status-complete' : 'status-incomplete');

            } else {
                const mergeResult = mergeTrustedFramesWithAiText(microDVDContent, finalText);
                translatedMicroDVDContent = mergeResult.mergedText;
                const isComplete = checkTranslationCompleteness(translatedMicroDVDContent, originalLastEndFrame);
                let statusText = isComplete ? '✔️ ترجمه کامل است.' : '⚠️ ترجمه ممکن است ناقص باشد.';
                if (mergeResult.untranslatedCount > 0) {
                    statusText += ` (توجه: ترجمه ${mergeResult.untranslatedCount} خط یافت نشد و از متن اصلی استفاده شد.)`;
                }
                translationStatusMessage.innerHTML = statusText;
                translationStatusMessage.classList.add(isComplete ? 'status-complete' : 'status-incomplete');
            }

            translationStatusMessage.classList.remove('hidden');
            downloadBtn.classList.remove('hidden');
            translateBtn.disabled = false;
            stopTranslationBtn.classList.add('hidden');
        };
        const onStreamError = (error) => { throw error; };

        await getTranslationStream(fileUri, onChunkReceived, onStreamEnd, onStreamError, signal);

    } catch (error) {
        clearInterval(thinkingPhaseTimer); 
        console.error(error);
        translateBtn.disabled = false;
        stopTranslationBtn.classList.add('hidden');
        downloadBtn.classList.add('hidden');
        progressTitle.textContent = 'خطا در ترجمه!';
        progressBarFill.style.width = '0%';
        progressText.textContent = '۰٪';
        liveOutput.textContent = '';
        translationStatusMessage.classList.remove('hidden', 'status-complete');
        translationStatusMessage.classList.add('status-incomplete', 'status-aborted');

        let userFriendlyMessage = '';
        const errorMessageText = error.message || 'خطایی نامشخص رخ داد.';

        if (error.name === 'AbortError') {
            userFriendlyMessage = '<p>عملیات ترجمه توسط کاربر متوقف شد.</p>';
            translationStatusMessage.innerHTML = '❌ ترجمه توسط کاربر متوقف شد.';
        } else if (errorMessageText.toLowerCase().includes('location') || errorMessageText.toLowerCase().includes('permission denied')) {
            userFriendlyMessage = `<p class="error-subtitle"><b>خطا در دسترسی (مشکل تحریم یا فیلترشکن).</b></p><pre>${errorMessageText}</pre><p>این خطا به این معنی است که سرورهای گوگل به دلیل موقعیت جغرافیایی شما، اجازه دسترسی نمی‌دهند.</p><p class="error-solution-title"><b>راه حل پیشنهادی:</b></p><ol><li>از روشن و فعال بودن <b>فیلترشکن قوی</b> خود اطمینان حاصل کنید.</li><li>اگر فیلترشکن شما روشن است اما همچنان این خطا را می‌بینید، لطفاً <b>فیلترشکن خود را تغییر دهید</b> یا از یک سرور دیگر در آن استفاده کنید.</li></ol>`;
            translationStatusMessage.innerHTML = '❌ خطای دسترسی/فیلترشکن.';
        } else if (errorMessageText.toLowerCase().includes('networkerror')) {
            userFriendlyMessage = `<p class="error-subtitle"><b>خطای شبکه (NetworkError).</b></p><pre>${errorMessageText}</pre><p>این خطا معمولاً به دلیل ناپایداری اتصال اینترنت یا فیلترشکن شما رخ می‌دهد.</p><p class="error-solution-title"><b>راه حل پیشنهادی:</b></p><ol><li>از اتصال پایدار اینترنت خود مطمئن شوید.</li><li>فیلترشکن خود را یک بار قطع و وصل کرده یا از یک سرور/فیلترشکن دیگر که پایدارتر است، استفاده کنید.</li></ol>`;
            translationStatusMessage.innerHTML = '❌ خطای شبکه.';
        } else if (errorMessageText.toLowerCase().includes('overloaded') || errorMessageText.includes('503')) {
            userFriendlyMessage = `<p class="error-subtitle"><b>خطای موقتی از سوی سرور گوگل (Overloaded)</b></p><pre>${errorMessageText}</pre><p>این خطا معمولاً به دلیل ترافیک بسیار بالای لحظه‌ای روی سرورهای گوگل رخ می‌دهد.</p><p class="error-solution-title"><b>راه حل پیشنهادی:</b></p><ol><li>چند دقیقه صبر کرده و دوباره امتحان کنید.</li><li>اگر مشکل تکرار شد، ممکن است به دلیل پیچیدگی خاص فایل شما باشد. لطفاً فایل زیرنویس را به صورت دستی (با نرم‌افزار Subtitle Edit) به فرمت <b>.srt</b> تبدیل کرده و سپس آن را در برنامه انتخاب کنید.</li></ol>`;
            translationStatusMessage.innerHTML = '❌ خطای موقتی سرور.';
        } else if (proxyToggle.checked && errorMessageText.toLowerCase().includes('stream')) {
            userFriendlyMessage = `<p class="error-subtitle"><b>خطای دریافت ترجمه از پراکسی (Stream Error).</b></p><pre>${errorMessageText}</pre><p>این خطا معمولاً زمانی رخ می‌دهد که پراکسی فعال است و ارتباط شما با آن به دلیل ناپایداری اینترنت یا فیلترشکن دچار اختلال می‌شود.</p><p class="error-solution-title"><b>راه حل پیشنهادی:</b></p><ol><li>از اتصال پایدار اینترنت خود مطمئن شوید.</li><li>اگر از فیلترشکن همزمان با پراکسی استفاده می‌کنید، آن را موقتاً خاموش کرده و دوباره امتحان کنید (پراکسی خودش کار فیلترشکن را انجام می‌دهد).</li><li>اگر مشکل ادامه داشت، چند دقیقه بعد دوباره امتحان کنید.</li></ol>`;
            translationStatusMessage.innerHTML = '❌ خطای پراکسی/استریم.';
        } else if (errorMessageText.toLowerCase().includes('api key not valid')) {
            userFriendlyMessage = `<p class="error-subtitle"><b>کلید API نامعتبر است.</b></p><pre>${errorMessageText}</pre><p>لطفاً مطمئن شوید که کلید API را به درستی از <a href="https://aistudio.google.com/apikey" target="_blank">Google AI Studio</a> کپی کرده و در کادر مربوطه وارد کرده‌اید.</p><p>همچنین به یاد داشته باشید که فیلترشکن شما باید در تمام مراحل روشن باشد.</p>`;
            translationStatusMessage.innerHTML = '❌ کلید API نامعتبر.';
        } else {
            userFriendlyMessage = `<b>یک خطای پیش‌بینی‌نشده رخ داد:</b><pre>${errorMessageText}</pre>`;
            translationStatusMessage.innerHTML = '❌ خطایی در ترجمه رخ داد.';
        }
        errorMessage.innerHTML = userFriendlyMessage;
        errorDisplay.classList.remove('hidden');
    }
});


    stopTranslationBtn.addEventListener('click', () => {
        if (abortController) {
            abortController.abort();
            stopTranslationBtn.disabled = true;
            progressTitle.textContent = 'در حال توقف...';
        }
    });

        downloadBtn.addEventListener('click', async () => { // <<-- تابع async شد
        incrementCounter('downloadfile');

        const outputFormatChoice = document.querySelector('input[name="output-format"]:checked').value;
        const useAssPath = isAssInput && outputFormatChoice === 'ass';

        let finalContent, fileExtension, mimeType;

        if (useAssPath) {
            if (!translatedAssContent) return;
            // --- START: فراخوانی تابع نهایی‌سازی ---
            finalContent = await finalizeAssFile(translatedAssContent);
            // --- END: فراخوانی تابع نهایی‌سازی ---
            fileExtension = 'fa.ass';
            mimeType = 'text/plain;charset=utf-8';
        } else {
            if (!translatedMicroDVDContent) return;
            finalContent = convertMicroDVDtoSrt(translatedMicroDVDContent);
            fileExtension = 'fa.srt';
            mimeType = 'application/x-subrip;charset=utf-8';
        }
        
        let originalFilename;
        if (uploadedFile.streamIndex !== undefined) {
            originalFilename = uploadedFile.file.name;
        } else {
            originalFilename = uploadedFile.name;
        }
        
        const lastDotIndex = originalFilename.lastIndexOf('.');
        const filenameWithoutExt = (lastDotIndex === -1) ? originalFilename : originalFilename.substring(0, lastDotIndex);
        const newFilename = `${filenameWithoutExt}.${fileExtension}`;
        
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, finalContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = newFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

       // بارگذاری اولیه
    loadModels();
    loadPrompts();
     loadSafetySettings();
    checkFormValidity();

    // --- START: Add mobile-specific tooltip text ---
    if (isMobile()) {
        const uploadTooltip = document.querySelector('#upload-section .help-tooltip-text');
        if (uploadTooltip) {
            uploadTooltip.innerHTML += '<br><br><b>نکته برای کاربران موبایل:</b> برای استخراج زیرنویس از فایل‌های ویدیویی (mkv, mp4)، توصیه می‌شود از مرورگر Firefox استفاده کنید؛ چرا که سایر مرورگرها ممکن است از این قابلیت پشتیبانی نکنند.';
        }
    }
     // فراخوانی توابع برای نمایش آمار و شمارش بازدید
    displayStats();
      
    // --- END: Add mobile-specific tooltip text ---

   
});
