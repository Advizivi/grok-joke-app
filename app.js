const BACKEND_URL = 'https://grok-joke-backend-production.up.railway.app';

async function getNewJoke() {
    const btn = document.getElementById('new-joke-btn');
    const jokeText = document.getElementById('joke-text');
    
    btn.disabled = true;
    btn.textContent = "در حال فکر کردن... 🤔";
    jokeText.textContent = "Grok داره جوک می‌سازه...";

    try {
        const response = await fetch(`${BACKEND_URL}/joke`);
        if (!response.ok) throw new Error('Server error');
        
        const data = await response.json();
        jokeText.textContent = data.joke || "جوک آماده نشد 😅";
    } catch (error) {
        jokeText.textContent = "اتصال به سرور برقرار نشد. اینترنت رو چک کن.";
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.textContent = "جوک جدید بگیر 😆";
    }
}

function shareJoke() {
    const text = document.getElementById('joke-text').textContent;
    const fullText = text + "\n\nاز اپ جوک Grok:\nhttps://advizivi.github.io/grok-joke-app/";
    
    if (navigator.share) {
        navigator.share({
            title: 'جوک Grok',
            text: fullText
        });
    } else {
        navigator.clipboard.writeText(fullText).then(() => {
            alert('جوک + لینک کپی شد! حالا تو واتساپ یا اینستا شیر کن 😊');
        });
    }
}

document.getElementById('new-joke-btn').addEventListener('click', getNewJoke);
window.onload = getNewJoke;
