// Global variables
let currentTranscript = '';
let isTranscriptVisible = false;

// DOM elements
const videoUrlInput = document.getElementById('videoUrl');
const processBtn = document.getElementById('processBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const qaSection = document.getElementById('qaSection');
const questionInput = document.getElementById('questionInput');
const askBtn = document.getElementById('askBtn');
const answerContainer = document.getElementById('answerContainer');
const answerText = document.getElementById('answerText');
const questionLoading = document.getElementById('questionLoading');
const transcriptSection = document.getElementById('transcriptSection');
const transcriptText = document.getElementById('transcriptText');
const toggleTranscriptBtn = document.getElementById('toggleTranscript');
const transcriptContent = document.getElementById('transcriptContent');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    processBtn.addEventListener('click', processVideo);
    askBtn.addEventListener('click', askQuestion);
    toggleTranscriptBtn.addEventListener('click', toggleTranscript);
    
    // Add analyze button event listener
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeTopics);
    }
    
    // Enter key support
    videoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processVideo();
        }
    });
    
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askQuestion();
        }
    });
});

// Process video function
async function processVideo() {
    const videoUrl = videoUrlInput.value.trim();
    
    if (!videoUrl) {
        showError('Please enter a YouTube URL');
        return;
    }
    
    if (!isValidYouTubeUrl(videoUrl)) {
        showError('Please enter a valid YouTube URL');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    hideError();
    
    try {
        const response = await fetch('/process_video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ video_url: videoUrl })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentTranscript = data.transcript;
            showQASection();
            showTranscriptSection();
            showSuccess('Video processed successfully! You can now ask questions.');
        } else {
            showError(data.error || 'Failed to process video');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

// Ask question function
async function askQuestion() {
    const question = questionInput.value.trim();
    
    if (!question) {
        showError('Please enter a question');
        return;
    }
    
    if (!currentTranscript) {
        showError('No video transcript available. Please process a video first.');
        return;
    }
    
    // Show question loading
    questionLoading.classList.remove('hidden');
    answerContainer.classList.add('hidden');
    hideError();
    
    try {
        const response = await fetch('/ask_question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                question: question,
                transcript: currentTranscript 
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAnswer(data.answer);
        } else {
            showError(data.error || 'Failed to get answer');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Please try again.');
    } finally {
        questionLoading.classList.add('hidden');
    }
}

// Analyze topics function
async function analyzeTopics() {
    if (!currentTranscript) {
        showError('No video transcript available. Please process a video first.');
        return;
    }
    
    // Show analysis loading
    questionLoading.classList.remove('hidden');
    answerContainer.classList.add('hidden');
    hideError();
    
    try {
        const response = await fetch('/analyze_topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                transcript: currentTranscript 
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAnswer(data.analysis);
        } else {
            showError(data.error || 'Failed to analyze topics');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Please try again.');
    } finally {
        questionLoading.classList.add('hidden');
    }
}

// Toggle transcript visibility
function toggleTranscript() {
    isTranscriptVisible = !isTranscriptVisible;
    
    if (isTranscriptVisible) {
        transcriptContent.classList.remove('hidden');
        transcriptContent.classList.add('slide-down');
        toggleTranscriptBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        transcriptText.textContent = currentTranscript;
    } else {
        transcriptContent.classList.add('hidden');
        toggleTranscriptBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    }
}

// Show Q&A section
function showQASection() {
    qaSection.classList.remove('hidden');
    qaSection.classList.add('fade-in');
    questionInput.focus();
}

// Show transcript section
function showTranscriptSection() {
    transcriptSection.classList.remove('hidden');
    transcriptSection.classList.add('fade-in');
}

// Show answer
function showAnswer(answer) {
    // Check if this is an analysis (contains structured sections)
    if (answer.includes('**📋 MAIN TOPICS COVERED:**') || 
        answer.includes('**🎯 KEY POINTS & INSIGHTS:**') ||
        answer.includes('**📚 DETAILED BREAKDOWN:**')) {
        // Format as structured analysis
        answerText.innerHTML = formatAnalysisAnswer(answer);
    } else {
        // Regular answer
        answerText.textContent = answer;
    }
    answerContainer.classList.remove('hidden');
    answerContainer.classList.add('fade-in');
}

// Format analysis answer with proper HTML structure
function formatAnalysisAnswer(answer) {
    // Convert markdown-style formatting to HTML
    let formatted = answer
        .replace(/\*\*📋 MAIN TOPICS COVERED:\*\*/g, '<h3 class="analysis-section">📋 MAIN TOPICS COVERED</h3>')
        .replace(/\*\*🎯 KEY POINTS & INSIGHTS:\*\*/g, '<h3 class="analysis-section">🎯 KEY POINTS & INSIGHTS</h3>')
        .replace(/\*\*📚 DETAILED BREAKDOWN:\*\*/g, '<h3 class="analysis-section">📚 DETAILED BREAKDOWN</h3>')
        .replace(/\*\*💡 PRACTICAL APPLICATIONS:\*\*/g, '<h3 class="analysis-section">💡 PRACTICAL APPLICATIONS</h3>')
        .replace(/\*\*📖 COMPREHENSIVE SUMMARY:\*\*/g, '<h3 class="analysis-section">📖 COMPREHENSIVE SUMMARY</h3>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\* /g, '<br>• ')
        .replace(/\n- /g, '<br>• ')
        .replace(/\n\n/g, '<br><br>');
    
    return formatted;
}

// Set loading state
function setLoadingState(loading) {
    if (loading) {
        loadingIndicator.classList.remove('hidden');
        processBtn.disabled = true;
        processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    } else {
        loadingIndicator.classList.add('hidden');
        processBtn.disabled = false;
        processBtn.innerHTML = '<i class="fas fa-magic"></i> Process Video';
    }
}

// Show error message
function showError(message) {
    // Remove existing error messages
    hideError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        border: 1px solid #f5c6cb;
        text-align: center;
    `;
    errorDiv.textContent = message;
    
    const inputContainer = document.querySelector('.input-container');
    inputContainer.appendChild(errorDiv);
}

// Hide error message
function hideError() {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Show success message
function showSuccess(message) {
    // Remove existing messages
    hideError();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        border: 1px solid #c3e6cb;
        text-align: center;
    `;
    successDiv.textContent = message;
    
    const inputContainer = document.querySelector('.input-container');
    inputContainer.appendChild(successDiv);
    
    // Auto-remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// Validate YouTube URL
function isValidYouTubeUrl(url) {
    const patterns = [
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/v\//
    ];
    
    return patterns.some(pattern => pattern.test(url));
}

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to process video
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement === videoUrlInput) {
            processVideo();
        } else if (document.activeElement === questionInput) {
            askQuestion();
        }
    }
}); 