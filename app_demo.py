from flask import Flask, render_template, request, jsonify
import os
import requests
import json
import yt_dlp
from pydub import AudioSegment
import tempfile
import re

app = Flask(__name__)

def extract_video_id(url):
    """Extract YouTube video ID from URL"""
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)',
        r'youtube\.com\/v\/([^&\n?#]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def download_audio(url, output_path):
    """Download audio from YouTube video"""
    # Extract directory and filename
    output_dir = os.path.dirname(output_path)
    output_filename = os.path.basename(output_path)
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(output_dir, '%(title)s.%(ext)s'),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        'ignoreerrors': False,
        'no_warnings': False,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            
            # Find the downloaded file
            downloaded_files = [f for f in os.listdir(output_dir) if f.endswith('.mp3')]
            if downloaded_files:
                downloaded_file = os.path.join(output_dir, downloaded_files[0])
                os.rename(downloaded_file, output_path)
                return True
            else:
                return False
                
    except Exception as e:
        print(f"Download failed: {str(e)}")
        return False

def mock_transcribe_audio(audio_path):
    """Mock transcription for demo purposes"""
    return "This is a demo transcript of the video. The video appears to be about music and entertainment. The content includes various topics that would normally be transcribed from the audio."

def mock_ai_answer(question, transcript):
    """Mock AI answer for demo purposes"""
    demo_answers = {
        "what is this video about": "This video appears to be about music and entertainment. Based on the transcript, it contains various topics that would be interesting to viewers.",
        "summary": "This is a demo summary of the video content. The video covers multiple topics and provides entertainment value to its audience.",
        "give me a summary": "The video contains various segments covering different topics. It appears to be an entertaining piece of content with multiple themes.",
        "what happens": "The video includes various scenes and content that would normally be described in detail. It's an engaging piece of media.",
    }
    
    question_lower = question.lower()
    for key, answer in demo_answers.items():
        if key in question_lower:
            return answer
    
    return "This is a demo response. In a real implementation, this would be an AI-generated answer based on the video transcript. The question was: " + question

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_video', methods=['POST'])
def process_video():
    try:
        data = request.get_json()
        video_url = data.get('video_url')
        
        if not video_url:
            return jsonify({'error': 'No video URL provided'}), 400
        
        # Extract video ID
        video_id = extract_video_id(video_url)
        if not video_id:
            return jsonify({'error': 'Invalid YouTube URL'}), 400
        
        # Create temporary directory for audio
        with tempfile.TemporaryDirectory() as temp_dir:
            audio_path = os.path.join(temp_dir, 'audio.mp3')
            
            # Download audio
            download_success = download_audio(video_url, audio_path)
            
            # Check if audio file was created
            if not download_success or not os.path.exists(audio_path):
                return jsonify({'error': 'Failed to download audio from video. Please try a different YouTube URL.'}), 500
            
            # Mock transcription
            transcript = mock_transcribe_audio(audio_path)
            
            return jsonify({
                'success': True,
                'transcript': transcript,
                'video_id': video_id
            })
    
    except Exception as e:
        return jsonify({'error': f'Error processing video: {str(e)}'}), 500

@app.route('/ask_question', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        question = data.get('question')
        transcript = data.get('transcript')
        
        if not question or not transcript:
            return jsonify({'error': 'Question and transcript are required'}), 400
        
        # Get mock AI answer
        answer = mock_ai_answer(question, transcript)
        
        return jsonify({
            'success': True,
            'answer': answer
        })
    
    except Exception as e:
        return jsonify({'error': f'Error getting answer: {str(e)}'}), 500

if __name__ == '__main__':
    print("🚀 AskVid Demo Mode - No OpenAI API Key Required!")
    print("📝 This is a demo version with mock responses")
    print("🌐 App running at: http://localhost:5002")
    app.run(debug=True, port=5002) 