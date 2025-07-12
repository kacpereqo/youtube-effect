function main() {
  const video = document.querySelector("video");

  const html = `<yt-button-view-model class="ytd-menu-renderer"><button-view-model class="yt-spec-button-view-model style-scope ytd-menu-renderer"><button class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment" title="Effects" aria-label="Effects" aria-disabled="false" style=""><div aria-hidden="true" class="yt-spec-button-shape-next__icon"><yt-icon style="width: 24px; height: 24px;"><!--css-build:shady--><!--css_build_scope:yt-icon--><!--css_build_styles:video.youtube.src.web.polymer.shared.ui.styles.yt_base_styles.yt.base.styles.css.js,video.youtube.src.web.polymer.shared.core.yt_icon.yt.icon.css.js-->
<span class="yt-icon-shape style-scope yt-icon yt-spec-icon-shape"><div style="width: 100%; height: 100%; display: block; fill: currentcolor;"></div></span>
</yt-icon></div><div class="yt-spec-button-shape-next__button-text-content">Effects</div><yt-touch-feedback-shape style="border-radius: inherit;"><div aria-hidden="true" class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response"><div class="yt-spec-touch-feedback-shape__stroke"></div><div class="yt-spec-touch-feedback-shape__fill"></div></div></yt-touch-feedback-shape></button></button-view-model></yt-button-view-model>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z"></path>
         </svg>`;

  const buttonContainer = document.getElementById("top-level-buttons-computed");

  if (buttonContainer) {
    const button = document.createElement("div");
    button.innerHTML = html;
    buttonContainer.appendChild(button);
    button.addEventListener("click", effectButtonClick);

    button.style.marginLeft = "8px";

    const icon = button.querySelector("yt-icon");
    if (icon) {
      icon.innerHTML = svg;
    }
  }

  if (!video) return;

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(video);

  const gainNode = audioCtx.createGain();

  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = -1; // 2x volume

  console.log("Audio gain applied with value:", gainNode.gain.value);
}

function effectButtonClick() {}

onload = () => {
  main();
};
