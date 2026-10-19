#!/usr/bin/env python3
"""
OmniTranslate AI - Local HTTP Server & API Proxy
CodeAlpha Artificial Intelligence Internship - Task 1: Language Translation Tool

This server uses only the Python standard library (no pip packages required).
It serves static web assets (HTML, CSS, JS) and provides a local backend API proxy
for translation requests to guarantee zero CORS issues under any environment.
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class TranslationRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Route API requests
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == "/api/translate":
            self.handle_translate_api(parsed_url.query)
        elif parsed_url.path == "/api/health":
            self.send_json_response({"status": "healthy", "service": "OmniTranslate AI"})
        else:
            # Default static file serving
            super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == "/api/translate":
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(post_data)
                text = data.get("text", "")
                source = data.get("source", "auto")
                target = data.get("target", "es")
                self.process_translation(text, source, target)
            except Exception as e:
                self.send_json_response({"error": str(e)}, status=400)
        else:
            self.send_error(404, "Endpoint not found")

    def handle_translate_api(self, query_string):
        params = urllib.parse.parse_qs(query_string)
        text = params.get("text", [""])[0]
        source = params.get("source", ["auto"])[0]
        target = params.get("target", ["es"])[0]
        self.process_translation(text, source, target)

    def process_translation(self, text, source, target):
        if not text:
            self.send_json_response({"error": "No text provided for translation"}, status=400)
            return

        # Attempt 1: Google Translate Chrome Client
        try:
            encoded_text = urllib.parse.quote(text)
            url = f"https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl={source}&tl={target}&q={encoded_text}"
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            )
            with urllib.request.urlopen(req, timeout=8) as response:
                raw_data = response.read().decode("utf-8")
                parsed = json.loads(raw_data)

                translated_text = ""
                detected_lang = None

                if isinstance(parsed, list):
                    if len(parsed) > 0 and isinstance(parsed[0], list):
                        translated_text = " ".join([item[0] for item in parsed if isinstance(item, list)])
                        if len(parsed[0]) > 1:
                            detected_lang = parsed[0][1]
                    elif len(parsed) > 0 and isinstance(parsed[0], str):
                        translated_text = " ".join(parsed)

                self.send_json_response({
                    "success": True,
                    "engine": "google",
                    "source": source,
                    "target": target,
                    "detected_lang": detected_lang,
                    "translated_text": translated_text
                })
                return
        except Exception as e:
            print(f"[Warning] Google Engine error: {e}. Trying MyMemory fallback...", file=sys.stderr)

        # Attempt 2: MyMemory API Fallback
        try:
            sl = "en" if source == "auto" else source
            encoded_text = urllib.parse.quote(text)
            url = f"https://api.mymemory.translated.net/get?q={encoded_text}&langpair={sl}|{target}"
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                raw_data = response.read().decode("utf-8")
                parsed = json.loads(raw_data)
                translated_text = parsed.get("responseData", {}).get("translatedText", "")

                self.send_json_response({
                    "success": True,
                    "engine": "mymemory",
                    "source": source,
                    "target": target,
                    "detected_lang": None,
                    "translated_text": translated_text
                })
                return
        except Exception as e:
            print(f"[Error] MyMemory fallback failed: {e}", file=sys.stderr)
            self.send_json_response({"error": "Translation service unavailable", "details": str(e)}, status=502)

    def send_json_response(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), TranslationRequestHandler) as httpd:
        print("=" * 60)
        print(" OmniTranslate AI - Local Server Running")
        print(f" URL: http://localhost:{PORT}")
        print(" CodeAlpha AI Task 1: Language Translation Tool")
        print(" Press Ctrl+C to stop the server")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down OmniTranslate AI server...")
            httpd.server_close()


if __name__ == "__main__":
    start_server()
