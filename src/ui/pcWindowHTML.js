export const pcWindowHTML = `
<div id="pc-window-test" class="pc-window-test hidden">
  <div class="window portfolio-window" id="portfolio-window">
    <div class="title-bar" id="portfolio-titlebar">
      <div class="title-bar-text">C:\\LUCREZIA\\PORTFOLIO</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" id="minimize-window"></button>
        <button aria-label="Maximize" id="maximize-window"></button>
        <button aria-label="Close" id="close-window"></button>
      </div>
    </div>

    <div class="window-body portfolio-body">
      <div class="portfolio-menu">
        <button>File</button>
        <button>Edit</button>
        <button>View</button>
        <button>Favorites</button>
        <button>Tools</button>
        <button>Help</button>
      </div>

      <div class="address-bar">
        <span>Address</span>
        <div class="address-field">C:\\LUCREZIA\\PORTFOLIO</div>
      </div>

      <div class="sunken-panel portfolio-folder-area" id="desktop-area">
        <div class="portfolio-folder draggable-icon" style="left: 42px; top: 42px;">
          <img src="/icons/help_book_small-4.png" />
          <span>THESIS</span>
        </div>

        <div class="portfolio-folder draggable-icon" style="left: 190px; top: 86px;">
          <img src="/icons/world-2.png" />
          <span>WORK</span>
        </div>

        <div class="portfolio-folder draggable-icon" style="left: 355px; top: 48px;">
          <img src="/icons/cd_audio_cd_a-4.png" />
          <span>DESIGN</span>
        </div>

        <div class="portfolio-folder draggable-icon" style="left: 520px; top: 120px;">
          <img src="/icons/camera3-4.png" />
          <span>VIDEO</span>
        </div>

        <div class="portfolio-folder draggable-icon easter-icon" data-gif="/photos/joe1.gif" data-title="joe1.gif" style="left: 90px; top: 245px;">
          <img src="/icons/msg_question-0.png" />
          <span>???</span>
        </div>

        <div class="portfolio-folder draggable-icon easter-icon" data-gif="/photos/sonic.gif" data-title="sonic.gif" style="left: 480px; top: 290px;">
          <img src="/icons/msg_warning-0.png" />
          <span>warning</span>
        </div>

        <div class="portfolio-folder recycle-icon">
          <img src="/icons/cestino.png" />
          <span>Recycle Bin</span>
        </div>
      </div>

      <div class="status-bar">
        <p class="status-bar-field">7 object(s)</p>
        <p class="status-bar-field">My private archive</p>
      </div>
    </div>
  </div>
</div>

<div id="gif-popup-layer"></div>
`