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
*   حفظ کاراکتر \`|\`: در صورت وجود کاراکتر پایپ‌لاین (\`|\`) در متن اصلی، این کاراکتر باید بدون هیچ تغییری در متن ترجمه‌شده نیز حفظ شود.

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
        const normalizedContent = srtContent.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
        const srtBlockRegex = /(\d+)\s*\n(\d{2}:\d{2}:\d{2},\d{3})\s+-->\s+(\d{2}:\d{2}:\d{2},\d{3})\s*\n([\s\S]+?)(?=\n\n|\n*$)/g;
        let microDVD = '';
        let match;
        while ((match = srtBlockRegex.exec(normalizedContent)) !== null) {
            const startTime = match[2];
            const endTime = match[3];
            let text = match[4].trim().replace(/\n/g, '|');
            const startFrame = timeToFrames(startTime, fps);
            const endFrame = timeToFrames(endTime, fps);
            microDVD += `{${startFrame}}{${endFrame}}${text}\n`;
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

 



function cleanAssToSrt(assContent) {
    const assDialoguePattern = /^Dialogue:\s*([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([\s\S]*)$/;

    const cleanTextFromAss = (text) => {
        if (!text) return '';
        return text.replace(/\{[^}]*}/g, '').replace(/\\N/g, '\r\n').trim();
    };

    const formatTimeToSrt = (assTime) => {
        const parts = assTime.match(/(\d):(\d{2}):(\d{2})\.(\d{2})/);
        if (!parts) return "00:00:00,000";
        const h = parts[1].padStart(2, '0');
        const m = parts[2];
        const s = parts[3];
        const ms = parseInt(parts[4], 10) * 10;
        return `${h}:${m}:${s},${ms.toString().padStart(3, '0')}`;
    };

    const lines = assContent.split('\n');
    let srtOutput = '';
    let srtIndex = 1;

    for (const line of lines) {
        const match = line.trim().match(assDialoguePattern);

        if (match) {
            // <<< بخش کلیدی جدید: فیلتر کردن بر اساس نام کاراکتر >>>
            const actorName = match[5].trim().toUpperCase();
            // اگر نام کاراکتر "TEXT" یا موارد مشابه بود، آن را نادیده می‌گیریم.
            // این‌ها معمولاً برای نوشته‌های روی تصویر استفاده می‌شوند.
            if (actorName === 'TEXT' || actorName === 'SIGN') {
                continue; // این خط را رد کن و به خط بعدی برو
            }
            // <<< پایان بخش جدید >>>

            const startTime = match[2];
            const endTime = match[3];
            const textPart = match[10];

            const cleanedText = cleanTextFromAss(textPart);

            if (cleanedText) {
                const srtStartTime = formatTimeToSrt(startTime);
                const srtEndTime = formatTimeToSrt(endTime);
                srtOutput += `${srtIndex}\r\n`;
                srtOutput += `${srtStartTime} --> ${srtEndTime}\r\n`;
                srtOutput += `${cleanedText}\r\n\r\n`;
                srtIndex++;
            }
        }
    }

    return srtOutput.trim();
}


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
    const visitsElement = document.getElementById('visits-counter');
    const downloadsElement = document.getElementById('downloads-counter');
    if (!visitsElement || !downloadsElement) return;

    try {
        const [visitsResponse, downloadsResponse] = await Promise.all([
            fetch(`${COUNTER_API_PROXY_URL}/v1/anime-translator-project/visitspages`),
            fetch(`${COUNTER_API_PROXY_URL}/v1/anime-translator-project/downloadfile`)
        ]);

        const visitsData = await visitsResponse.json();
        const downloadsData = await downloadsResponse.json();

        visitsElement.textContent = (visitsData.count || 0).toLocaleString('fa-IR');
        downloadsElement.textContent = (downloadsData.count || 0).toLocaleString('fa-IR');

    } catch (error) {
        console.error("Could not fetch stats:", error);
        visitsElement.textContent = 'N/A';
        downloadsElement.textContent = 'N/A';
    }
}


    
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
    
    function checkFormValidity() { translateBtn.disabled = !(uploadedFile && apiKeyInput.value.trim() !== ''); }
             async function handleFileSelect(file) {
        uploadedFile = null;
        fileNameDisplay.innerHTML = ''; // Changed from textContent
        errorDisplay.classList.add('hidden');
        checkFormValidity();

        if (!file) return;

        const fileName = file.name.toLowerCase();
        const supportedVideoFormats = ['.mkv', '.mp4'];
        const supportedSubtitleFormats = ['.srt', '.ass'];

        if (supportedSubtitleFormats.some(ext => fileName.endsWith(ext))) {
            uploadedFile = file;
            const filenameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
            const fullFilename = `${filenameWithoutExt}${fileName.substring(file.name.lastIndexOf('.'))}`;
            fileNameDisplay.innerHTML = `فایل انتخاب شده:<br><span class="filename-text">${fullFilename}</span>`; // Use innerHTML
            checkFormValidity();
        } else if (supportedVideoFormats.some(ext => fileName.endsWith(ext))) {
            // --- START: Added mobile browser check ---
            if (isMobile() && !isFirefox()) {
                alert("برای استخراج زیرنویس از فایل‌های ویدیویی (mkv, mp4) در موبایل، توصیه می‌شود از مرورگر Firefox استفاده کنید؛ چرا که سایر مرورگرها ممکن است از این قابلیت پشتیبانی نکنند.");
            }
             // --- END: Added mobile browser check ---

            fileNameDisplay.innerHTML = `لطفاً کمی صبر کنید:<br><span class="filename-text">${file.name}</span>`;
            translateBtn.disabled = true;

            try {
                const result = await runFFprobeCommand(file, ['/data/' + file.name, '-print_format', 'json', '-show_streams', '-show_format']);
                const parsedResult = JSON.parse(result.stdout);
                if (!parsedResult.streams || parsedResult.streams.length === 0) throw new Error('هیچ ترکی در فایل ویدیویی یافت نشد.');

                const subtitleStreams = parsedResult.streams.filter(s => s.codec_type === 'subtitle');
                if (subtitleStreams.length === 0) {
                    alert('هیچ ترک زیرنویسی در این فایل ویدیویی یافت نشد.');
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
                uploadedFile = {
                    file: file,
                    streamIndex: selectedStream.index,
                    type: selectedStream.codec_name,
                    name: `${file.name.substring(0, file.name.lastIndexOf('.'))}.track${selectedStream.index}.${selectedStream.codec_name}`,
                    duration: parseFloat(parsedResult.format?.duration || 0)
                };
                const trackInfo = `[${selectedStream.tags?.language || 'unk'}] (فرمت: ${selectedStream.codec_name})`;
                fileNameDisplay.innerHTML = `ترک انتخاب شده:<br><span class="filename-text">${trackInfo}</span>`; // Use innerHTML
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
    async function handleFetchError(response) { const errorText = await response.text(); try { return JSON.parse(errorText).error?.message || errorText; } catch (e) { return errorText; } }

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
            const url = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`;
            
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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModelApiName}:streamGenerateContent?alt=sse&key=${apiKey}`;
    try {
        const activePrompt = getActivePromptContent();

        // بدنه کامل درخواست را در یک متغیر جداگانه ایجاد می‌کنیم تا خواناتر باشد
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
            },

            // <<< بخش کلیدی که اضافه می‌شود >>>
            // این تنظیمات به API می‌گوید فیلترهای ایمنی را برای این درخواست نادیده بگیرد.
            // توجه: من دابل {} را به سینتکس صحیح جاوااسکریپت تبدیل کرده‌ام.
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_NONE"
                }
            ]
            // <<< پایان بخش اضافه شده >>>
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody), // از متغیر requestBody استفاده می‌کنیم
            signal: abortSignal
        });

        if (!response.ok) throw new Error(await handleFetchError(response));
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.substring(5);
                    try {
                        const parsed = JSON.parse(jsonStr);
                        const textPart = parsed.candidates[0]?.content?.parts[0]?.text;
                        if (textPart) {
                            fullText += textPart;
                            onChunk(fullText);
                        }
                    } catch (e) { console.warn("Could not parse a JSON chunk:", jsonStr); }
                }
            }
        }
        onEnd(fullText);
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

        // START: Clear any previous thinking timer
        clearInterval(thinkingPhaseTimer);
        thinkingPhaseTimer = null;
        // END: Clear timer
        
        try {
            let cleanSrtContent = '';
            let outputFileNameBase = '';
            
            updateProgress(0, 'مرحله ۱ از ۴: پردازش فایل ورودی...');

            if (uploadedFile.streamIndex !== undefined) { 
                const videoFile = uploadedFile.file;
                outputFileNameBase = videoFile.name.substring(0, videoFile.name.lastIndexOf('.'));
                
                const onFfmpegProgress = (p) => {
                    updateProgress(p, 'مرحله ۱ از ۴: استخراج زیرنویس از فایل ویدیویی...');
                };

                const outputFormat = uploadedFile.type === 'subrip' ? 'srt' : 'ass';
                const outputFilename = `output.${outputFormat}`;
                const ffmpegResult = await runFFmpegCommand(videoFile, 
                    [
                        '-i', '/data/' + videoFile.name,
                        '-map', `0:${uploadedFile.streamIndex}`,
                        '-codec', 'copy',
                        outputFilename
                    ], 
                    uploadedFile.duration, 
                    onFfmpegProgress
                );

                if (!ffmpegResult.files || ffmpegResult.files.length === 0) {
                    throw new Error(`استخراج زیرنویس از فایل ویدیویی ناموفق بود. خطای داخلی FFmpeg:\n${ffmpegResult.stderr}`);
                }
                
                const rawSubtitleContent = await new Response(ffmpegResult.files[0].data).text();
                
                if (outputFormat === 'ass') {
                    updateProgress(100, 'مرحله ۱ از ۴: تبدیل ASS به SRT و حذف استایل‌ها...');
                    cleanSrtContent = cleanAssToSrt(rawSubtitleContent);
                } else {
                    cleanSrtContent = rawSubtitleContent;
                }

            } else { 
                outputFileNameBase = uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.'));
                const fileContent = await uploadedFile.text();
                if (uploadedFile.name.toLowerCase().endsWith('.ass')) {
                    updateProgress(50, 'مرحله ۱ از ۴: تبدیل ASS به SRT و حذف استایل‌ها...');
                    cleanSrtContent = cleanAssToSrt(fileContent);
                } else { 
                    cleanSrtContent = fileContent;
                }
                updateProgress(100, 'مرحله ۱ از ۴: پردازش فایل ورودی...');
            }
            
            if (!cleanSrtContent || cleanSrtContent.trim() === '') {
                 throw new Error("فایل زیرنویس پس از پردازش خالی است. ممکن است فرمت داخلی آن پشتیبانی نشود.");
            }

            const microDVDContent = convertSrtToMicroDVD(cleanSrtContent);
            if (!microDVDContent) throw new Error("فایل زیرنویس ورودی خالی است یا فرمت آن صحیح نیست.");
            
            originalMicroDVDLines = microDVDContent.split('\n').length;
            const microDVDLines = microDVDContent.split('\n');
            const lastOriginalLine = microDVDLines[microDVDLines.length - 1] || '';
            const originalLineMatch = lastOriginalLine.match(/\{(\d+)\}\{(\d+)\}(.*)/);
            originalLastEndFrame = originalLineMatch ? parseInt(originalLineMatch[2], 10) : 0;
            
            liveOutput.textContent = 'فایل پردازش شد. در حال آماده‌سازی برای آپلود...';

            // --- Stage 2: Upload ---
            updateProgress(0, 'مرحله ۲ از ۴: آپلود فایل به سرور گوگل...');
            const onUploadProgress = (p) => {
                 updateProgress(p, 'مرحله ۲ از ۴: آپلود فایل زیرنویس به سرور گوگل...');
            };
            const fileUri = await uploadFileToGemini(microDVDContent, outputFileNameBase + '.txt', apiKeyInput.value.trim(), onUploadProgress);
            
            // --- START: Thinking Phase with Timer ---
            const thinkingStartTime = Date.now();
            const baseThinkingText = 'مرحلهٔ تفکر هوش‌مصنوعی، اتمام فرایند ممکن است چند دقیقه‌ای طول بکشد، لطفاً صبور باشید: ';
            liveOutput.textContent = baseThinkingText + '0.0 s';
            updateProgress(0, 'مرحله ۳ از ۴: هوش مصنوعی در حال تفکر است...');

            thinkingPhaseTimer = setInterval(() => {
                const elapsedTime = ((Date.now() - thinkingStartTime) / 1000).toFixed(1);
                liveOutput.textContent = baseThinkingText + `${elapsedTime} ثانیه`;
            }, 100);
            // --- END: Thinking Phase with Timer ---
            
            // --- Stage 3 & 4: Get Translation Stream ---
            let isFirstChunk = true;
            const onChunkReceived = (currentFullText) => {
                // START: Stop the thinking timer on first chunk
                if (isFirstChunk) {
                    clearInterval(thinkingPhaseTimer);
                    thinkingPhaseTimer = null;
                    isFirstChunk = false;
                    // Now, start the real progress for streaming
                    updateProgress(0, "مرحله ۴ از ۴: در حال دریافت ترجمه...");
                }
                // END: Stop timer

                const translatedLines = currentFullText.split('\n');
                liveOutput.textContent = translatedLines.map(line => (line.match(/\{(\d+)\}\{(\d+)\}(.*)/) || [])[3] || '').join('\n').replace(/\|/g, ' ');
                liveOutput.scrollTop = liveOutput.scrollHeight;
                const percentage = Math.min(99, Math.round((translatedLines.length / originalMicroDVDLines) * 100));
                updateProgress(percentage, "مرحله ۴ از ۴: در حال دریافت ترجمه...");
            };
            const onStreamEnd = (finalText) => {
                clearInterval(thinkingPhaseTimer); // Ensure it's cleared if stream ends
                updateProgress(100, "ترجمه با موفقیت انجام شد!");
                translatedMicroDVDContent = finalText;
                const isComplete = checkTranslationCompleteness(translatedMicroDVDContent, originalLastEndFrame);
                translationStatusMessage.classList.remove('hidden', 'status-incomplete', 'status-aborted');
                if (isComplete) {
                    translationStatusMessage.classList.add('status-complete');
                    translationStatusMessage.innerHTML = '✔️ ترجمه کامل است.';
                } else {
                    translationStatusMessage.classList.add('status-incomplete');
                    translationStatusMessage.innerHTML = '⚠️ ترجمه ممکن است ناقص باشد.';
                }
                downloadBtn.classList.remove('hidden');
                translateBtn.disabled = false;
                stopTranslationBtn.classList.add('hidden');
            };
            const onStreamError = (error) => { throw error; };

            await getTranslationStream(fileUri, onChunkReceived, onStreamEnd, onStreamError, signal);




// ====================================================================================
// <<<< این بلوک کامل و اصلاح شده را جایگزین بلوک catch فعلی خود کنید >>>>
// ====================================================================================
} catch (error) {
    // مرحله ۱: پاکسازی و بازگرداندن UI به حالت اولیه، صرف نظر از نوع خطا
    clearInterval(thinkingPhaseTimer); 
    console.error(error); // نمایش خطای فنی در کنسول برای دیباگ
    translateBtn.disabled = false;
    stopTranslationBtn.classList.add('hidden');
    downloadBtn.classList.add('hidden');
    progressTitle.textContent = 'خطا در ترجمه!';
    progressBarFill.style.width = '0%';
    progressText.textContent = '۰٪';
    liveOutput.textContent = '';
    translationStatusMessage.classList.remove('hidden', 'status-complete');
    translationStatusMessage.classList.add('status-incomplete', 'status-aborted');

    // مرحله ۲: تشخیص نوع خطا و ساختن پیام مناسب برای کاربر
    let userFriendlyMessage = '';
    const errorMessageText = error.message || 'خطایی نامشخص رخ داد.';

    if (error.name === 'AbortError') {
        // حالت اول: کاربر عملیات را متوقف کرده است
        userFriendlyMessage = '<p>عملیات ترجمه توسط کاربر متوقف شد.</p>';
        translationStatusMessage.innerHTML = '❌ ترجمه توسط کاربر متوقف شد.';

    } else if (errorMessageText.toLowerCase().includes('location') || errorMessageText.toLowerCase().includes('permission denied')) {
        // حالت دوم: خطای دسترسی به دلیل تحریم یا فیلترشکن
        userFriendlyMessage = `
            <p class="error-subtitle"><b>خطا در دسترسی (مشکل تحریم یا فیلترشکن).</b></p>
            <pre>${errorMessageText}</pre> 
            <p>این خطا به این معنی است که سرورهای گوگل به دلیل موقعیت جغرافیایی شما، اجازه دسترسی نمی‌دهند.</p>
            <p class="error-solution-title"><b>راه حل پیشنهادی:</b></p>
            <ol>
                <li>از روشن و فعال بودن <b>فیلترشکن قوی</b> خود اطمینان حاصل کنید.</li>
                <li>اگر فیلترشکن شما روشن است اما همچنان این خطا را می‌بینید، ممکن است دچار "نشت آی‌پی" (IP Leak) شده باشد. لطفاً <b>فیلترشکن خود را تغییر دهید</b> یا از یک سرور دیگر در آن استفاده کنید.</li>
            </ol>
        `;
        translationStatusMessage.innerHTML = '❌ خطای دسترسی/فیلترشکن.';

    } else if (errorMessageText.toLowerCase().includes('overloaded') || errorMessageText.includes('503')) {
        // حالت سوم: سرورهای گوگل موقتاً شلوغ هستند
        userFriendlyMessage = `
            <p class="error-subtitle"><b>خطای موقتی از سوی سرور گوگل (Overloaded)</b></p>
            <pre>${errorMessageText}</pre>
            <p>این خطا معمولاً به دلیل ترافیک بسیار بالای لحظه‌ای روی سرورهای گوگل رخ می‌دهد.</p>
            <p class="error-solution-title"><b>راه حل پیشنهادی:</b></p>
            <ol>
                <li>چند دقیقه صبر کرده و دوباره امتحان کنید.</li>
                <li>اگر مشکل تکرار شد، ممکن است به دلیل پیچیدگی خاص فایل شما باشد. لطفاً فایل زیرنویس را به صورت دستی (با نرم‌افزار Subtitle Edit) به فرمت <b>.srt</b> تبدیل کرده و سپس آن را در برنامه انتخاب کنید.</li>
            </ol>
        `;
        translationStatusMessage.innerHTML = '❌ خطای موقتی سرور.';

    } else if (errorMessageText.toLowerCase().includes('api key not valid')) {
        // حالت چهارم: کلید API نامعتبر است
        userFriendlyMessage = `
            <p class="error-subtitle"><b>کلید API نامعتبر است.</b></p>
            <pre>${errorMessageText}</pre>
            <p>لطفاً مطمئن شوید که کلید API را به درستی از <a href="https://aistudio.google.com/apikey" target="_blank">Google AI Studio</a> کپی کرده و در کادر مربوطه وارد کرده‌اید.</p>
            <p>همچنین به یاد داشته باشید که فیلترشکن شما باید در تمام مراحل روشن باشد.</p>
        `;
        translationStatusMessage.innerHTML = '❌ کلید API نامعتبر.';

    } else {
        // حالت پنجم: سایر خطاهای پیش‌بینی نشده (این بخش از قبل درست بود)
        userFriendlyMessage = `<b>یک خطای پیش‌بینی‌نشده رخ داد:</b><pre>${errorMessageText}</pre>`;
        translationStatusMessage.innerHTML = '❌ خطایی در ترجمه رخ داد.';
    }

    // مرحله ۳: نمایش پیام نهایی در صفحه
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

    downloadBtn.addEventListener('click', () => {
        if (!translatedMicroDVDContent) return;
          incrementCounter('downloadfile');
        const finalSrtContent = convertMicroDVDtoSrt(translatedMicroDVDContent);
        
        let originalFilename;
        if (uploadedFile.streamIndex !== undefined) {
            originalFilename = uploadedFile.file.name;
        } else {
            originalFilename = uploadedFile.name;
        }
        
        const lastDotIndex = originalFilename.lastIndexOf('.');
        const filenameWithoutExt = (lastDotIndex === -1) ? originalFilename : originalFilename.substring(0, lastDotIndex);
        const newFilename = `${filenameWithoutExt}.fa.srt`;
        
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, finalSrtContent], { type: 'application/x-subrip;charset=utf-8' });
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
      incrementCounter('visitspages');
    // --- END: Add mobile-specific tooltip text ---
});
