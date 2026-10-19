# OmniTranslate AI — Neural Language Translation Tool

<div align="center">

**CodeAlpha Artificial Intelligence Internship — Task 1**

[![Language](https://img.shields.io/badge/Language-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20%7C%20Python-blue.svg)](#)
[![API](https://img.shields.io/badge/API-Google%20Translate%20%2B%20MyMemory-green.svg)](#)
[![Theme](https://img.shields.io/badge/Design-Glassmorphism%20%26%20Dark%2FLight-purple.svg)](#)
[![Status](https://img.shields.io/badge/Status-100%25%20Completed-brightgreen.svg)](#)

*A state-of-the-art neural language translation web application and CLI suite featuring 100+ global languages, voice speech synthesis, microphone voice input, automatic language detection, translation history, and dual-engine fallback architecture.*

---

</div>

## 📌 Project Overview

**Task Objective**: Develop a robust language translation tool that allows users to input text, choose source and target languages, query a translation API (such as Google Translate), and clearly render the translated result with enhanced accessibility features like one-click copy and text-to-speech pronunciation.

**OmniTranslate AI** satisfies all baseline requirements and introduces premium production-grade features including:
- **Dual Translation Engine Architecture**: High-speed Google Translate Engine with automatic zero-configuration fallback to MyMemory Translation Memory API.
- **Microphone Voice Input (Speech-to-Text)**: Speak naturally into your microphone to dictate text in real-time.
- **Audio Pronunciation (Text-to-Speech)**: Listen to accurate native pronunciations for both source text and translated outputs.
- **Smart Auto-Detection**: Automatically detects input language and displays the detected language badge.
- **One-Click Clipboard Copy**: Smooth feedback animation with toast notifications.
- **Persistent Translation History**: Saves translation logs in local storage with search filtering, star/favorite pinning, and JSON export.
- **Modern Responsive Design**: Crafted with custom Vanilla CSS design tokens, ambient gradient glows, glassmorphism cards, and dark/light mode toggles.
- **Multi-Interface Access**: Available as an interactive Web App, a zero-dependency local Python server/proxy, and a full-featured terminal CLI.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **100+ Languages** | Full coverage of major global languages (Spanish, French, German, Japanese, Arabic, Hindi, Urdu, Chinese, etc.) with native script names and flag emojis. |
| **Dual Engine Pipeline** | Primary Google Translate engine with automatic fallback to MyMemory API. Zero paid API keys required. |
| **Audio Text-to-Speech (TTS)** | High-fidelity voice playback powered by the Web Speech Synthesis API with adjustable pitch and speed controls. |
| **Voice Dictation (STT)** | Voice recording powered by Web Speech Recognition with live pulsing status indicators. |
| **Language Swapping** | Instant 1-click swap of source and target languages with fluid 180° rotation animations. |
| **Real-Time Word & Char Stats** | Dynamic counters tracking input and output lengths. |
| **Translation History Drawer** | Slide-out drawer displaying past translations, timestamped logs, search filter, star favorites, and JSON export. |
| **Document Translation** | Upload `.txt`, `.md`, `.json`, or `.csv` files directly to translate entire documents. |
| **Quick Try Chips** | 1-click sample prompts for common travel, AI, everyday, and business phrases. |
| **Keyboard Shortcuts** | `Ctrl + Enter` to translate, `Alt + S` to swap languages, `Alt + C` to copy. |

---

## 📁 Repository Structure

```text
Task1_Language Translation Tool/
│
├── index.html           # Main semantic HTML5 web application interface
├── style.css            # Modern Vanilla CSS design system (glassmorphism & tokens)
├── app.js               # Frontend translation engine, voice synthesis, history & UI
│
├── server.py            # Zero-dependency Python HTTP server & API proxy
├── translator_cli.py    # Command-line interactive and batch translation tool
├── test_translator.py   # Automated unit test suite verifying translation pipelines
│
└── README.md            # Comprehensive project documentation and guide
```

---

## 🚀 How to Run the Project

### Option 1: Web Interface via Python Server (Recommended)
This method launches both the web user interface and the local backend API proxy:

```bash
# 1. Open terminal inside the project directory
cd "Task1_Language Translation Tool"

# 2. Run the local server (uses Python standard library, no pip install needed)
python server.py
```
Open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Direct Browser Launch
Since OmniTranslate AI communicates directly with CORS-compliant translation endpoints, you can simply open `index.html` in any modern web browser:
- Double click `index.html` or drag it into Google Chrome, Microsoft Edge, or Firefox.

### Option 3: Terminal Command-Line Interface (CLI)
For quick translations in the terminal:

```bash
# Interactive mode (continuous prompt)
python translator_cli.py

# Single command translation
python translator_cli.py --text "Hello world, welcome to CodeAlpha!" --target es

# Translate with explicit source and target
python translator_cli.py -t "Bonjour le monde" -s fr -d en

# List popular supported language codes
python translator_cli.py --list
```

### Option 4: Run Automated Verification Tests
Run the test suite to verify multi-language translation and language auto-detection:

```bash
python test_translator.py
```
All 8 automated test cases test English to Spanish, French, German, Japanese, Arabic, Hindi, Urdu, and auto-language detection.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | Trigger instant translation |
| <kbd>Alt</kbd> + <kbd>S</kbd> | Swap source and target languages |
| <kbd>Alt</kbd> + <kbd>C</kbd> | Copy translated text to clipboard |
| <kbd>Escape</kbd> | Close History Drawer or Settings Modal |

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Design Tokens, Glassmorphism, CSS Grid/Flexbox), Vanilla JavaScript (ES6+).
- **APIs**:
  - Google Translate Chrome Client Engine
  - MyMemory Translation Memory API
  - Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
  - Web Clipboard API & File Reader API
- **Backend & Tooling**: Python 3 standard library (`http.server`, `urllib.request`, `socketserver`, `json`).
- **Icons & Typography**: FontAwesome 6, Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*).

---

## 🧪 Test Results Summary

```text
test_auto_detect_french ... OK
test_auto_detect_spanish ... OK
test_english_to_arabic ... OK
test_english_to_french ... OK
test_english_to_german ... OK
test_english_to_hindi ... OK
test_english_to_japanese ... OK
test_english_to_spanish ... OK

Ran 8 tests in 5.88s — 100% Passed.
```

---

## 👨‍💻 Author & Acknowledgements

Developed for **CodeAlpha Artificial Intelligence Internship Program**  
**Task 1**: Language Translation Tool
