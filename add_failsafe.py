import os

file_path = "script.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Append the failsafe right before the FORCE SCROLL TO TOP section
failsafe = """
    // ==========================================================================
    // 12. FAILSAFE AUTO-SKIP
    // ==========================================================================
    setTimeout(() => {
        if (document.body.classList.contains('preloading')) {
            console.warn("Failsafe triggered: Preloader initialization exceeded 5 seconds. Skipping intro screen.");
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
            document.body.classList.remove('preloading');
            
            if (typeof activeIntroAudio !== 'undefined' && activeIntroAudio) {
                activeIntroAudio.pause();
            }
        }
    }, 5000);

"""

insert_pos = content.find("// FORCE SCROLL TO TOP ON PAGE LOAD")
if insert_pos != -1:
    content = content[:insert_pos] + failsafe + content[insert_pos:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Added failsafe to script.js")
else:
    print("Could not find insert position")
