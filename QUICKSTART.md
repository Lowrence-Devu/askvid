# 🚀 AskVid Quick Start Guide

Get your AI video Q&A app running in 5 minutes!

## ✅ Prerequisites (Already Done!)

- ✅ Python 3.8+ installed
- ✅ All dependencies installed (`pip install -r requirements.txt`)
- ✅ FFmpeg installed (`ffmpeg -version`)
- ✅ All files created and tested

## 🎯 Next Steps

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up/login and create a new API key
3. Copy the key (starts with `sk-`)

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp env_example.txt .env

# Edit the file and add your API key
echo "OPENAI_API_KEY=your_actual_api_key_here" > .env
```

**Replace `your_actual_api_key_here` with your real OpenAI API key**

### 3. Run the Application

```bash
python app.py
```

### 4. Open Your Browser

Navigate to: **http://localhost:5000**

## 🎬 How to Use

1. **Paste a YouTube URL** (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. **Click "Process Video"** and wait for transcription
3. **Ask questions** about the video content
4. **Get AI answers** based on the transcript

## 🧪 Test It Works

Run the test script to verify everything is set up correctly:

```bash
python test_app.py
```

You should see: `🎉 All tests passed!`

## 🚀 Deploy to Production

See `DEPLOYMENT.md` for detailed deployment instructions to:
- Render (recommended)
- Railway
- Heroku
- Vercel

## 🆘 Troubleshooting

### Common Issues:

1. **"No module named 'yt_dlp'"**
   - Run: `pip install -r requirements.txt`

2. **"FFmpeg not found"**
   - macOS: `brew install ffmpeg`
   - Ubuntu: `sudo apt install ffmpeg`

3. **"OpenAI API key error"**
   - Check your `.env` file has the correct API key
   - Verify your OpenAI account has credits

4. **"Video processing fails"**
   - Try a different YouTube video
   - Check the video is publicly accessible

## 📱 Features Ready to Use

- ✅ YouTube video processing
- ✅ AI transcription with Whisper
- ✅ Q&A with GPT-3.5-turbo
- ✅ Beautiful responsive UI
- ✅ Transcript preview
- ✅ Error handling
- ✅ Loading states

## 🎯 Ready to Build!

Your AskVid app is now ready to use! 

**Next steps:**
1. Test with a YouTube video
2. Customize the UI if needed
3. Deploy to share with others
4. Add more features (see README.md for ideas)

---

**Happy coding! 🎉** 