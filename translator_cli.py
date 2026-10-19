#!/usr/bin/env python3
"""
OmniTranslate AI - Command-Line Interface (CLI)
CodeAlpha Artificial Intelligence Internship - Task 1: Language Translation Tool

Usage:
  Interactive Mode:
    python translator_cli.py

  Single Translation:
    python translator_cli.py --text "Hello world" --target es
    python translator_cli.py -t "Good morning" -s en -d fr

  List Available Languages:
    python translator_cli.py --list
"""

import argparse
import json
import sys
import urllib.parse
import urllib.request

# Ensure UTF-8 output on Windows terminal
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# ANSI Colors for terminal styling
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
MAGENTA = "\033[95m"
RED = "\033[91m"
BOLD = "\033[1m"
RESET = "\033[0m"

LANGUAGES = {
    "auto": "✨ Auto Detect",
    "en": "English", "es": "Spanish", "fr": "French", "de": "German",
    "zh-CN": "Chinese (Simplified)", "zh-TW": "Chinese (Traditional)",
    "ar": "Arabic", "hi": "Hindi", "ur": "Urdu", "bn": "Bengali",
    "pt": "Portuguese", "ru": "Russian", "ja": "Japanese", "ko": "Korean",
    "it": "Italian", "tr": "Turkish", "nl": "Dutch", "pl": "Polish",
    "id": "Indonesian", "vi": "Vietnamese", "th": "Thai", "el": "Greek",
    "he": "Hebrew", "sv": "Swedish", "no": "Norwegian", "da": "Danish",
    "fi": "Finnish", "uk": "Ukrainian", "cs": "Czech", "ro": "Romanian",
    "fa": "Persian", "ms": "Malay", "tl": "Tagalog", "ta": "Tamil",
    "te": "Telugu", "mr": "Marathi", "gu": "Gujarati", "pa": "Punjabi"
}

def translate(text: str, source: str = "auto", target: str = "es"):
    """
    Translates text from source language to target language.
    Primary: Google Translate Chrome Client
    Fallback: MyMemory Translation API
    """
    encoded_text = urllib.parse.quote(text)

    # Attempt 1: Google Translate Engine
    try:
        url = f"https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl={source}&tl={target}&q={encoded_text}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=6) as response:
            raw = response.read().decode("utf-8")
            data = json.loads(raw)
            translated = ""
            detected = None

            if isinstance(data, list):
                if len(data) > 0 and isinstance(data[0], list):
                    translated = " ".join([i[0] for i in data if isinstance(i, list)])
                    if len(data[0]) > 1:
                        detected = data[0][1]
                elif len(data) > 0 and isinstance(data[0], str):
                    translated = " ".join(data)

            if translated:
                return {
                    "text": translated,
                    "engine": "Google Translate",
                    "detected": detected
                }
    except Exception:
        pass

    # Attempt 2: MyMemory Translation API
    try:
        sl = "en" if source == "auto" else source
        url = f"https://api.mymemory.translated.net/get?q={encoded_text}&langpair={sl}|{target}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as response:
            raw = response.read().decode("utf-8")
            data = json.loads(raw)
            translated = data.get("responseData", {}).get("translatedText", "")
            if translated:
                return {
                    "text": translated,
                    "engine": "MyMemory API",
                    "detected": None
                }
    except Exception as e:
        raise RuntimeError(f"Translation failed on both engines: {e}")

    raise RuntimeError("No translation returned by services.")


def interactive_mode():
    print(f"{CYAN}{BOLD}======================================================{RESET}")
    print(f"{MAGENTA}{BOLD}      OmniTranslate AI - Interactive CLI Tool        {RESET}")
    print(f"{CYAN}       CodeAlpha AI Internship - Task 1               {RESET}")
    print(f"{CYAN}{BOLD}======================================================{RESET}")
    print(f"Type {YELLOW}exit{RESET} or {YELLOW}quit{RESET} to quit.")
    print(f"Type {YELLOW}:target <code>{RESET} to change destination language (e.g. :target fr)")
    print(f"Type {YELLOW}:source <code>{RESET} to change source language (e.g. :source auto)\n")

    source_lang = "auto"
    target_lang = "es"

    while True:
        try:
            print(f"{GREEN}[{source_lang.upper()} ➔ {target_lang.upper()}]{RESET}")
            user_input = input(f"{BOLD}Enter text to translate: {RESET}").strip()

            if not user_input:
                continue

            if user_input.lower() in ("exit", "quit", "q"):
                print(f"{CYAN}Exiting OmniTranslate CLI. Goodbye!{RESET}")
                break

            if user_input.startswith(":target "):
                new_tgt = user_input.split(" ", 1)[1].strip().lower()
                target_lang = new_tgt
                print(f"{YELLOW}Target language set to: {target_lang}{RESET}\n")
                continue

            if user_input.startswith(":source "):
                new_src = user_input.split(" ", 1)[1].strip().lower()
                source_lang = new_src
                print(f"{YELLOW}Source language set to: {source_lang}{RESET}\n")
                continue

            res = translate(user_input, source_lang, target_lang)
            detected_str = f" [Detected: {res['detected']}]" if res.get("detected") else ""

            print(f"\n{BOLD}{CYAN}------------------------------------------------------{RESET}")
            print(f"{BOLD}Translated ({res['engine']}{detected_str}):{RESET}")
            print(f"{GREEN}{BOLD}➔ {res['text']}{RESET}")
            print(f"{BOLD}{CYAN}------------------------------------------------------{RESET}\n")

        except KeyboardInterrupt:
            print(f"\n{CYAN}Exiting...{RESET}")
            break
        except Exception as e:
            print(f"{RED}Error: {e}{RESET}\n")


def main():
    parser = argparse.ArgumentParser(
        description="OmniTranslate AI - Neural Language Translation CLI (CodeAlpha Task 1)"
    )
    parser.add_argument("-t", "--text", type=str, help="Text to translate")
    parser.add_argument("-s", "--source", type=str, default="auto", help="Source language code (default: auto)")
    parser.add_argument("-d", "--target", type=str, default="es", help="Target language code (default: es)")
    parser.add_argument("--list", action="store_true", help="List supported popular language codes")

    args = parser.parse_args()

    if args.list:
        print(f"\n{BOLD}{CYAN}Supported Popular Languages:{RESET}")
        print(f"{BOLD}{'Code':<10} {'Language':<25}{RESET}")
        print("-" * 35)
        for code, name in LANGUAGES.items():
            print(f"{YELLOW}{code:<10}{RESET} {name}")
        return

    if args.text:
        try:
            res = translate(args.text, args.source, args.target)
            detected_str = f" (Detected: {res['detected']})" if res.get("detected") else ""
            print(f"\n{BOLD}Source [{args.source}]:{RESET} {args.text}")
            print(f"{BOLD}Target [{args.target}]:{RESET} {GREEN}{BOLD}{res['text']}{RESET}{detected_str}")
            print(f"{CYAN}Engine: {res['engine']}{RESET}\n")
        except Exception as e:
            print(f"{RED}Translation error: {e}{RESET}")
            sys.exit(1)
    else:
        interactive_mode()


if __name__ == "__main__":
    main()
