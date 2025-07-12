const html = `<yt-button-view-model class="ytd-menu-renderer">
  <button-view-model class="yt-spec-button-view-model style-scope ytd-menu-renderer">
    <button class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment"
      title="Effects" aria-label="Effects" aria-disabled="false">
      <div aria-hidden="true" class="yt-spec-button-shape-next__icon">
        <yt-icon style="width: 24px; height: 24px;">
          <span class="yt-icon-shape style-scope yt-icon yt-spec-icon-shape">
            <div style="width: 100%; height: 100%; display: block; fill: currentcolor;"></div>
          </span>
        </yt-icon>
      </div>
      <div class="yt-spec-button-shape-next__button-text-content">Effects</div>
      <yt-touch-feedback-shape style="border-radius: inherit;">
        <div aria-hidden="true" class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response">
          <div class="yt-spec-touch-feedback-shape__stroke"></div>
          <div class="yt-spec-touch-feedback-shape__fill"></div>
        </div>
      </yt-touch-feedback-shape>
    </button>
  </button-view-model>
</yt-button-view-model>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
  <path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z"></path>
</svg>`;

function effectButtonClick() {
  let temp = document.getElementById("effects-panel");

  if (temp) {
    temp.remove(); // toggle off
    return;
  }

  const comments = document.getElementById("comments");
  if (!comments) {
    console.warn("❌ Comments section not found.");
    return;
  }

  const panel = document.createElement("div");
  panel.id = "effects-panel";

  panel.style.margin = "16px 0";
  panel.style.padding = "20px";
  panel.style.background = "#181818";
  panel.style.border = "1px solid #303030";
  panel.style.borderRadius = "12px";
  panel.style.color = "#fff";
  panel.style.fontFamily = "Roboto, Arial, sans-serif";
  panel.style.fontSize = "14px";
  panel.style.width = "100%";
  panel.style.boxSizing = "border-box";

  panel.innerHTML = `
<div style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Effects Panel</div>

<p style="margin-bottom: 8px;">Audio Mixer</p>
<div id="mixer" display="flex" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">

<div style="display: flex; flex-direction: column; justify-content: space-between; height: 120px; padding-right: 8px; font-size: 12px; opacity: 0.7; text-align: right;">
      <span>+20dB</span>
      <span>0dB</span>
      <span>-20dB</span>
    </div>
  <div class="mixer-sliders" style="display: flex; flex:1; gap: 10px; align-items: flex-end;">
    ${[
      "20Hz",
      "40Hz",
      "80Hz",
      "160Hz",
      "320Hz",
      "640Hz",
      "1kHz",
      "2kHz",
      "4kHz",
      "8kHz",
      "16kHz",
      "20kHz",
    ]
      .map(
        (freq) => `
      <div class="slider-container" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
        <input type="range" min="-20" max="20" value="0"
          data-freq="${freq}"
          class="eq-slider"
          style="writing-mode: bt-lr; -webkit-appearance: slider-vertical; width: 30px; height: 120px;">
        <label style="margin-top: 4px; font-size: 10px;">${freq}</label>
      </div>
    `
      )
      .join("")}
  </div>
</div>

    `;

  comments.parentNode.insertBefore(panel, comments);

  bindSliders();
}

function injectMixerStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .eq-slider {
      -webkit-appearance: none;
      writing-mode: bt-lr;
      width: 32px;
      height: 120px;
      background: transparent;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}
function createEffectButton(container) {
  if (!container || container.querySelector(".custom-effect-button")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "custom-effect-button";
  wrapper.style.marginLeft = "8px";

  const button = document.createElement("button");
  button.className =
    "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment";
  button.title = "Effects";
  button.setAttribute("aria-label", "Effects");

  // SVG icon
  const iconContainer = document.createElement("div");
  iconContainer.innerHTML = svg;
  iconContainer.style.display = "flex";
  iconContainer.style.alignItems = "center";
  iconContainer.style.justifyContent = "center";
  iconContainer.style.marginRight = "8px";

  // Text label
  const label = document.createElement("div");
  label.className = "yt-spec-button-shape-next__button-text-content";
  label.textContent = "Effects";

  button.appendChild(iconContainer);
  button.appendChild(label);

  button.addEventListener("click", effectButtonClick);
  wrapper.appendChild(button);
  container.appendChild(wrapper);

  injectMixerStyles();
  bindSliders();

  console.log("Effect button created!");
}

function observeButtons() {
  const observer = new MutationObserver(() => {
    const container = document.getElementById("top-level-buttons-computed");
    if (container) {
      createEffectButton(container);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function tryAddButton() {
  const container = document.getElementById("top-level-buttons-computed");
  if (container) {
    createEffectButton(container);
  } else {
    console.log("Retrying container...");
    setTimeout(tryAddButton, 1000);
  }
}

function handleYouTubeNavigation() {
  let lastUrl = location.href;

  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(() => {
        observeButtons();
        // tryAddButton();
      }, 800);
    }
  }).observe(document.body, { childList: true, subtree: true });
}

const eqFrequencies = [20, 40, 80, 160, 320, 640, 1000, 2000, 4000, 8000, 16000, 20000];

let eqNodes = [];

function createEqualizer(audioCtx, source) {
  let input = source;
  eqNodes = eqFrequencies.map((freq) => {
    const filter = audioCtx.createBiquadFilter();
    filter.type = "peaking";
    filter.frequency.value = freq;
    filter.Q.value = 1;
    filter.gain.value = 0;
    input.connect(filter);
    input = filter;
    return filter;
  });

  // Connect last filter to destination
  input.connect(audioCtx.destination);
}

function bindSliders() {
  document.querySelectorAll(".eq-slider").forEach((slider) => {
    const freqStr = slider.dataset.freq;
    if (!freqStr) return;
    const freq = parseFloat(freqStr.replace(/[^\d]/g, ""));
    const isKHz = freqStr.includes("k");
    const targetFreq = isKHz ? freq * 1000 : freq;

    const node = eqNodes.find((n) => Math.round(n.frequency.value) === Math.round(targetFreq));
    if (!node) return;

    slider.addEventListener("input", () => {
      node.gain.value = parseFloat(slider.value);
      console.log(`Set ${targetFreq}Hz gain to ${slider.value}dB`);
    });
  });
}

let audioCtx, sourceNode;

function setupAudio() {
  const video = document.querySelector("video");
  if (!video) {
    console.warn("No video element found for audio processing.");
    return;
  }

  if (audioCtx) {
    // If already created, just reuse
    return;
  }

  audioCtx = new AudioContext();
  sourceNode = audioCtx.createMediaElementSource(video);

  createEqualizer(audioCtx, sourceNode);
}

function init() {
  observeButtons();
  tryAddButton();
  handleYouTubeNavigation();
  setupAudio();
}

window.addEventListener("yt-page-data-updated", init);
window.addEventListener("load", init);
