#!/usr/bin/env python3
"""
OmniTranslate AI - Automated Test Suite
CodeAlpha Artificial Intelligence Internship - Task 1: Language Translation Tool
"""

import sys
import unittest
from translator_cli import translate

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

class TestOmniTranslate(unittest.TestCase):
    def test_english_to_spanish(self):
        result = translate("Hello, world!", source="en", target="es")
        self.assertTrue(result["text"])
        self.assertIn("hola", result["text"].lower())
        print(f"✓ English -> Spanish: 'Hello, world!' => '{result['text']}' [{result['engine']}]")

    def test_english_to_french(self):
        result = translate("Good morning, have a great day!", source="en", target="fr")
        self.assertTrue(result["text"])
        self.assertTrue(any(w in result["text"].lower() for w in ["bonjour", "bonne", "journée"]))
        print(f"✓ English -> French: '{result['text']}' [{result['engine']}]")

    def test_english_to_german(self):
        result = translate("Thank you very much.", source="en", target="de")
        self.assertTrue(result["text"])
        self.assertTrue(any(w in result["text"].lower() for w in ["danke", "vielen"]))
        print(f"✓ English -> German: '{result['text']}' [{result['engine']}]")

    def test_english_to_japanese(self):
        result = translate("Thank you", source="en", target="ja")
        self.assertTrue(result["text"])
        print(f"✓ English -> Japanese: '{result['text']}' [{result['engine']}]")

    def test_english_to_arabic(self):
        result = translate("Peace be upon you", source="en", target="ar")
        self.assertTrue(result["text"])
        print(f"✓ English -> Arabic: '{result['text']}' [{result['engine']}]")

    def test_english_to_hindi(self):
        result = translate("Welcome to the team", source="en", target="hi")
        self.assertTrue(result["text"])
        print(f"✓ English -> Hindi: '{result['text']}' [{result['engine']}]")

    def test_auto_detect_spanish(self):
        result = translate("Buenos días a todos mis amigos", source="auto", target="en")
        self.assertTrue(result["text"])
        self.assertEqual(result.get("detected"), "es")
        print(f"✓ Auto-Detect Spanish: Detected '{result.get('detected')}' => '{result['text']}'")

    def test_auto_detect_french(self):
        result = translate("Je suis très heureux d'apprendre l'intelligence artificielle", source="auto", target="en")
        self.assertTrue(result["text"])
        self.assertEqual(result.get("detected"), "fr")
        print(f"✓ Auto-Detect French: Detected '{result.get('detected')}' => '{result['text']}'")

if __name__ == "__main__":
    print("=" * 60)
    print(" Running OmniTranslate AI Verification Test Suite")
    print("=" * 60)
    unittest.main(verbosity=2)
