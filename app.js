const BACKEND_URL = 'https://grok-joke-backend-production.up.railway.app';   // ← لینک تو

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
        jokeText.textContent = data.success ? data.joke : "خطا در دریافت جوک 😅";
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
    const fullText = "جوک Grok:\n" + text + "\n\nاز اپ جوک Grok";
    
    if (navigator.share) {
        navigator.share({ title: 'جوک Grok', text: fullText });
    } else {
        navigator.clipboard.writeText(fullText).then(() => {
            alert('جوک کپی شد! حالا شیر کن 😊');
        });
    }
}

document.getElementById('new-joke-btn').addEventListener('click', getNewJoke);
window.onload = getNewJoke;