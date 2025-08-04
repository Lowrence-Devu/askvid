#!/usr/bin/env python3
"""
Test script to verify Gemini API key is working
"""

from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv('GEMINI_API_KEY')

if not api_key:
    print("❌ GEMINI_API_KEY not found in environment variables")
    print("Please set it in your .env file")
    exit(1)

print(f"🔑 API Key found: {api_key[:20]}...")

# Configure Gemini
try:
    genai.configure(api_key=api_key)
    print("✅ Gemini configured successfully")
    
    # Test the API
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello! Can you respond with 'API is working'?")
    
    print("✅ API Test Response:")
    print(response.text)
    
except Exception as e:
    print(f"❌ API Test Failed: {str(e)}")
    print("\nPossible solutions:")
    print("1. Check if your API key is correct")
    print("2. Make sure you have billing enabled on Google AI Studio")
    print("3. Try generating a new API key") 