# 🚀 Deployment Guide

This guide will help you deploy AskVid to various cloud platforms.

## Prerequisites

- GitHub repository with your AskVid code
- OpenAI API key
- FFmpeg installed (for local testing)

## Platform Options

### 1. Render (Recommended)

**Pros**: Free tier, easy setup, automatic deployments

1. **Sign up** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**
4. **Configure the service**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment**: Python 3
5. **Add Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `FLASK_SECRET_KEY`: A random secret string
6. **Deploy** and wait for build to complete

### 2. Railway

**Pros**: Simple deployment, good free tier

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Add Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
4. **Deploy** automatically

### 3. Heroku

**Pros**: Mature platform, good documentation

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Set environment variables**:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key_here
   heroku config:set FLASK_SECRET_KEY=your_secret_here
   ```
5. **Deploy**: `git push heroku main`

### 4. Vercel

**Pros**: Fast deployments, good for frontend-heavy apps

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure build settings**:
   - **Framework Preset**: Other
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: `public`
4. **Add Environment Variables** in Vercel dashboard
5. **Deploy**

## Environment Variables

All platforms require these environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key_here
FLASK_SECRET_KEY=your_random_secret_key_here
```

## FFmpeg Installation

Some platforms require FFmpeg for audio processing:

### Render
Add this to your `requirements.txt`:
```
ffmpeg-python==0.2.0
```

### Heroku
Add this buildpack:
```bash
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-ffmpeg-latest.git
```

### Railway
FFmpeg is pre-installed on Railway.

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are in `requirements.txt`
2. **Runtime errors**: Verify environment variables are set correctly
3. **Audio processing fails**: Ensure FFmpeg is available on your platform
4. **API errors**: Check your OpenAI API key and billing status

### Debug Tips

1. **Check logs** in your platform's dashboard
2. **Test locally** first: `python app.py`
3. **Verify API key** works with a simple test
4. **Check FFmpeg** installation: `ffmpeg -version`

## Performance Optimization

1. **Enable caching** for transcriptions
2. **Use CDN** for static files
3. **Optimize audio processing** for large videos
4. **Implement rate limiting** for API calls

## Security Considerations

1. **Never commit** `.env` files
2. **Use HTTPS** in production
3. **Validate user inputs** thoroughly
4. **Implement rate limiting** to prevent abuse
5. **Monitor API usage** to control costs

## Cost Optimization

1. **Monitor OpenAI API usage** in your dashboard
2. **Set usage limits** to prevent unexpected charges
3. **Use appropriate models** (Whisper-1 is cost-effective)
4. **Cache results** when possible

## Monitoring

1. **Set up logging** to track errors
2. **Monitor response times** for API calls
3. **Track user engagement** metrics
4. **Set up alerts** for failures

---

**Need help?** Check the platform-specific documentation or create an issue in the repository. 