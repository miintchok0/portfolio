export const ps2WindowHTML = `
<div id="ps2-window" class="ps2-window hidden">
  <div class="ps2-crt-frame">
    <video
      id="ps2-bg-video"
      class="ps2-bg-video"
      src="/videos/ps2ambience.mp4"
      loop
      playsinline
    ></video>

    <button id="close-ps2-window" class="ps2-close">
      power
    </button>

    <div id="ps2-menu" class="ps2-menu hidden">
      <div class="ps2-options" id="ps2-options"></div>

      <div class="ps2-controls">
        ↑↓ navigate&nbsp;&nbsp;&nbsp; ENTER select&nbsp;&nbsp;&nbsp; BACKSPACE back&nbsp;&nbsp;&nbsp; ESC power off
      </div>
    </div>
  </div>
</div>
`