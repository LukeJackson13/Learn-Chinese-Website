// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Reads Chinese text aloud using the browser's built-in speech (needs a Chinese voice installed;
// Edge and Chrome on Windows include one). Prefers a Taiwan voice to match TOCFL listening.
function speakChinese(text) {
    if (!('speechSynthesis' in window) || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => /zh[-_]TW/i.test(v.lang)) || voices.find(v => /zh[-_]CN/i.test(v.lang));
    utterance.lang = voice ? voice.lang : 'zh-TW';
    utterance.rate = 0.8;
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
}

// Any element with class "speak" and a data-text attribute becomes a listen button.
document.addEventListener('click', e => {
    const button = e.target.closest('.speak');
    if (button) speakChinese(button.dataset.text);
});
