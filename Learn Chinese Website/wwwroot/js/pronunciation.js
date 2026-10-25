// Pinyin sound cards: builds Play / Slow / Word buttons for each .btns box and speaks with a chosen Chinese voice.
(() => {
    const icon = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z"/></svg>';
    const synth = window.speechSynthesis;
    const sel = document.getElementById('voiceSel');
    const note = document.getElementById('voiceNote');
    let voices = [], voice = null;

    function score(v) {
        let n = 0;
        if (/zh[-_]TW/i.test(v.lang)) n += 100;
        else if (/zh[-_]CN|cmn/i.test(v.lang)) n += 50;
        else if (/^zh/i.test(v.lang)) n += 30;
        if (/natural|online|neural/i.test(v.name)) n += 40;
        if (/google/i.test(v.name)) n += 20;
        return n;
    }

    function loadVoices() {
        if (!synth) return;
        voices = synth.getVoices().filter(v => /^(zh|cmn)/i.test(v.lang)).sort((a, b) => score(b) - score(a));
        let saved = null; try { saved = localStorage.getItem('voice'); } catch (e) {}
        sel.innerHTML = '';
        voices.forEach((v, i) => { const o = document.createElement('option'); o.value = i; o.textContent = v.name + ' (' + v.lang + ')'; sel.appendChild(o); });
        const si = voices.findIndex(v => v.name === saved);
        voice = voices[si >= 0 ? si : 0] || null;
        if (voice) sel.value = voices.indexOf(voice);
        sel.disabled = !voices.length;
        if (voice) { note.textContent = 'Tip: voices with "Natural" or "Online" in the name sound clearest. Turn your device volume up, as browser voices play fairly quietly.'; note.removeAttribute('data-warn'); }
        else if (synth.getVoices().length) { note.textContent = 'No Chinese voice found. Open this page in Microsoft Edge, or use the Real voice links.'; note.setAttribute('data-warn', ''); }
    }

    sel.addEventListener('change', () => { voice = voices[sel.value]; try { localStorage.setItem('voice', voice.name); } catch (e) {} });
    if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; setTimeout(loadVoices, 800); }
    else { note.textContent = 'This browser cannot play speech. Use the Real voice links instead.'; note.setAttribute('data-warn', ''); }

    // Keep the audio output awake so the start of the first sound is not cut off.
    let keepAlive = null;
    function wakeAudio() {
        if (keepAlive) { if (keepAlive.state === 'suspended') keepAlive.resume(); return; }
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            keepAlive = new AC();
            const osc = keepAlive.createOscillator(), g = keepAlive.createGain();
            osc.frequency.value = 20; g.gain.value = 0.0005;
            osc.connect(g).connect(keepAlive.destination); osc.start();
        } catch (e) {}
    }

    function say(text, rate, btn, warm) {
        if (!synth) return;
        const firstTime = !keepAlive;
        wakeAudio();
        synth.cancel();
        // Silent warm-up: the first syllable after the engine starts often comes out wrong, so it is spoken at zero volume first.
        const w = new SpeechSynthesisUtterance(warm);
        w.lang = voice ? voice.lang : 'zh-TW';
        if (voice) w.voice = voice;
        w.volume = 0; w.rate = 1.3;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = voice ? voice.lang : 'zh-TW';
        if (voice) u.voice = voice;
        u.rate = rate; u.volume = 1; u.pitch = 1;
        document.querySelectorAll('.pron button[aria-pressed="true"]').forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        u.onend = u.onerror = () => btn.setAttribute('aria-pressed', 'false');
        setTimeout(() => { synth.speak(w); synth.speak(u); }, firstTime ? 600 : 150);
    }

    document.querySelectorAll('.pron .btns').forEach(box => {
        const t = box.dataset.say, w = box.dataset.word;
        // Leading pause stops the first sound being clipped; repeating with pauses gives a longer, clearer sample.
        const rep = '，' + [t, t, t].join('。　');
        [['Play', rep, 0.75, ''], ['Slow', '，' + t + '。　' + t, 0.45, 'slow'], ['Word', '，' + w + '。　' + w, 0.7, 'slow']].forEach(([label, text, rate, cls]) => {
            const b = document.createElement('button');
            b.type = 'button'; b.className = cls; b.setAttribute('aria-pressed', 'false');
            b.setAttribute('aria-label', label + ' ' + t);
            b.innerHTML = icon + label;
            b.addEventListener('click', () => say(text, rate, b, t));
            box.appendChild(b);
        });
        const a = document.createElement('a');
        a.className = 'real'; a.href = 'https://forvo.com/word/' + encodeURIComponent(t) + '/#zh'; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'Real voice ↗';
        box.appendChild(a);
    });
})();
