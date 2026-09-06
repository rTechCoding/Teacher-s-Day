/* ==========================================================================
   Math Arcade Games Logic (js/games.js)
   Supports Arithmetic Chain Operator Puzzle & Sliding Math Tile Puzzle
   ========================================================================== */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. Web Audio Synthesizer (Zero External Dependencies)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = "sine") {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playSuccessSound() {
    playTone(523.25, 0.1, "triangle"); // C5
    setTimeout(() => playTone(659.25, 0.1, "triangle"), 80); // E5
    setTimeout(() => playTone(783.99, 0.2, "triangle"), 160); // G5
  }

  function playErrorSound() {
    playTone(220, 0.15, "sawtooth");
    setTimeout(() => playTone(180, 0.2, "sawtooth"), 100);
  }

  function playClickSound() {
    playTone(440, 0.04, "sine");
  }

  function playTileSlideSound() {
    playTone(330, 0.05, "sine");
  }

  /* --------------------------------------------------------------------------
     2. Game Tab Navigation Switcher
     -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".game-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const targetGameId = btn.dataset.game;

        document.querySelectorAll(".game-card-wrapper").forEach(wrap => {
          wrap.style.display = wrap.id === targetGameId ? "block" : "none";
        });
        playClickSound();
      });
    });

    initArithmeticGame();
    initSlidingGame();
  });

  /* ==========================================================================
     3. GAME 1: ARITHMETIC CHAIN (OPERATOR EQUATION PUZZLE)
     ========================================================================== */
  let arithScore = 0;
  let arithBest = parseInt(localStorage.getItem("mathGame_arithBest") || "200", 10);
  let arithSolved = 0;
  let arithStreak = 0;
  let arithHints = 3;
  let arithDiff = "easy";
  let arithTimer = null;
  let arithSeconds = 0;
  let arithIsPaused = false;

  let currentEq = {
    num1: 9,
    op1: "+",
    num2: 8,
    op2: "-",
    num3: 3,
    target: 14,
    blankSlotIndex: 1, // 1 for op1, 2 for op2
    correctOp: "+"
  };

  function initArithmeticGame() {
    updateArithStatsUI();

    // Difficulty buttons
    document.querySelectorAll(".diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        arithDiff = btn.dataset.diff || "easy";
        generateNewEquation();
        playClickSound();
      });
    });

    // Operator selection buttons
    document.querySelectorAll(".op-choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (arithIsPaused) return;
        const chosenOp = btn.dataset.op;
        checkOperatorAnswer(chosenOp);
      });
    });

    // Hint button
    const hintBtn = document.getElementById("arithHintBtn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        if (arithHints > 0 && !arithIsPaused) {
          arithHints--;
          updateArithStatsUI();
          checkOperatorAnswer(currentEq.correctOp);
          if (window.showToast) window.showToast("Hint applied! ✨");
        } else if (arithHints === 0) {
          if (window.showToast) window.showToast("No hints left! ⚠️");
        }
      });
    }

    // Controls
    const soundBtn = document.getElementById("arithSoundBtn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        isSoundEnabled = !isSoundEnabled;
        soundBtn.textContent = isSoundEnabled ? "🔊" : "🔇";
        if (window.showToast) window.showToast(isSoundEnabled ? "Sound Enabled 🔊" : "Sound Muted 🔇");
      });
    }

    const resetBtn = document.getElementById("arithResetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        arithScore = 0;
        arithStreak = 0;
        arithSolved = 0;
        arithHints = 3;
        arithSeconds = 0;
        updateArithStatsUI();
        generateNewEquation();
        playClickSound();
        if (window.showToast) window.showToast("Game Reset! 🔄");
      });
    }

    const pauseBtn = document.getElementById("arithPauseBtn");
    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => {
        arithIsPaused = !arithIsPaused;
        pauseBtn.textContent = arithIsPaused ? "▶️" : "⏸️";
        if (window.showToast) window.showToast(arithIsPaused ? "Game Paused ⏸️" : "Game Resumed ▶️");
      });
    }

    const fsBtn = document.getElementById("arithFullscreenBtn");
    if (fsBtn) {
      fsBtn.addEventListener("click", () => {
        const wrap = document.getElementById("game-arithmetic");
        if (wrap) {
          if (!document.fullscreenElement) {
            wrap.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      });
    }

    // Start timer
    if (arithTimer) clearInterval(arithTimer);
    arithTimer = setInterval(() => {
      if (!arithIsPaused) {
        arithSeconds++;
        const mins = Math.floor(arithSeconds / 60);
        const secs = arithSeconds % 60;
        const timeEl = document.getElementById("arithTime");
        if (timeEl) timeEl.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }
    }, 1000);

    generateNewEquation();
  }

  function updateArithStatsUI() {
    const scoreEl = document.getElementById("arithScore");
    const bestEl = document.getElementById("arithBest");
    const solvedEl = document.getElementById("arithSolved");
    const streakEl = document.getElementById("arithStreak");
    const hintsEl = document.getElementById("arithHints");
    const hintCountEl = document.getElementById("arithHintCount");
    const streakCountEl = document.getElementById("arithStreakCount");

    if (scoreEl) scoreEl.textContent = arithScore;
    if (bestEl) bestEl.textContent = arithBest;
    if (solvedEl) solvedEl.textContent = arithSolved;
    if (streakEl) streakEl.textContent = arithStreak;
    if (hintsEl) hintsEl.textContent = arithHints;
    if (hintCountEl) hintCountEl.textContent = arithHints;
    if (streakCountEl) streakCountEl.textContent = arithStreak;
  }

  function evalMath(n1, op1, n2, op2, n3) {
    // Respect operator precedence (* and / first)
    if (op1 === "*" || op1 === "/") {
      let first = op1 === "*" ? n1 * n2 : n1 / n2;
      return op2 === "+" ? first + n3 : op2 === "-" ? first - n3 : op2 === "*" ? first * n3 : first / n3;
    } else if (op2 === "*" || op2 === "/") {
      let second = op2 === "*" ? n2 * n3 : n2 / n3;
      return op1 === "+" ? n1 + second : n1 - second;
    } else {
      let first = op1 === "+" ? n1 + n2 : n1 - n2;
      return op2 === "+" ? first + n3 : first - n3;
    }
  }

  function generateNewEquation() {
    const ops = ["+", "-", "*", "/"];
    let valid = false;

    while (!valid) {
      let n1, n2, n3, op1, op2;
      if (arithDiff === "easy") {
        n1 = Math.floor(Math.random() * 15) + 2;
        n2 = Math.floor(Math.random() * 10) + 1;
        n3 = Math.floor(Math.random() * 8) + 1;
        op1 = ops[Math.floor(Math.random() * 2)]; // + or -
        op2 = "-";
      } else if (arithDiff === "medium") {
        n1 = Math.floor(Math.random() * 20) + 2;
        n2 = Math.floor(Math.random() * 12) + 2;
        n3 = Math.floor(Math.random() * 10) + 1;
        op1 = ops[Math.floor(Math.random() * 3)]; // +, -, *
        op2 = ops[Math.floor(Math.random() * 2)];
      } else { // hard
        n1 = Math.floor(Math.random() * 30) + 4;
        n2 = Math.floor(Math.random() * 15) + 2;
        n3 = Math.floor(Math.random() * 10) + 2;
        op1 = ops[Math.floor(Math.random() * 4)];
        op2 = ops[Math.floor(Math.random() * 4)];
      }

      // Avoid division by zero and non-integer division
      if (op1 === "/" && n1 % n2 !== 0) continue;
      if (op2 === "/" && n2 % n3 !== 0) continue;

      let res = evalMath(n1, op1, n2, op2, n3);
      if (Number.isInteger(res) && res >= 0 && res <= 100) {
        valid = true;
        const blankSlotIndex = Math.random() < 0.5 ? 1 : 2;
        currentEq = {
          num1: n1,
          op1: op1,
          num2: n2,
          op2: op2,
          num3: n3,
          target: res,
          blankSlotIndex: blankSlotIndex,
          correctOp: blankSlotIndex === 1 ? op1 : op2
        };
      }
    }

    renderEquationUI();
  }

  function renderEquationUI() {
    const targetEl = document.getElementById("arithTargetVal");
    if (targetEl) targetEl.textContent = currentEq.target;

    const row = document.getElementById("arithEquationRow");
    if (!row) return;

    row.innerHTML = "";

    // Num 1
    row.appendChild(createEqBlock(currentEq.num1));

    // Op 1
    if (currentEq.blankSlotIndex === 1) {
      row.appendChild(createEqBlock("?", true));
    } else {
      row.appendChild(createEqBlock(currentEq.op1));
    }

    // Num 2
    row.appendChild(createEqBlock(currentEq.num2));

    // Op 2
    if (currentEq.blankSlotIndex === 2) {
      row.appendChild(createEqBlock("?", true));
    } else {
      row.appendChild(createEqBlock(currentEq.op2));
    }

    // Num 3
    row.appendChild(createEqBlock(currentEq.num3));

    // Equals
    const eqSymbol = document.createElement("div");
    eqSymbol.className = "eq-symbol";
    eqSymbol.textContent = "=";
    row.appendChild(eqSymbol);

    // Target Block
    const targetBlock = createEqBlock(currentEq.target);
    targetBlock.classList.add("target-block");
    row.appendChild(targetBlock);

    const blankIdxEl = document.getElementById("arithBlankIndex");
    if (blankIdxEl) blankIdxEl.textContent = currentEq.blankSlotIndex;
  }

  function createEqBlock(val, isBlank = false) {
    const div = document.createElement("div");
    div.className = `eq-block ${isBlank ? "blank-slot" : ""}`;
    div.textContent = val;
    return div;
  }

  function checkOperatorAnswer(chosenOp) {
    if (chosenOp === currentEq.correctOp) {
      playSuccessSound();
      arithScore += 100 + (arithStreak * 10);
      arithStreak++;
      arithSolved++;
      if (arithScore > arithBest) {
        arithBest = arithScore;
        localStorage.setItem("mathGame_arithBest", arithBest);
      }
      updateArithStatsUI();
      if (window.showToast) window.showToast(`Correct! +100 Points 🎉 (Streak: ${arithStreak})`);
      generateNewEquation();
    } else {
      playErrorSound();
      arithStreak = 0;
      updateArithStatsUI();
      if (window.showToast) window.showToast("Incorrect operator, try again! ❌");
    }
  }


  /* ==========================================================================
     4. GAME 2: SLIDING NUMBER TILE PUZZLE (15 / 8 / 24 PUZZLE)
     ========================================================================== */
  let slideSize = 4; // 3x3, 4x4, 5x5
  let slideTiles = [];
  let slideMoves = 0;
  let slideSeconds = 0;
  let slideTimer = null;
  let slideShowNumbers = true;
  let slideStreak = 1;
  let slideIsPaused = false;

  function initSlidingGame() {
    // Grid size buttons
    document.querySelectorAll(".grid-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".grid-size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        slideSize = parseInt(btn.dataset.size, 10) || 4;
        const goalEl = document.getElementById("slideGoalRange");
        if (goalEl) goalEl.textContent = `1 → ${(slideSize * slideSize) - 1}`;
        startNewSlidingGame();
        playClickSound();
      });
    });

    // Toggle numbers
    const toggleNumBtn = document.getElementById("slideToggleNumBtn");
    if (toggleNumBtn) {
      toggleNumBtn.addEventListener("click", () => {
        slideShowNumbers = !slideShowNumbers;
        toggleNumBtn.classList.toggle("active", slideShowNumbers);
        toggleNumBtn.textContent = slideShowNumbers ? "NUMBERS ON" : "NUMBERS OFF";
        renderSlidingGridUI();
        playClickSound();
      });
    }

    // New Game button
    const newGameBtn = document.getElementById("slideNewGameBtn");
    if (newGameBtn) {
      newGameBtn.addEventListener("click", () => {
        startNewSlidingGame();
        playClickSound();
      });
    }

    // Controls
    const soundBtn = document.getElementById("slideSoundBtn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        isSoundEnabled = !isSoundEnabled;
        soundBtn.textContent = isSoundEnabled ? "🔊" : "🔇";
        if (window.showToast) window.showToast(isSoundEnabled ? "Sound Enabled 🔊" : "Sound Muted 🔇");
      });
    }

    const resetBtn = document.getElementById("slideResetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        startNewSlidingGame();
        playClickSound();
        if (window.showToast) window.showToast("Sliding Puzzle Reset 🔄");
      });
    }

    const pauseBtn = document.getElementById("slidePauseBtn");
    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => {
        slideIsPaused = !slideIsPaused;
        pauseBtn.textContent = slideIsPaused ? "▶️" : "⏸️";
        if (window.showToast) window.showToast(slideIsPaused ? "Game Paused ⏸️" : "Game Resumed ▶️");
      });
    }

    const fsBtn = document.getElementById("slideFullscreenBtn");
    if (fsBtn) {
      fsBtn.addEventListener("click", () => {
        const wrap = document.getElementById("game-sliding");
        if (wrap) {
          if (!document.fullscreenElement) {
            wrap.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      });
    }

    // Keyboard Arrow Navigation
    document.addEventListener("keydown", (e) => {
      const slidingWrap = document.getElementById("game-sliding");
      if (!slidingWrap || slidingWrap.style.display === "none" || slideIsPaused) return;

      const emptyIdx = slideTiles.indexOf(0);
      const emptyRow = Math.floor(emptyIdx / slideSize);
      const emptyCol = emptyIdx % slideSize;
      let targetIdx = -1;

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        if (emptyRow < slideSize - 1) targetIdx = (emptyRow + 1) * slideSize + emptyCol;
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        if (emptyRow > 0) targetIdx = (emptyRow - 1) * slideSize + emptyCol;
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        if (emptyCol < slideSize - 1) targetIdx = emptyRow * slideSize + (emptyCol + 1);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        if (emptyCol > 0) targetIdx = emptyRow * slideSize + (emptyCol - 1);
      }

      if (targetIdx !== -1) {
        e.preventDefault();
        moveTile(targetIdx);
      }
    });

    startNewSlidingGame();
  }

  function startNewSlidingGame() {
    slideMoves = 0;
    slideSeconds = 0;
    updateSlidingStatsUI();

    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(() => {
      if (!slideIsPaused) {
        slideSeconds++;
        const mins = Math.floor(slideSeconds / 60);
        const secs = slideSeconds % 60;
        const timeEl = document.getElementById("slideTime");
        if (timeEl) timeEl.textContent = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }
    }, 1000);

    generateSolvableGrid();
    renderSlidingGridUI();
  }

  function generateSolvableGrid() {
    const total = slideSize * slideSize;
    let arr = Array.from({ length: total }, (_, i) => (i === total - 1 ? 0 : i + 1));

    let isSolvable = false;
    while (!isSolvable) {
      // Shuffle array
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      isSolvable = checkSolvability(arr, slideSize);
    }
    slideTiles = arr;
  }

  function checkSolvability(arr, size) {
    let inversions = 0;
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        if (arr[i] && arr[j] && arr[i] > arr[j]) inversions++;
      }
    }

    if (size % 2 !== 0) {
      return inversions % 2 === 0;
    } else {
      const emptyIdx = arr.indexOf(0);
      const emptyRowFromBottom = size - Math.floor(emptyIdx / size);
      return (emptyRowFromBottom % 2 === 0) ? (inversions % 2 !== 0) : (inversions % 2 === 0);
    }
  }

  function renderSlidingGridUI() {
    const grid = document.getElementById("slidingGrid");
    if (!grid) return;

    grid.style.gridTemplateColumns = `repeat(${slideSize}, 1fr)`;
    grid.innerHTML = "";

    slideTiles.forEach((val, idx) => {
      const tile = document.createElement("div");
      if (val === 0) {
        tile.className = "slide-tile empty-slot";
      } else {
        tile.className = "slide-tile";
        tile.dataset.colorIdx = (val - 1) % 9;
        tile.textContent = slideShowNumbers ? val : "";
        tile.addEventListener("click", () => moveTile(idx));
      }
      grid.appendChild(tile);
    });
  }

  function moveTile(idx) {
    if (slideIsPaused) return;
    const emptyIdx = slideTiles.indexOf(0);
    const tileRow = Math.floor(idx / slideSize);
    const tileCol = idx % slideSize;
    const emptyRow = Math.floor(emptyIdx / slideSize);
    const emptyCol = emptyIdx % slideSize;

    // Check if tile is adjacent to empty slot
    const isAdjacent = (Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol)) === 1;

    if (isAdjacent) {
      [slideTiles[idx], slideTiles[emptyIdx]] = [slideTiles[emptyIdx], slideTiles[idx]];
      slideMoves++;
      playTileSlideSound();
      updateSlidingStatsUI();
      renderSlidingGridUI();
      checkSlidingVictory();
    }
  }

  function updateSlidingStatsUI() {
    const movesEl = document.getElementById("slideMoves");
    if (movesEl) movesEl.textContent = slideMoves;
  }

  function checkSlidingVictory() {
    const total = slideSize * slideSize;
    let isSolved = true;
    for (let i = 0; i < total - 1; i++) {
      if (slideTiles[i] !== i + 1) {
        isSolved = false;
        break;
      }
    }

    if (isSolved && slideTiles[total - 1] === 0) {
      playSuccessSound();
      if (slideTimer) clearInterval(slideTimer);
      if (window.showToast) window.showToast(`🎉 Puzzle Solved in ${slideMoves} moves & ${slideSeconds}s!`);
    }
  }

})();
