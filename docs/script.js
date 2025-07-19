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

    // --- 2. ثابت‌ها و متغیرهای اصلی ---
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

    // --- 3. توابع تبدیل فرمت (بدون تغییر) ---
    function timeToFrames(time, fps) {
        const parts = time.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
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
                text = text.replace(/\|/g, '\r\n');
                const rtlFixedText = '\u202B' + text.trim() + '\u202C';
                srt += `${index}\r\n${startTime} --> ${endTime}\r\n${rtlFixedText}\r\n\r\n`;
                index++;
            }
        }
        return srt;
    }

    // --- 4. توابع مدیریت برنامه ---

    // مدیریت مدل‌ها (بدون تغییر)
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

    // مدیریت پرامپت‌ها (منطق جدید)
    function renderPrompts() {
        promptListDiv.innerHTML = '';
        // افزودن پرامپت پیش‌فرض
        const defaultPromptDiv = document.createElement('div');
        defaultPromptDiv.className = 'prompt-item';
        if ('default' === selectedPromptId) defaultPromptDiv.classList.add('selected');
        defaultPromptDiv.innerHTML = `<div class="prompt-info"><span class="prompt-display-name">پرامپت پیش‌فرض</span><span class="prompt-type-name">(توصیه شده - غیرقابل ویرایش)</span></div>`;
        defaultPromptDiv.addEventListener('click', () => selectPrompt('default'));
        promptListDiv.appendChild(defaultPromptDiv);

        // افزودن پرامپت‌های سفارشی
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
    
    function updatePromptDisplay() {
        const isDefault = selectedPromptId === 'default';
        promptDisplayArea.value = getActivePromptContent();
        promptDisplayArea.readOnly = isDefault;
    }

    function getActivePromptContent() {
        if (selectedPromptId === 'default') {
            return DEFAULT_PROMPT;
        }
        const selected = prompts.find(p => p.id === selectedPromptId);
        return selected ? selected.content : DEFAULT_PROMPT;
    }

    function savePrompts() { localStorage.setItem('userPrompts', JSON.stringify(prompts)); localStorage.setItem('selectedPrompt', selectedPromptId); }
    
    function loadPrompts() { 
        const savedPrompts = localStorage.getItem('userPrompts'); 
        const savedSelected = localStorage.getItem('selectedPrompt'); 
        prompts = savedPrompts ? JSON.parse(savedPrompts) : []; 
        selectedPromptId = savedSelected || 'default'; 
        renderPrompts(); 
    }

    function selectPrompt(id) { 
        selectedPromptId = id; 
        savePrompts(); 
        renderPrompts(); 
    }
    
    function addPrompt() {
        const name = prompt("یک نام برای پرامپت سفارشی خود وارد کنید:");
        if (!name || name.trim() === '') return;
        
        const newPrompt = { 
            id: Date.now().toString(), 
            name: name.trim(), 
            content: `// پرامپت جدید برای "${name.trim()}"\n// محتوای خود را اینجا وارد کنید.`
        };
        prompts.push(newPrompt);
        selectPrompt(newPrompt.id);
    }
    
    function deletePrompt(id) {
        const promptToDelete = prompts.find(p => p.id === id);
        if (!promptToDelete || !confirm(`آیا از حذف پرامپت "${promptToDelete.name}" مطمئن هستید؟`)) return;
        prompts = prompts.filter(p => p.id !== id);
        if (selectedPromptId === id) {
            selectPrompt('default');
        } else {
            savePrompts();
            renderPrompts();
        }
    }
    
    function handlePromptEditing() {
        if (selectedPromptId === 'default') return;
        const currentPrompt = prompts.find(p => p.id === selectedPromptId);
        if (currentPrompt) {
            currentPrompt.content = promptDisplayArea.value;
            savePrompts();
        }
    }

    // *** تابع اصلاح شده برای بازنشانی کلی ***
    function resetAllSettings() {
        if (confirm("هشدار! آیا مطمئن هستید که می‌خواهید تمام تنظیمات (کلید API، لیست مدل‌ها و پرامپت‌های سفارشی) را پاک کنید؟ این عمل غیرقابل بازگشت است.")) {
            // 1. پاک کردن تمام داده‌های ذخیره شده
            localStorage.removeItem('geminiApiKey');
            localStorage.removeItem('userModels');
            localStorage.removeItem('selectedModel');
            localStorage.removeItem('userPrompts');
            localStorage.removeItem('selectedPrompt');

            // 2. ریست کردن مقادیر در رابط کاربری
            apiKeyInput.value = '';

            // 3. بارگذاری مجدد تنظیمات پیش‌فرض به صورت دستی (به جای ریلود صفحه)
            loadModels();
            loadPrompts();
            checkFormValidity();
            
            alert('تمام تنظیمات با موفقیت به حالت اولیه بازگردانده شد.');
        }
    }
    
    // توابع عمومی (بدون تغییر)
    function checkFormValidity() { translateBtn.disabled = !(uploadedFile && apiKeyInput.value.trim() !== ''); }
    function handleFileSelect(file) { if (file && file.name.endsWith('.srt')) { uploadedFile = file; const filenameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')); fileNameDisplay.textContent = `فایل انتخاب شده: ${filenameWithoutExt}`; errorDisplay.classList.add('hidden'); } else { alert('لطفاً یک فایل با فرمت .srt انتخاب کنید.'); uploadedFile = null; fileNameDisplay.textContent = ''; } checkFormValidity(); }
    async function handleFetchError(response) { const errorText = await response.text(); try { return JSON.parse(errorText).error?.message || errorText; } catch (e) { return errorText; } }

    async function uploadFileToGemini(processedText, originalFilename, apiKey) {
        progressTitle.textContent = "مرحله ۲ از ۴: آپلود فایل به سرور گوگل...";
        const formData = new FormData();
        const fileToUpload = new File([processedText], originalFilename, { type: 'text/plain' });
        formData.append('file', fileToUpload);
        const url = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`;
        const response = await fetch(url, { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`خطا در آپلود فایل: ${await handleFetchError(response)}`);
        return (await response.json()).file.uri;
    }
    
    async function getTranslationStream(fileUri, onChunk, onEnd, onError) {
        progressTitle.textContent = "مرحله ۳ از ۴: ارسال درخواست به هوش مصنوعی...";
        const apiKey = apiKeyInput.value.trim();
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModelApiName}:streamGenerateContent?alt=sse&key=${apiKey}`;
        
        try {
            const activePrompt = getActivePromptContent();
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: activePrompt }, { fileData: { mime_type: "text/plain", file_uri: fileUri } }] }],
                    generationConfig: { temperature: parseFloat(tempSlider.value), topP: parseFloat(topPSlider.value) }
                })
            });

            if (!response.ok) throw new Error(await handleFetchError(response));

            progressTitle.textContent = "مرحله ۴ از ۴: در حال دریافت ترجمه...";
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

        } catch(error) { onError(error); }
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
        translateBtn.disabled = true;
        progressBarFill.style.width = '0%';
        progressText.textContent = '۰٪';
        liveOutput.textContent = 'در حال انجام مرحلهٔ تفکر هوش مصنوعی هستیم. این فرایند ممکن است چند دقیقه‌ای طول بکشد، لطفاً صبور باشید...';
        progressTitle.textContent = 'مرحله ۱ از ۴: تبدیل SRT به MicroDVD...';
        
        try {
            const fileContent = await uploadedFile.text();
            const microDVDContent = convertSrtToMicroDVD(fileContent);
            if (!microDVDContent) throw new Error("فایل SRT ورودی خالی است یا فرمت آن صحیح نیست.");
            
            originalMicroDVDLines = microDVDContent.split('\n').length;
            
            const fileUri = await uploadFileToGemini(microDVDContent, uploadedFile.name.replace('.srt', '.txt'), apiKeyInput.value.trim());

            const onChunkReceived = (currentFullText) => {
                const translatedLines = currentFullText.split('\n').map(line => {
                    const match = line.match(/\{(\d+)\}\{(\d+)\}(.*)/);
                    return match ? match[3].replace(/\|/g, ' ') : '';
                });
                liveOutput.textContent = translatedLines.join('\n');
                liveOutput.scrollTop = liveOutput.scrollHeight;
                
                const percentage = Math.min(99, Math.round((translatedLines.length / originalMicroDVDLines) * 100));
                progressBarFill.style.width = `${percentage}%`;
                progressText.textContent = `${percentage}٪`;
            };

            const onStreamEnd = (finalText) => {
                progressTitle.textContent = "ترجمه با موفقیت انجام شد!";
                progressBarFill.style.width = '100%';
                progressText.textContent = '۱۰۰٪';
                translatedMicroDVDContent = finalText;
                downloadBtn.classList.remove('hidden');
                translateBtn.disabled = false;
            };
            
            const onStreamError = (error) => { throw error; };

            await getTranslationStream(fileUri, onChunkReceived, onStreamEnd, onStreamError);

        } catch (error) {
            console.error(error);
            errorMessage.textContent = error.message;
            errorDisplay.classList.remove('hidden');
            progressSection.classList.add('hidden');
            translateBtn.disabled = false;
        }
    });

    downloadBtn.addEventListener('click', () => {
        if (!translatedMicroDVDContent) return;
        
        const finalSrtContent = convertMicroDVDtoSrt(translatedMicroDVDContent);

        const originalFilename = uploadedFile.name;
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
});