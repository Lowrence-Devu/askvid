#!/usr/bin/env python3
"""
Simple test script to verify AskVid app can start without errors.
This doesn't test the full functionality but ensures basic setup is correct.
"""

import os
import sys
from unittest.mock import patch

def test_imports():
    """Test that all required modules can be imported."""
    try:
        import flask
        import requests
        import openai
        import yt_dlp
        import pydub
        from dotenv import load_dotenv
        print("✅ All required modules imported successfully")
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_flask_app():
    """Test that Flask app can be created."""
    try:
        # Mock OpenAI API key for testing
        with patch.dict(os.environ, {'OPENAI_API_KEY': 'test_key'}):
            from app import app
            print("✅ Flask app created successfully")
            return True
    except Exception as e:
        print(f"❌ Flask app creation failed: {e}")
        return False

def test_templates_exist():
    """Test that required template files exist."""
    required_files = [
        'templates/index.html',
        'static/css/style.css',
        'static/js/app.js'
    ]
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        print(f"❌ Missing files: {missing_files}")
        return False
    else:
        print("✅ All required files exist")
        return True

def main():
    """Run all tests."""
    print("🧪 Testing AskVid application setup...\n")
    
    tests = [
        ("Module Imports", test_imports),
        ("Flask App Creation", test_flask_app),
        ("File Structure", test_templates_exist)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"Testing {test_name}...")
        if test_func():
            passed += 1
        print()
    
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your AskVid app is ready to run.")
        print("\nNext steps:")
        print("1. Create a .env file with your OpenAI API key")
        print("2. Install FFmpeg: brew install ffmpeg (macOS) or apt install ffmpeg (Ubuntu)")
        print("3. Run: python app.py")
        print("4. Open: http://localhost:5000")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main() 