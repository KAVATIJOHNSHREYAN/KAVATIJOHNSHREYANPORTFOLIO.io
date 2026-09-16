import os

file_path = "script.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the start and end of the startBtn block and replace it cleanly
start_marker = "if (startBtn && preloader) {"
end_marker = "    } else {\n        // Fallback if elements not found"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    correct_block = """    if (startBtn && preloader) {
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
                    animScreen.classList.remove('hidden');
                    
                    // 3. Trigger coordinated animations
                    carContainer.classList.add('active');
                    if (introName) introName.classList.add('active');
                    
                    // 4. Fade out preloader overlay after name stays visible
                    setTimeout(() => {
                        preloader.classList.add('fade-out');
                        document.body.classList.remove('preloading');
                        
                        // Smoothly fade out and stop the custom car sound over 800ms
                        if (activeIntroAudio) {
                            fadeAndStopAudio(activeIntroAudio, 800);
                        }
                        
                        // Hide preloader element
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 800);
                        
                    }, 4300); // Allow letters to appear slowly, car to drive away, and name to stay visible before fading
                    
                }, 500); // Wait for start screen fade out
            }, 0); // Yield to main thread
        });
"""
    content = content[:start_idx] + correct_block + content[end_idx:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed script.js syntax error in startBtn listener.")
else:
    print("Could not find block to replace.")
