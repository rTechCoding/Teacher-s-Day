/* ==========================================================================
   Background Music & Audio Engine (js/audio.js)
   - Procedural Web Audio Synthesizer (Lofi, Chimes, Acoustic)
   - HTML5 Audio Element & Custom File Upload (Strict 3MB Limit)
   - LocalStorage State Persistence & Navbar Audio Controls
   ========================================================================== */

const MAX_AUDIO_SIZE = 3 * 1024 * 1024; // 3MB in bytes
let audioCtx = null;
let isAudioPlaying = true; // Auto-play enabled by default
let isAudioMuted = false;
let audioVolume = 0.5;
let currentTrack = "lofi";
let synthTimer = null;
let bgAudio = new Audio();
bgAudio.loop = true;
let customAudioData = null;
let customAudioName = "";

// Initialize Audio Context lazily on user gesture
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play Procedural Web Audio Synth Notes
function playSynthNote(freq, type = 'sine', duration = 0.8, delay = 0, volFactor = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;

  setTimeout(() => {
    if (!isAudioPlaying || isAudioMuted) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const masterVol = isAudioMuted ? 0 : audioVolume * 0.18 * volFactor;
      gain.gain.setValueAtTime(masterVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {
      console.warn("Synth note error:", e);
    }
  }, delay * 1000);
}

// Start Active Music Track Loop
function startSynthLoop() {
  stopSynthLoop();
  if (!isAudioPlaying) return;

  if (currentTrack === 'custom') {
    if (bgAudio.src) {
      bgAudio.volume = isAudioMuted ? 0 : audioVolume;
      bgAudio.play().catch(e => console.warn("Audio play blocked by browser:", e));
    }
    return;
  }

  bgAudio.pause();
  let step = 0;

  synthTimer = setInterval(() => {
    if (!isAudioPlaying || isAudioMuted) return;

    if (currentTrack === 'lofi') {
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [293.66, 349.23, 440.00, 523.25], // Dm7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ];
      const currentChord = chords[step % chords.length];
      currentChord.forEach((freq, idx) => {
        playSynthNote(freq, 'sine', 1.8, idx * 0.15, 0.4);
      });
      step++;
    } else if (currentTrack === 'chimes') {
      const chimeScale = [523.25, 659.25, 783.99, 987.77, 1046.50, 1174.66];
      const randomFreq = chimeScale[Math.floor(Math.random() * chimeScale.length)];
      playSynthNote(randomFreq, 'sine', 1.2, 0, 0.5);
      if (Math.random() > 0.4) {
        const secondary = chimeScale[Math.floor(Math.random() * chimeScale.length)];
        playSynthNote(secondary, 'triangle', 1.0, 0.2, 0.3);
      }
    } else if (currentTrack === 'acoustic') {
      const acousticScale = [261.63, 329.63, 392.00, 523.25, 659.25];
      const freq = acousticScale[step % acousticScale.length];
      playSynthNote(freq, 'triangle', 1.0, 0, 0.6);
      step++;
    } else if (currentTrack === 'kahani') {
      // Kahani: Soft storytelling melody in F Major
      const kahaniChords = [
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [261.63, 329.63, 392.00, 523.25], // Cmaj7
        [293.66, 349.23, 440.00, 587.33], // Dm7
        [220.00, 261.63, 329.63, 440.00]  // Am
      ];
      const chord = kahaniChords[step % kahaniChords.length];
      chord.forEach((freq, idx) => {
        playSynthNote(freq, 'sine', 2.0, idx * 0.18, 0.5);
      });
      const leadNotes = [523.25, 659.25, 587.33, 440.00, 523.25, 392.00, 349.23, 440.00];
      playSynthNote(leadNotes[step % leadNotes.length], 'triangle', 1.2, 0.4, 0.7);
      step++;
    } else if (currentTrack === 'jhumritalaiyya') {
      // Jhumritalaiyya: Bright upbeat rhythmic folk melody in G Major
      const jhumriNotes = [392.00, 440.00, 493.88, 587.33, 659.25, 783.99, 659.25, 587.33];
      const bassNotes = [196.00, 246.94, 293.66, 196.00];
      const mainFreq = jhumriNotes[step % jhumriNotes.length];
      const bassFreq = bassNotes[step % bassNotes.length];
      playSynthNote(mainFreq, 'triangle', 0.6, 0, 0.7);
      playSynthNote(mainFreq * 0.5, 'sine', 0.8, 0.1, 0.4);
      playSynthNote(bassFreq, 'sine', 1.0, 0, 0.5);
      if (step % 2 === 0) {
        playSynthNote(783.99, 'sine', 0.4, 0.3, 0.4);
      }
      step++;
    } else if (currentTrack === 'maiyya') {
      // Maiyya: Warm soulful devotional melody in D Major
      const maiyyaMelody = [293.66, 369.99, 440.00, 587.33, 554.37, 440.00, 369.99, 293.66];
      const maiyyaDrone = [146.83, 220.00];
      const freq = maiyyaMelody[step % maiyyaMelody.length];
      playSynthNote(freq, 'sine', 1.8, 0, 0.75);
      playSynthNote(freq * 1.5, 'sine', 1.2, 0.2, 0.35);
      maiyyaDrone.forEach((droneFreq, i) => {
        playSynthNote(droneFreq, 'triangle', 2.2, i * 0.1, 0.3);
      });
      step++;
    }
  }, (currentTrack === 'chimes' || currentTrack === 'jhumritalaiyya') ? 800 : (currentTrack === 'maiyya' ? 1400 : 1600));
}

// Stop Music Loop
function stopSynthLoop() {
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
  if (bgAudio) {
    bgAudio.pause();
  }
}

// Toggle Play / Pause Audio
function toggleAudioPlay() {
  isAudioPlaying = !isAudioPlaying;
  if (isAudioPlaying) {
    getAudioContext();
    startSynthLoop();
    if (typeof showToast === 'function') showToast("🎵 Background music playing!");
  } else {
    stopSynthLoop();
    if (typeof showToast === 'function') showToast("⏸️ Background music paused.");
  }
  updateAudioUI();
  try {
    localStorage.setItem("teachersDay_bgMusicPlaying", isAudioPlaying ? "true" : "false");
  } catch(e) {}
}

// Update Music UI Controls & Badges
function updateAudioUI() {
  const playBtn = document.querySelector("#bgMusicPlayBtn");
  const playIcon = document.querySelector("#musicPlayIcon");
  const playText = document.querySelector("#musicPlayText");
  const muteBtn = document.querySelector("#bgMusicMuteBtn");
  const navBtn = document.querySelector("#navMusicBtn");
  const badge = document.querySelector("#musicStatusBadge");
  const volSlider = document.querySelector("#bgMusicVolSlider");
  const volVal = document.querySelector("#musicVolVal");

  if (isAudioPlaying) {
    if (playIcon) playIcon.textContent = "⏸️";
    if (playText) playText.textContent = "Pause Music";
    if (navBtn) navBtn.classList.add("playing");
    if (badge) {
      badge.textContent = isAudioMuted ? "Muted 🔇" : "Playing 🎶";
      badge.classList.toggle("playing", !isAudioMuted);
    }
  } else {
    if (playIcon) playIcon.textContent = "▶️";
    if (playText) playText.textContent = "Play Music";
    if (navBtn) navBtn.classList.remove("playing");
    if (badge) {
      badge.textContent = "Paused ⏸️";
      badge.classList.remove("playing");
    }
  }

  if (muteBtn) {
    muteBtn.textContent = isAudioMuted ? "🔇" : "🔊";
  }
  if (volSlider) volSlider.value = audioVolume;
  if (volVal) volVal.textContent = Math.round(audioVolume * 100) + "%";

  if (bgAudio) {
    bgAudio.volume = isAudioMuted ? 0 : audioVolume;
  }
}

// Setup Custom Uploaded Audio Track
function setupCustomAudioTrack(dataUrl, fileName) {
  customAudioData = dataUrl;
  customAudioName = fileName;
  bgAudio.src = dataUrl;
  
  const customOpt = document.querySelector("#customTrackOption");
  const clearBtn = document.querySelector("#clearCustomMusicBtn");
  const fileInfo = document.querySelector("#musicFileInfo");

  if (customOpt) {
    customOpt.disabled = false;
    customOpt.textContent = `🎵 ${fileName.length > 20 ? fileName.substring(0, 18) + '...' : fileName}`;
  }
  if (document.querySelector("#bgMusicTrackSelect")) {
    document.querySelector("#bgMusicTrackSelect").value = "custom";
  }
  currentTrack = "custom";

  if (clearBtn) clearBtn.style.display = "inline-flex";
  if (fileInfo) fileInfo.textContent = `Active Custom Music: ${fileName}`;
}

// Setup Custom Uploaded Audio Track
function setupCustomAudioTrack(dataUrl, fileName) {
  customAudioData = dataUrl;
  customAudioName = fileName;
  bgAudio.src = dataUrl;
  
  const customOpt = document.querySelector("#customTrackOption");
  const clearBtn = document.querySelector("#clearCustomMusicBtn");
  const fileInfo = document.querySelector("#musicFileInfo");

  if (customOpt) {
    customOpt.disabled = false;
    customOpt.textContent = `🎵 ${fileName.length > 20 ? fileName.substring(0, 18) + '...' : fileName}`;
  }
  if (document.querySelector("#bgMusicTrackSelect")) {
    document.querySelector("#bgMusicTrackSelect").value = "custom";
  }
  currentTrack = "custom";

  if (clearBtn) clearBtn.style.display = "inline-flex";
  if (fileInfo) fileInfo.textContent = `Active Custom Music: ${fileName}`;
}

// Load Saved Audio Preferences from LocalStorage
function loadSavedAudioPreferences() {
  try {
    const savedAudioTrack = localStorage.getItem("teachersDay_bgMusicTrack");
    const savedAudioVol = localStorage.getItem("teachersDay_bgMusicVol");
    const savedCustomAudio = localStorage.getItem("teachersDay_customAudio");
    const savedCustomAudioName = localStorage.getItem("teachersDay_customAudioName");

    if (savedCustomAudio) {
      setupCustomAudioTrack(savedCustomAudio, savedCustomAudioName || "Custom Audio");
    }

    if (savedAudioTrack && savedAudioTrack !== "url") {
      currentTrack = savedAudioTrack;
      if (document.querySelector("#bgMusicTrackSelect")) {
        document.querySelector("#bgMusicTrackSelect").value = currentTrack;
      }
    }

    if (savedAudioVol !== null) {
      audioVolume = parseFloat(savedAudioVol);
      if (document.querySelector("#bgMusicVolSlider")) {
        document.querySelector("#bgMusicVolSlider").value = audioVolume;
      }
    }

    const savedAudioPlaying = localStorage.getItem("teachersDay_bgMusicPlaying");
    if (savedAudioPlaying !== null) {
      isAudioPlaying = (savedAudioPlaying === "true");
    } else {
      isAudioPlaying = true; // Auto-play enabled by default
    }

    if (isAudioPlaying) {
      startSynthLoop();
    }

    updateAudioUI();
  } catch(e) {
    console.warn("Error restoring saved audio preferences:", e);
  }
}

// Event Listeners Initialization
document.addEventListener("DOMContentLoaded", () => {
  const bgMusicPlayBtn = document.querySelector("#bgMusicPlayBtn");
  const navMusicBtn = document.querySelector("#navMusicBtn");
  const bgMusicMuteBtn = document.querySelector("#bgMusicMuteBtn");
  const bgMusicVolSlider = document.querySelector("#bgMusicVolSlider");
  const bgMusicTrackSelect = document.querySelector("#bgMusicTrackSelect");
  const bgMusicFileInput = document.querySelector("#bgMusicFileInput");
  const clearCustomMusicBtn = document.querySelector("#clearCustomMusicBtn");

  if (bgMusicPlayBtn) bgMusicPlayBtn.addEventListener("click", toggleAudioPlay);
  if (navMusicBtn) navMusicBtn.addEventListener("click", toggleAudioPlay);

  if (bgMusicMuteBtn) {
    bgMusicMuteBtn.addEventListener("click", () => {
      isAudioMuted = !isAudioMuted;
      if (bgAudio) bgAudio.volume = isAudioMuted ? 0 : audioVolume;
      updateAudioUI();
      if (typeof showToast === 'function') showToast(isAudioMuted ? "Audio muted 🔇" : "Audio unmuted 🔊");
    });
  }

  if (bgMusicVolSlider) {
    bgMusicVolSlider.addEventListener("input", (e) => {
      audioVolume = parseFloat(e.target.value);
      if (bgAudio) bgAudio.volume = isAudioMuted ? 0 : audioVolume;
      updateAudioUI();
      try { localStorage.setItem("teachersDay_bgMusicVol", audioVolume); } catch(err) {}
    });
  }

  if (bgMusicTrackSelect) {
    bgMusicTrackSelect.addEventListener("change", (e) => {
      currentTrack = e.target.value;
      try { localStorage.setItem("teachersDay_bgMusicTrack", currentTrack); } catch(err) {}
      if (isAudioPlaying) {
        startSynthLoop();
      }
      if (typeof showToast === 'function') {
        showToast(`Music track changed to: ${e.target.options[e.target.selectedIndex].text}`);
      }
    });
  }

  if (bgMusicFileInput) {
    bgMusicFileInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;

      // Strict 3MB File Size Limit Check
      if (file.size > MAX_AUDIO_SIZE) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        if (typeof showToast === 'function') {
          showToast(`❌ Audio exceeds 3MB limit! (${fileSizeMB}MB). Max allowed: 3MB`);
        }
        alert(`Upload Error: The selected audio file "${file.name}" (${fileSizeMB}MB) exceeds the maximum 3MB file size limit! Please select a smaller file under 3MB.`);
        this.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function(evt) {
        const base64Data = evt.target.result;
        try {
          localStorage.setItem("teachersDay_customAudio", base64Data);
          localStorage.setItem("teachersDay_customAudioName", file.name);
          localStorage.setItem("teachersDay_bgMusicTrack", "custom");
        } catch(err) {
          console.warn("LocalStorage save audio error:", err);
        }
        setupCustomAudioTrack(base64Data, file.name);
        if (isAudioPlaying) {
          startSynthLoop();
        }
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        if (typeof showToast === 'function') {
          showToast(`🎵 Custom audio uploaded: ${file.name} (${fileSizeMB}MB)`);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (clearCustomMusicBtn) {
    clearCustomMusicBtn.addEventListener("click", () => {
      try {
        localStorage.removeItem("teachersDay_customAudio");
        localStorage.removeItem("teachersDay_customAudioName");
        localStorage.setItem("teachersDay_bgMusicTrack", "lofi");
      } catch(err) {}

      bgAudio.pause();
      bgAudio.src = "";
      customAudioData = null;
      customAudioName = "";

      const customOpt = document.querySelector("#customTrackOption");
      const fileInfo = document.querySelector("#musicFileInfo");
      const fileInput = document.querySelector("#bgMusicFileInput");

      if (customOpt) {
        customOpt.disabled = true;
        customOpt.textContent = "🎵 Custom Uploaded Track";
      }
      if (fileInput) fileInput.value = "";
      if (clearCustomMusicBtn) clearCustomMusicBtn.style.display = "none";
      if (fileInfo) fileInfo.textContent = "Maximum allowed file size: 3MB (.mp3, .wav, .m4a)";

      currentTrack = "lofi";
      if (document.querySelector("#bgMusicTrackSelect")) document.querySelector("#bgMusicTrackSelect").value = "lofi";
      if (isAudioPlaying) startSynthLoop();

      if (typeof showToast === 'function') showToast("Custom music removed ❌");
    });
  }

  loadSavedAudioPreferences();
});

// Enable AudioContext & Auto-play seamlessly on first user interaction
function enableAudioOnUserGesture() {
  getAudioContext();
  if (isAudioPlaying) {
    startSynthLoop();
    updateAudioUI();
  }
}

// User interaction triggers for browser autoplay policy compliance
["click", "touchstart", "scroll", "keydown", "mousemove"].forEach(evt => {
  window.addEventListener(evt, enableAudioOnUserGesture, { once: true });
});

