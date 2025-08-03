# 🎥 AskVid - AI Video Question Answering

Your AI tutor for any YouTube video! Upload a YouTube link, and AskVid will transcribe the video and answer your questions about it.

## ✨ Features

- **🎬 YouTube Video Processing**: Paste any YouTube URL and extract audio
- **🎤 AI Transcription**: Convert video speech to text using OpenAI Whisper
- **🤖 AI Q&A**: Ask questions and get intelligent answers based on the video content
- **📝 Transcript Preview**: View the full transcript with collapsible interface
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **⚡ Real-time Processing**: Fast, efficient video processing and Q&A

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- OpenAI API key
- FFmpeg (for audio processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd askvid
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install FFmpeg**
   - **macOS**: `brew install ffmpeg`
   - **Ubuntu/Debian**: `sudo apt install ffmpeg`
   - **Windows**: Download from [FFmpeg website](https://ffmpeg.org/download.html)

4. **Set up environment variables**
   ```bash
   cp env_example.txt .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 🛠️ How It Works

1. **Video Input**: User pastes a YouTube URL
2. **Audio Extraction**: The app downloads and extracts audio from the video
3. **Transcription**: OpenAI Whisper converts speech to text
4. **Q&A Interface**: Users can ask questions about the video content
5. **AI Answers**: GPT-3.5-turbo provides intelligent answers based on the transcript

## 🎯 Usage

1. **Paste a YouTube URL** in the input field
2. **Click "Process Video"** and wait for transcription
3. **Ask questions** about the video content
4. **View answers** from the AI tutor
5. **Toggle transcript** to see the full video text

## 🏗️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI Services**: OpenAI (Whisper + GPT-3.5-turbo)
- **Video Processing**: yt-dlp, FFmpeg
- **Styling**: Custom CSS with gradients and animations

## 📁 Project Structure

```
askvid/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── env_example.txt       # Environment variables template
├── README.md            # This file
├── templates/
│   └── index.html       # Main HTML template
└── static/
    ├── css/
    │   └── style.css    # Custom styles
    └── js/
        └── app.js       # Frontend JavaScript
```

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `FLASK_SECRET_KEY`: Secret key for Flask sessions (optional)

### API Keys Setup

1. **OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env` file

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production Deployment

#### Option 1: Render
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a Python web service

#### Option 2: Heroku
1. Install Heroku CLI
2. Create `Procfile`:
   ```
   web: gunicorn app:app
   ```
3. Deploy: `heroku create && git push heroku main`

#### Option 3: Railway
1. Connect your GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

## 🎨 Customization

### Styling
- Edit `static/css/style.css` to customize colors, fonts, and layout
- The app uses CSS Grid and Flexbox for responsive design
- Gradient backgrounds and smooth animations included

### Features
- Add new AI models by modifying the `get_ai_answer()` function
- Implement video summarization in `app.py`
- Add user authentication and history tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the Whisper and GPT APIs
- yt-dlp for YouTube video processing
- Font Awesome for icons
- Inter font family for typography

## 📞 Support

If you encounter any issues:

1. Check that all dependencies are installed
2. Verify your OpenAI API key is correct
3. Ensure FFmpeg is installed and accessible
4. Check the browser console for JavaScript errors

## 🎯 Future Enhancements

- [ ] Video summarization
- [ ] Quiz generation from video content
- [ ] Multiple language support
- [ ] Voice-to-text for questions
- [ ] User accounts and history
- [ ] Batch processing for multiple videos
- [ ] Export transcripts and Q&A sessions

---

**Built with ❤️ for learners everywhere**

*AskVid - Making video learning smarter, one question at a time.* 