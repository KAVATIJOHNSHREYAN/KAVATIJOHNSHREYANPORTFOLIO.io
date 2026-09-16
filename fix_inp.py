import os

file_path = "script.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the INP issue
old_click_listener = """    if (startBtn && preloader) {
        startBtn.addEventListener('click', () => {
            // 1. Play Sound
            playIntroSound();
            
            // 2. Transition Start Screen to Animation Screen
            startScreen.classList.add('fade-out');
            
            setTimeout(() => {
                startScreen.style.display = 'none';
                animScreen.classList.remove('hidden');"""

new_click_listener = """    if (startBtn && preloader) {
        startBtn.addEventListener('click', () => {
            // Fix INP Issue: Initialize AudioContext in the user gesture synchronously
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            
            // Fix INP Issue: Yield to main thread so the browser can paint the click interaction
            setTimeout(() => {
                // 1. Play Sound
                playIntroSound();
                
                // 2. Transition Start Screen to Animation Screen
                startScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    startScreen.style.display = 'none';
                    animScreen.classList.remove('hidden');"""

# We also need to fix playIntroSound so it doesn't try to resume context again if it's already doing it
old_play_intro = """            const ctx = getAudioContext();
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            
            const now = ctx.currentTime;"""

new_play_intro = """            const ctx = getAudioContext();
            // Context is already resumed in the click handler
            const now = ctx.currentTime;"""

content = content.replace(old_click_listener, new_click_listener)
content = content.replace(old_play_intro, new_play_intro)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed INP issue in script.js")
