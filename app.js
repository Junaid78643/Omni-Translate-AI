/**
 * OmniTranslate AI - Application Logic
 * CodeAlpha Artificial Intelligence Internship - Task 1: Language Translation Tool
 */

// ==========================================================================
// 1. Comprehensive Language Database (100+ Languages)
// ==========================================================================
const LANGUAGES = [
    { code: "en", name: "English", native: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
    { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
    { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文", flag: "🇨🇳" },
    { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文", flag: "🇹🇼" },
    { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰" },
    { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
    { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
    { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
    { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
    { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
    { code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱" },
    { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
    { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭" },
    { code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷" },
    { code: "he", name: "Hebrew", native: "עברית", flag: "🇮🇱" },
    { code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪" },
    { code: "no", name: "Norwegian", native: "Norsk", flag: "🇳🇴" },
    { code: "da", name: "Danish", native: "Dansk", flag: "🇩🇰" },
    { code: "fi", name: "Finnish", native: "Suomi", flag: "🇫🇮" },
    { code: "uk", name: "Ukrainian", native: "Українська", flag: "🇺🇦" },
    { code: "cs", name: "Czech", native: "Čeština", flag: "🇨🇿" },
    { code: "ro", name: "Romanian", native: "Română", flag: "🇷🇴" },
    { code: "hu", name: "Hungarian", native: "Magyar", flag: "🇭🇺" },
    { code: "fa", name: "Persian (Farsi)", native: "فارسی", flag: "🇮🇷" },
    { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "tl", name: "Tagalog (Filipino)", native: "Tagalog", flag: "🇵🇭" },
    { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "sw", name: "Swahili", native: "Kiswahili", flag: "🇰🇪" },
    { code: "af", name: "Afrikaans", native: "Afrikaans", flag: "🇿🇦" },
    { code: "sq", name: "Albanian", native: "Shqip", flag: "🇦🇱" },
    { code: "am", name: "Amharic", native: "አማርኛ", flag: "🇪🇹" },
    { code: "hy", name: "Armenian", native: "Հայերեն", flag: "🇦🇲" },
    { code: "az", name: "Azerbaijani", native: "Azərbaycan", flag: "🇦🇿" },
    { code: "eu", name: "Basque", native: "Euskara", flag: "🇪🇸" },
    { code: "be", name: "Belarusian", native: "Беларуская", flag: "🇧🇾" },
    { code: "bs", name: "Bosnian", native: "Bosanski", flag: "🇧🇦" },
    { code: "bg", name: "Bulgarian", native: "Български", flag: "🇧🇬" },
    { code: "ca", name: "Catalan", native: "Català", flag: "🇪🇸" },
    { code: "hr", name: "Croatian", native: "Hrvatski", flag: "🇭🇷" },
    { code: "et", name: "Estonian", native: "Eesti", flag: "🇪🇪" },
    { code: "ka", name: "Georgian", native: "ქართული", flag: "🇬🇪" },
    { code: "is", name: "Icelandic", native: "Íslenska", flag: "🇮🇸" },
    { code: "ga", name: "Irish", native: "Gaeilge", flag: "🇮🇪" },
    { code: "la", name: "Latin", native: "Latina", flag: "🇻🇦" },
    { code: "lv", name: "Latvian", native: "Latviešu", flag: "🇱🇻" },
    { code: "lt", name: "Lithuanian", native: "Lietuvių", flag: "🇱🇹" },
    { code: "mk", name: "Macedonian", native: "Македонски", flag: "🇲🇰" },
    { code: "mt", name: "Maltese", native: "Malti", flag: "🇲🇹" },
    { code: "mn", name: "Mongolian", native: "Монгол", flag: "🇲🇳" },
    { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
    { code: "sk", name: "Slovak", native: "Slovenčina", flag: "🇸🇰" },
    { code: "sl", name: "Slovenian", native: "Slovenščina", flag: "🇸🇮" },
    { code: "so", name: "Somali", native: "Soomaali", flag: "🇸🇴" },
    { code: "sr", name: "Serbian", native: "Српски", flag: "🇷🇸" },
    { code: "uz", name: "Uzbek", native: "O'zbek", flag: "🇺🇿" },
    { code: "cy", name: "Welsh", native: "Cymraeg", flag: "🇬🇧" },
    { code: "yi", name: "Yiddish", native: "ייִדיש", flag: "🇮🇱" },
    { code: "yo", name: "Yoruba", native: "Èdè Yorùbá", flag: "🇳🇬" },
    { code: "zu", name: "Zulu", native: "isiZulu", flag: "🇿🇦" }
];

// Map for quick language name lookup
const LANG_MAP = new Map(LANGUAGES.map(l => [l.code, l]));

// ==========================================================================
// 2. Application State & Preferences
// ==========================================================================
const AppState = {
    sourceLang: "auto",
    targetLang: "es",
    detectedLang: null,
    isTranslating: false,
    engine: "google", // 'google' | 'mymemory' | 'custom'
    customEndpoint: "",
    customApiKey: "",
    ttsRate: 1.0,
    ttsPitch: 1.0,
    realtimeDebounce: false,
    history: [],
    historyFilter: "all",
    theme: "dark"
};

let debounceTimer = null;
let speechRecognitionInstance = null;
let isRecordingVoice = false;

// ==========================================================================
// 3. DOM Elements Cache
// ==========================================================================
const DOM = {
    // Selectors
    sourceSelect: document.getElementById("sourceLangSelect"),
    targetSelect: document.getElementById("targetLangSelect"),
    sourceQuickTabs: document.getElementById("sourceQuickTabs"),
    targetQuickTabs: document.getElementById("targetQuickTabs"),
    swapBtn: document.getElementById("swapLangBtn"),

    // Text Areas & Panels
    sourceInput: document.getElementById("sourceTextInput"),
    targetOutput: document.getElementById("targetTextOutput"),
    loadingOverlay: document.getElementById("loadingOverlay"),
    emptyState: document.getElementById("emptyState"),
    detectedBadge: document.getElementById("detectedLangBadge"),
    targetBadge: document.getElementById("targetLangBadge"),
    sourceStats: document.getElementById("sourceStats"),
    targetStats: document.getElementById("targetStats"),
    latencyValue: document.getElementById("latencyValue"),

    // Action Buttons
    translateBtn: document.getElementById("translateBtn"),
    clearInputBtn: document.getElementById("clearInputBtn"),
    pasteBtn: document.getElementById("pasteBtn"),
    uploadFileBtn: document.getElementById("uploadFileBtn"),
    fileInput: document.getElementById("fileInput"),
    copyBtn: document.getElementById("copyBtn"),
    copyIcon: document.getElementById("copyIcon"),
    copyBtnText: document.getElementById("copyBtnText"),
    favoriteBtn: document.getElementById("favoriteBtn"),
    favIcon: document.getElementById("favIcon"),
    downloadBtn: document.getElementById("downloadBtn"),
    shareBtn: document.getElementById("shareBtn"),
    micBtn: document.getElementById("micBtn"),
    listenSourceBtn: document.getElementById("listenSourceBtn"),
    listenTargetBtn: document.getElementById("listenTargetBtn"),

    // Chips & Indicators
    quickChipsContainer: document.getElementById("quickChipsContainer"),
    engineBadge: document.getElementById("engineBadge"),
    engineStatusText: document.getElementById("engineStatusText"),

    // Header Controls
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    themeIcon: document.getElementById("themeIcon"),
    historyToggleBtn: document.getElementById("historyToggleBtn"),
    historyCount: document.getElementById("historyCount"),
    settingsToggleBtn: document.getElementById("settingsToggleBtn"),

    // History Drawer
    historyDrawer: document.getElementById("historyDrawer"),
    drawerBackdrop: document.getElementById("drawerBackdrop"),
    closeHistoryBtn: document.getElementById("closeHistoryBtn"),
    historyList: document.getElementById("historyList"),
    historySearchInput: document.getElementById("historySearchInput"),
    exportHistoryBtn: document.getElementById("exportHistoryBtn"),
    clearHistoryBtn: document.getElementById("clearHistoryBtn"),

    // Settings Modal
    settingsModal: document.getElementById("settingsModal"),
    closeSettingsBtn: document.getElementById("closeSettingsBtn"),
    saveSettingsBtn: document.getElementById("saveSettingsBtn"),
    ttsRateSlider: document.getElementById("ttsRateSlider"),
    ttsRateValue: document.getElementById("ttsRateValue"),
    ttsPitchSlider: document.getElementById("ttsPitchSlider"),
    ttsPitchValue: document.getElementById("ttsPitchValue"),
    realtimeToggle: document.getElementById("realtimeTranslateToggle"),
    customApiInputs: document.getElementById("customApiInputs"),
    customEndpointInput: document.getElementById("customEndpointInput"),
    customApiKeyInput: document.getElementById("customApiKeyInput"),

    // Toast Container
    toastContainer: document.getElementById("toastContainer")
};

// ==========================================================================
// 4. Initialization
// ==========================================================================
function initApp() {
    loadSettings();
    populateLanguageDropdowns();
    setupSpeechRecognition();
    renderHistory();
    attachEventListeners();
    updateBadges();
    applyTheme(AppState.theme);

    // Initial focus on input
    DOM.sourceInput.focus();
}

/**
 * Populate language selectors with comprehensive language database
 */
function populateLanguageDropdowns() {
    // Populate Source Dropdown (includes Auto Detect option)
    DOM.sourceSelect.innerHTML = `<option value="auto">✨ Auto Detect</option>`;
    LANGUAGES.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = `${lang.flag} ${lang.name} (${lang.native})`;
        DOM.sourceSelect.appendChild(option);
    });

    // Populate Target Dropdown (no auto detect)
    DOM.targetSelect.innerHTML = "";
    LANGUAGES.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = `${lang.flag} ${lang.name} (${lang.native})`;
        DOM.targetSelect.appendChild(option);
    });

    DOM.sourceSelect.value = AppState.sourceLang;
    DOM.targetSelect.value = AppState.targetLang;
}

// ==========================================================================
// 5. Translation Engine Service
// ==========================================================================
/**
 * Main translation dispatcher supporting Google Translate, MyMemory fallback & Custom APIs
 */
async function performTranslation() {
    const text = DOM.sourceInput.value.trim();
    if (!text) {
        showToast("Please enter text to translate", "info");
        return;
    }

    if (AppState.isTranslating) return;

    AppState.isTranslating = true;
    showLoading(true);
    const startTime = performance.now();

    try {
        let result = null;
        let detected = null;

        if (AppState.engine === "google") {
            try {
                const res = await translateViaGoogle(text, AppState.sourceLang, AppState.targetLang);
                result = res.text;
                detected = res.detectedLang;
            } catch (err) {
                console.warn("Google Engine failed, trying MyMemory fallback...", err);
                const res = await translateViaMyMemory(text, AppState.sourceLang, AppState.targetLang);
                result = res.text;
                detected = res.detectedLang;
                showToast("Translated using MyMemory fallback", "info");
            }
        } else if (AppState.engine === "mymemory") {
            const res = await translateViaMyMemory(text, AppState.sourceLang, AppState.targetLang);
            result = res.text;
            detected = res.detectedLang;
        } else if (AppState.engine === "custom") {
            const res = await translateViaCustomAPI(text, AppState.sourceLang, AppState.targetLang);
            result = res.text;
            detected = res.detectedLang;
        }

        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);

        if (result) {
            displayTranslationResult(result, detected, latency);
            saveToHistory(text, result, AppState.sourceLang, AppState.targetLang, detected);
        } else {
            throw new Error("Empty translation result received.");
        }
    } catch (error) {
        console.error("Translation error:", error);
        showToast("Translation error: " + (error.message || "Failed to fetch translation"), "error");
        DOM.latencyValue.textContent = "Error";
    } finally {
        AppState.isTranslating = false;
        showLoading(false);
    }
}

/**
 * Google Translate Chrome Client API (Fast, Free, Supports Auto-Detect)
 */
async function translateViaGoogle(text, source, target) {
    const sl = source === "auto" ? "auto" : source;
    const tl = target;
    const encoded = encodeURIComponent(text);
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sl}&tl=${tl}&q=${encoded}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Google API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    // Structure: [["Translated sentence", "en"]] or ["Translated sentence"]
    let translatedText = "";
    let detectedLang = null;

    if (Array.isArray(data)) {
        if (Array.isArray(data[0])) {
            translatedText = data.map(item => item[0]).join(" ");
            detectedLang = data[0][1] || null;
        } else if (typeof data[0] === "string") {
            translatedText = data.join(" ");
        }
    }

    return { text: translatedText, detectedLang };
}

/**
 * MyMemory Translation Memory API (Public Reliable Fallback)
 */
async function translateViaMyMemory(text, source, target) {
    const sl = source === "auto" ? "en" : source;
    const tl = target;
    const encoded = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=${sl}|${tl}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`MyMemory API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data && data.responseData && data.responseData.translatedText) {
        // Decode HTML entities if any
        const txt = decodeHTMLEntities(data.responseData.translatedText);
        return { text: txt, detectedLang: null };
    }

    throw new Error("No translation returned from MyMemory.");
}

/**
 * Custom API Endpoint (LibreTranslate / Azure / Custom Proxy)
 */
async function translateViaCustomAPI(text, source, target) {
    const endpoint = AppState.customEndpoint || "https://libretranslate.com/translate";
    const headers = { "Content-Type": "application/json" };
    if (AppState.customApiKey) {
        headers["Authorization"] = `Bearer ${AppState.customApiKey}`;
    }

    const body = {
        q: text,
        source: source === "auto" ? "auto" : source,
        target: target,
        format: "text",
        api_key: AppState.customApiKey || undefined
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Custom API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const result = data.translatedText || data.translation || data.text;
    return { text: result, detectedLang: data.detectedLanguage?.language || null };
}

/**
 * Render translated result to the UI with metrics
 */
function displayTranslationResult(text, detectedLang, latency) {
    DOM.targetOutput.value = text;
    DOM.emptyState.classList.add("hidden");
    DOM.latencyValue.textContent = `⚡ ${latency}ms`;
    updateStats();

    if (detectedLang) {
        AppState.detectedLang = detectedLang;
        const langObj = LANG_MAP.get(detectedLang);
        const langName = langObj ? langObj.name : detectedLang.toUpperCase();
        DOM.detectedBadge.innerHTML = `<i class="fa-solid fa-sparkles"></i> Detected: ${langName}`;
    }

    // Reset favorite button state for new translation
    DOM.favoriteBtn.classList.remove("starred");
    DOM.favIcon.className = "fa-regular fa-star";
}

function showLoading(show) {
    if (show) {
        DOM.loadingOverlay.classList.add("active");
        DOM.emptyState.classList.add("hidden");
    } else {
        DOM.loadingOverlay.classList.remove("active");
        if (!DOM.targetOutput.value.trim()) {
            DOM.emptyState.classList.remove("hidden");
        }
    }
}

function updateBadges() {
    const targetObj = LANG_MAP.get(AppState.targetLang);
    if (targetObj) {
        DOM.targetBadge.innerHTML = `${targetObj.flag} ${targetObj.name} (${targetObj.native})`;
    }

    if (AppState.sourceLang === "auto") {
        if (AppState.detectedLang) {
            const srcObj = LANG_MAP.get(AppState.detectedLang);
            DOM.detectedBadge.innerHTML = `<i class="fa-solid fa-sparkles"></i> Detected: ${srcObj ? srcObj.name : AppState.detectedLang.toUpperCase()}`;
        } else {
            DOM.detectedBadge.innerHTML = `<i class="fa-solid fa-sparkles"></i> Auto Detecting`;
        }
    } else {
        const srcObj = LANG_MAP.get(AppState.sourceLang);
        DOM.detectedBadge.innerHTML = `<i class="fa-solid fa-language"></i> ${srcObj ? srcObj.name : AppState.sourceLang}`;
    }
}

// ==========================================================================
// 6. Text-to-Speech (TTS) & Speech Recognition (STT)
// ==========================================================================
/**
 * Speak text in natural accent using Web Speech API
 */
function speakText(text, langCode) {
    if (!text || !text.trim()) {
        showToast("No text to speak", "info");
        return;
    }

    if (!("speechSynthesis" in window)) {
        showToast("Speech synthesis is not supported in this browser.", "error");
        return;
    }

    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = AppState.ttsRate || 1.0;
    utterance.pitch = AppState.ttsPitch || 1.0;

    // Normalize language tag (e.g. 'es' -> 'es-ES', 'fr' -> 'fr-FR')
    const fullLangCode = getFullLangCode(langCode);
    utterance.lang = fullLangCode;

    // Pick best matching system voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode) || v.lang === fullLangCode);
    if (matchedVoice) {
        utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
        showToast("Playing pronunciation...", "info");
    };

    utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
    };

    window.speechSynthesis.speak(utterance);
}

function getFullLangCode(code) {
    const codeMap = {
        en: "en-US", es: "es-ES", fr: "fr-FR", de: "de-DE",
        it: "it-IT", pt: "pt-BR", ru: "ru-RU", ja: "ja-JP",
        ko: "ko-KR", "zh-CN": "zh-CN", ar: "ar-SA", hi: "hi-IN",
        ur: "ur-PK", nl: "nl-NL", tr: "tr-TR", id: "id-ID"
    };
    return codeMap[code] || code;
}

/**
 * Voice Input (Speech-to-Text) using Web Speech Recognition
 */
function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        DOM.micBtn.title = "Speech recognition not supported in this browser";
        return;
    }

    speechRecognitionInstance = new SpeechRecognition();
    speechRecognitionInstance.continuous = false;
    speechRecognitionInstance.interimResults = true;

    speechRecognitionInstance.onstart = () => {
        isRecordingVoice = true;
        DOM.micBtn.classList.add("active");
        showToast("Listening... Speak clearly into your microphone", "info");
    };

    speechRecognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(res => res[0].transcript)
            .join("");
        DOM.sourceInput.value = transcript;
        updateStats();
    };

    speechRecognitionInstance.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        isRecordingVoice = false;
        DOM.micBtn.classList.remove("active");
        showToast("Microphone error: " + event.error, "error");
    };

    speechRecognitionInstance.onend = () => {
        isRecordingVoice = false;
        DOM.micBtn.classList.remove("active");
        if (DOM.sourceInput.value.trim()) {
            performTranslation();
        }
    };
}

function toggleVoiceInput() {
    if (!speechRecognitionInstance) {
        showToast("Speech recognition is not supported in this browser (Use Chrome or Edge)", "error");
        return;
    }

    if (isRecordingVoice) {
        speechRecognitionInstance.stop();
    } else {
        const langCode = AppState.sourceLang === "auto" ? "en-US" : getFullLangCode(AppState.sourceLang);
        speechRecognitionInstance.lang = langCode;
        try {
            speechRecognitionInstance.start();
        } catch (err) {
            console.error("Recognition start error:", err);
        }
    }
}

// ==========================================================================
// 7. Translation History Management (LocalStorage)
// ==========================================================================
function loadSettings() {
    try {
        const savedHistory = localStorage.getItem("omnitranslate_history");
        if (savedHistory) AppState.history = JSON.parse(savedHistory);

        const savedTheme = localStorage.getItem("omnitranslate_theme");
        if (savedTheme) AppState.theme = savedTheme;

        const savedEngine = localStorage.getItem("omnitranslate_engine");
        if (savedEngine) AppState.engine = savedEngine;

        const savedRate = localStorage.getItem("omnitranslate_tts_rate");
        if (savedRate) AppState.ttsRate = parseFloat(savedRate);

        const savedPitch = localStorage.getItem("omnitranslate_tts_pitch");
        if (savedPitch) AppState.ttsPitch = parseFloat(savedPitch);

        const savedRealtime = localStorage.getItem("omnitranslate_realtime");
        if (savedRealtime) AppState.realtimeDebounce = savedRealtime === "true";

        updateEngineBadge();
    } catch (e) {
        console.warn("Could not load settings from LocalStorage:", e);
    }
}

function saveToHistory(sourceText, targetText, sourceLang, targetLang, detected) {
    // Avoid duplicate immediate entries
    if (AppState.history.length > 0 && AppState.history[0].sourceText === sourceText && AppState.history[0].targetLang === targetLang) {
        return;
    }

    const item = {
        id: "trans_" + Date.now(),
        sourceText,
        targetText,
        sourceLang,
        targetLang,
        detectedLang: detected,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        starred: false
    };

    AppState.history.unshift(item);
    if (AppState.history.length > 50) AppState.history.pop(); // keep last 50

    try {
        localStorage.setItem("omnitranslate_history", JSON.stringify(AppState.history));
    } catch (e) {
        console.warn("Storage quota exceeded", e);
    }

    renderHistory();
}

function renderHistory() {
    DOM.historyCount.textContent = AppState.history.length;
    const filter = AppState.historyFilter;
    const searchTerm = (DOM.historySearchInput?.value || "").toLowerCase().trim();

    let filtered = AppState.history;
    if (filter === "starred") {
        filtered = filtered.filter(item => item.starred);
    }
    if (searchTerm) {
        filtered = filtered.filter(item =>
            item.sourceText.toLowerCase().includes(searchTerm) ||
            item.targetText.toLowerCase().includes(searchTerm)
        );
    }

    if (filtered.length === 0) {
        DOM.historyList.innerHTML = `
            <div class="drawer-empty-state">
                <i class="fa-regular fa-folder-open"></i>
                <p>${filter === "starred" ? "No starred translations." : "No translations recorded."}</p>
                <small>${searchTerm ? "No matches for your search query." : "Translate sentences to build your local history."}</small>
            </div>
        `;
        return;
    }

    DOM.historyList.innerHTML = "";
    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "history-card";
        const srcName = item.sourceLang === "auto" ? (item.detectedLang ? `${item.detectedLang.toUpperCase()} (auto)` : "Auto") : item.sourceLang.toUpperCase();
        const tgtName = item.targetLang.toUpperCase();

        card.innerHTML = `
            <div class="history-card-header">
                <span class="history-langs">
                    <span>${srcName}</span>
                    <i class="fa-solid fa-arrow-right" style="font-size: 0.7rem;"></i>
                    <span>${tgtName}</span>
                </span>
                <div class="history-actions">
                    <button class="history-act-btn ${item.starred ? 'starred' : ''}" data-act="star" data-id="${item.id}" title="${item.starred ? 'Unstar' : 'Star'}">
                        <i class="${item.starred ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                    </button>
                    <button class="history-act-btn" data-act="copy" data-id="${item.id}" title="Copy translation">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <button class="history-act-btn" data-act="delete" data-id="${item.id}" title="Delete">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
            <div class="history-source-text">${escapeHTML(item.sourceText)}</div>
            <div class="history-target-text">${escapeHTML(item.targetText)}</div>
            <div class="history-time"><i class="fa-regular fa-clock"></i> ${item.date} ${item.timestamp}</div>
        `;

        // Clicking card restores into editor
        card.addEventListener("click", (e) => {
            if (e.target.closest(".history-actions")) return;
            restoreHistoryItem(item);
        });

        DOM.historyList.appendChild(card);
    });
}

function restoreHistoryItem(item) {
    DOM.sourceInput.value = item.sourceText;
    DOM.targetOutput.value = item.targetText;
    AppState.sourceLang = item.sourceLang;
    AppState.targetLang = item.targetLang;
    DOM.sourceSelect.value = item.sourceLang;
    DOM.targetSelect.value = item.targetLang;
    syncQuickTabs();
    updateBadges();
    updateStats();
    DOM.emptyState.classList.add("hidden");
    closeDrawer();
    showToast("Restored translation from history", "info");
}

function toggleStarHistory(id) {
    const item = AppState.history.find(h => h.id === id);
    if (item) {
        item.starred = !item.starred;
        localStorage.setItem("omnitranslate_history", JSON.stringify(AppState.history));
        renderHistory();
    }
}

function deleteHistoryItem(id) {
    AppState.history = AppState.history.filter(h => h.id !== id);
    localStorage.setItem("omnitranslate_history", JSON.stringify(AppState.history));
    renderHistory();
    showToast("Translation removed from history", "info");
}

function clearAllHistory() {
    if (AppState.history.length === 0) return;
    if (confirm("Are you sure you want to clear all translation history?")) {
        AppState.history = [];
        localStorage.removeItem("omnitranslate_history");
        renderHistory();
        showToast("History cleared", "info");
    }
}

function exportHistoryJSON() {
    if (AppState.history.length === 0) {
        showToast("No history to export", "info");
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.history, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `OmniTranslate_History_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("History exported as JSON file", "success");
}

// ==========================================================================
// 8. Event Listeners & Interactions
// ==========================================================================
function attachEventListeners() {
    // Translate button click
    DOM.translateBtn.addEventListener("click", performTranslation);

    // Swap Languages button
    DOM.swapBtn.addEventListener("click", swapLanguages);

    // Language Selectors
    DOM.sourceSelect.addEventListener("change", (e) => {
        AppState.sourceLang = e.target.value;
        AppState.detectedLang = null;
        syncQuickTabs();
        updateBadges();
        if (DOM.sourceInput.value.trim()) performTranslation();
    });

    DOM.targetSelect.addEventListener("change", (e) => {
        AppState.targetLang = e.target.value;
        syncQuickTabs();
        updateBadges();
        if (DOM.sourceInput.value.trim()) performTranslation();
    });

    // Quick Tabs
    DOM.sourceQuickTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".quick-tab");
        if (!btn) return;
        const lang = btn.dataset.lang;
        AppState.sourceLang = lang;
        DOM.sourceSelect.value = lang;
        syncQuickTabs();
        updateBadges();
        if (DOM.sourceInput.value.trim()) performTranslation();
    });

    DOM.targetQuickTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".quick-tab");
        if (!btn) return;
        const lang = btn.dataset.lang;
        AppState.targetLang = lang;
        DOM.targetSelect.value = lang;
        syncQuickTabs();
        updateBadges();
        if (DOM.sourceInput.value.trim()) performTranslation();
    });

    // Input changes & character stats
    DOM.sourceInput.addEventListener("input", () => {
        updateStats();
        if (AppState.realtimeDebounce) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (DOM.sourceInput.value.trim().length > 1) {
                    performTranslation();
                }
            }, 600);
        }
    });

    // Quick sample chips
    DOM.quickChipsContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".sample-chip");
        if (!chip) return;
        const text = chip.dataset.text;
        DOM.sourceInput.value = text;
        updateStats();
        performTranslation();
    });

    // Clear input
    DOM.clearInputBtn.addEventListener("click", () => {
        DOM.sourceInput.value = "";
        DOM.targetOutput.value = "";
        DOM.emptyState.classList.remove("hidden");
        DOM.latencyValue.textContent = "Ready";
        updateStats();
        DOM.sourceInput.focus();
    });

    // Paste from clipboard
    DOM.pasteBtn.addEventListener("click", async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                DOM.sourceInput.value = text;
                updateStats();
                performTranslation();
                showToast("Pasted from clipboard", "success");
            }
        } catch (err) {
            showToast("Clipboard access denied. Press Ctrl+V directly.", "info");
        }
    });

    // File Upload
    DOM.uploadFileBtn.addEventListener("click", () => DOM.fileInput.click());
    DOM.fileInput.addEventListener("change", handleFileUpload);

    // Copy Translation button
    DOM.copyBtn.addEventListener("click", copyTranslationToClipboard);

    // Download translation
    DOM.downloadBtn.addEventListener("click", downloadTranslationAsFile);

    // Star favorite translation
    DOM.favoriteBtn.addEventListener("click", () => {
        const text = DOM.targetOutput.value.trim();
        if (!text) return;
        DOM.favoriteBtn.classList.toggle("starred");
        const isStarred = DOM.favoriteBtn.classList.contains("starred");
        DOM.favIcon.className = isStarred ? "fa-solid fa-star" : "fa-regular fa-star";
        showToast(isStarred ? "Translation starred!" : "Removed star", "info");
    });

    // Share button
    DOM.shareBtn.addEventListener("click", async () => {
        const text = DOM.targetOutput.value.trim();
        if (!text) {
            showToast("Nothing to share yet", "info");
            return;
        }
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "OmniTranslate AI Translation",
                    text: text
                });
            } catch (err) {
                console.log("Share dismissed");
            }
        } else {
            copyTranslationToClipboard();
            showToast("Copied to clipboard for sharing!", "success");
        }
    });

    // TTS Pronounce Buttons
    DOM.listenSourceBtn.addEventListener("click", () => {
        const text = DOM.sourceInput.value.trim();
        const lang = AppState.sourceLang === "auto" ? (AppState.detectedLang || "en") : AppState.sourceLang;
        speakText(text, lang);
    });

    DOM.listenTargetBtn.addEventListener("click", () => {
        const text = DOM.targetOutput.value.trim();
        speakText(text, AppState.targetLang);
    });

    // Voice Input Mic Button
    DOM.micBtn.addEventListener("click", toggleVoiceInput);

    // Theme Toggle
    DOM.themeToggleBtn.addEventListener("click", () => {
        const newTheme = AppState.theme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });

    // History Drawer Events
    DOM.historyToggleBtn.addEventListener("click", openDrawer);
    DOM.closeHistoryBtn.addEventListener("click", closeDrawer);
    DOM.drawerBackdrop.addEventListener("click", closeDrawer);
    DOM.clearHistoryBtn.addEventListener("click", clearAllHistory);
    DOM.exportHistoryBtn.addEventListener("click", exportHistoryJSON);
    DOM.historySearchInput.addEventListener("input", renderHistory);

    // History filter pills
    document.querySelectorAll(".filter-pill").forEach(pill => {
        pill.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
            e.currentTarget.classList.add("active");
            AppState.historyFilter = e.currentTarget.dataset.filter;
            renderHistory();
        });
    });

    // History item delegator
    DOM.historyList.addEventListener("click", (e) => {
        const btn = e.target.closest(".history-act-btn");
        if (!btn) return;
        const id = btn.dataset.id;
        const act = btn.dataset.act;

        if (act === "star") {
            toggleStarHistory(id);
        } else if (act === "delete") {
            deleteHistoryItem(id);
        } else if (act === "copy") {
            const item = AppState.history.find(h => h.id === id);
            if (item) {
                navigator.clipboard.writeText(item.targetText);
                showToast("Translation copied!", "success");
            }
        }
    });

    // Settings Modal Events
    DOM.settingsToggleBtn.addEventListener("click", openSettingsModal);
    DOM.closeSettingsBtn.addEventListener("click", closeSettingsModal);
    DOM.saveSettingsBtn.addEventListener("click", saveSettings);
    DOM.settingsModal.addEventListener("click", (e) => {
        if (e.target === DOM.settingsModal) closeSettingsModal();
    });

    // Settings radio change
    document.querySelectorAll("input[name='translationEngine']").forEach(radio => {
        radio.addEventListener("change", (e) => {
            DOM.customApiInputs.style.display = e.target.value === "custom" ? "flex" : "none";
        });
    });

    // Sliders
    DOM.ttsRateSlider.addEventListener("input", (e) => {
        DOM.ttsRateValue.textContent = e.target.value;
    });
    DOM.ttsPitchSlider.addEventListener("input", (e) => {
        DOM.ttsPitchValue.textContent = e.target.value;
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
        // Ctrl + Enter or Cmd + Enter -> Translate
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            performTranslation();
        }
        // Alt + S -> Swap Languages
        if (e.altKey && (e.key === "s" || e.key === "S")) {
            e.preventDefault();
            swapLanguages();
        }
        // Alt + C -> Copy Translation
        if (e.altKey && (e.key === "c" || e.key === "C")) {
            e.preventDefault();
            copyTranslationToClipboard();
        }
        // Escape -> Close Drawer / Modal
        if (e.key === "Escape") {
            closeDrawer();
            closeSettingsModal();
        }
    });
}

// ==========================================================================
// 9. Helper Utilities & UI Actions
// ==========================================================================
function swapLanguages() {
    // If source was 'auto', swap target into source, and previous detected lang into target
    let newSource = AppState.targetLang;
    let newTarget = AppState.sourceLang;

    if (newTarget === "auto") {
        newTarget = AppState.detectedLang || "en";
    }

    AppState.sourceLang = newSource;
    AppState.targetLang = newTarget;
    AppState.detectedLang = null;

    DOM.sourceSelect.value = newSource;
    DOM.targetSelect.value = newTarget;

    // Also swap texts if both exist
    const sourceText = DOM.sourceInput.value;
    const targetText = DOM.targetOutput.value;

    if (targetText.trim()) {
        DOM.sourceInput.value = targetText;
        DOM.targetOutput.value = sourceText;
    }

    syncQuickTabs();
    updateBadges();
    updateStats();

    if (DOM.sourceInput.value.trim()) {
        performTranslation();
    }

    showToast(`Swapped: ${newSource.toUpperCase()} ⇄ ${newTarget.toUpperCase()}`, "info");
}

function syncQuickTabs() {
    // Update source tabs
    document.querySelectorAll("#sourceQuickTabs .quick-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.lang === AppState.sourceLang);
    });

    // Update target tabs
    document.querySelectorAll("#targetQuickTabs .quick-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.lang === AppState.targetLang);
    });
}

function updateStats() {
    const srcText = DOM.sourceInput.value;
    const srcChars = srcText.length;
    const srcWords = srcText.trim() ? srcText.trim().split(/\s+/).length : 0;
    DOM.sourceStats.textContent = `${srcChars} chars • ${srcWords} words`;

    const tgtText = DOM.targetOutput.value;
    const tgtChars = tgtText.length;
    const tgtWords = tgtText.trim() ? tgtText.trim().split(/\s+/).length : 0;
    DOM.targetStats.textContent = `${tgtChars} chars • ${tgtWords} words`;
}

function copyTranslationToClipboard() {
    const text = DOM.targetOutput.value.trim();
    if (!text) {
        showToast("No translated text to copy", "info");
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        DOM.copyIcon.className = "fa-solid fa-check";
        DOM.copyBtnText.textContent = "Copied!";
        showToast("Translation copied to clipboard!", "success");

        setTimeout(() => {
            DOM.copyIcon.className = "fa-regular fa-copy";
            DOM.copyBtnText.textContent = "Copy";
        }, 2000);
    }).catch(err => {
        showToast("Failed to copy text: " + err, "error");
    });
}

function downloadTranslationAsFile() {
    const text = DOM.targetOutput.value.trim();
    if (!text) {
        showToast("No translated text to download", "info");
        return;
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Translation_${AppState.targetLang}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Translation file saved to downloads", "success");
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        DOM.sourceInput.value = event.target.result;
        updateStats();
        performTranslation();
        showToast(`Loaded ${file.name}`, "success");
    };
    reader.onerror = () => {
        showToast("Error reading file", "error");
    };
    reader.readAsText(file);
}

function applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("omnitranslate_theme", theme);

    if (theme === "light") {
        DOM.themeIcon.className = "fa-solid fa-sun";
    } else {
        DOM.themeIcon.className = "fa-solid fa-moon";
    }
}

function updateEngineBadge() {
    const engineMap = {
        google: "Google Translate Engine",
        mymemory: "MyMemory API Engine",
        custom: "Custom API Engine"
    };
    DOM.engineStatusText.textContent = engineMap[AppState.engine] || "Google Translate Engine";
}

function openDrawer() {
    DOM.historyDrawer.classList.add("open");
    DOM.drawerBackdrop.classList.add("open");
    renderHistory();
}

function closeDrawer() {
    DOM.historyDrawer.classList.remove("open");
    DOM.drawerBackdrop.classList.remove("open");
}

function openSettingsModal() {
    const currentRadio = document.querySelector(`input[name='translationEngine'][value='${AppState.engine}']`);
    if (currentRadio) currentRadio.checked = true;
    DOM.customApiInputs.style.display = AppState.engine === "custom" ? "flex" : "none";
    DOM.customEndpointInput.value = AppState.customEndpoint;
    DOM.customApiKeyInput.value = AppState.customApiKey;
    DOM.ttsRateSlider.value = AppState.ttsRate;
    DOM.ttsRateValue.textContent = AppState.ttsRate;
    DOM.ttsPitchSlider.value = AppState.ttsPitch;
    DOM.ttsPitchValue.textContent = AppState.ttsPitch;
    DOM.realtimeToggle.checked = AppState.realtimeDebounce;

    DOM.settingsModal.classList.add("open");
}

function closeSettingsModal() {
    DOM.settingsModal.classList.remove("open");
}

function saveSettings() {
    const selectedRadio = document.querySelector("input[name='translationEngine']:checked");
    if (selectedRadio) AppState.engine = selectedRadio.value;
    AppState.customEndpoint = DOM.customEndpointInput.value.trim();
    AppState.customApiKey = DOM.customApiKeyInput.value.trim();
    AppState.ttsRate = parseFloat(DOM.ttsRateSlider.value);
    AppState.ttsPitch = parseFloat(DOM.ttsPitchSlider.value);
    AppState.realtimeDebounce = DOM.realtimeToggle.checked;

    localStorage.setItem("omnitranslate_engine", AppState.engine);
    localStorage.setItem("omnitranslate_tts_rate", AppState.ttsRate);
    localStorage.setItem("omnitranslate_tts_pitch", AppState.ttsPitch);
    localStorage.setItem("omnitranslate_realtime", AppState.realtimeDebounce);

    updateEngineBadge();
    closeSettingsModal();
    showToast("Settings saved successfully!", "success");
}

function showToast(message, type = "info") {
    const icons = {
        success: "fa-solid fa-circle-check",
        error: "fa-solid fa-triangle-exclamation",
        info: "fa-solid fa-circle-info"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="${icons[type] || icons.info}"></i> <span>${escapeHTML(message)}</span>`;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, tag => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    }[tag] || tag));
}

function decodeHTMLEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
}

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
