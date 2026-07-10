file_path = "script.js"

scroll_script = """

// ==========================================================================
// FORCE SCROLL TO TOP ON PAGE LOAD
// ==========================================================================
// Prevent browser from remembering the scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top when page is fully loaded or refreshed
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.scrollTo(0, 0);
"""

with open(file_path, "a", encoding="utf-8") as f:
    f.write(scroll_script)
print("Appended scroll restoration script to script.js")
