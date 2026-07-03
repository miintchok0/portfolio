export const musicPlayerHTML = `
<div id="music-widget" class="window music-widget hidden">

  <div class="title-bar music-title-bar">
    <div class="title-bar-text">mixtape01.exe</div>

    <div class="title-bar-controls">
      <button aria-label="Close" id="close-music-player"></button>
    </div>
  </div>

  <div class="window-body">

    <div class="player-header">
      <img
        id="nowplaying-blinkie"
        class="nowplaying-blinkie"
        src="/stickers/nowplaying.gif"
        alt="Now Playing"
      >

      <div class="player-subtitle">weekly soundtrack</div>
    </div>

    <div class="spotify-holder">
      <iframe
        id="spotify-iframe"
        src="https://open.spotify.com/embed/track/0Cn4UhpHhgf88eWaS9nn5u?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameborder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy">
      </iframe>
    </div>

    <div class="player-footer">
      <button id="music-prev" class="music-gif-button">
        <img src="/stickers/indietro.gif" alt="indietro">
      </button>

      <button id="music-next" class="music-gif-button">
        <img src="/stickers/avanti.gif" alt="avanti">
      </button>
    </div>

  </div>

</div>
`