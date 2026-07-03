export const makeupWindowHTML = `
<div id="makeup-window" class="makeup-window hidden">
<img id="magic-cursor" class="magic-cursor" src="/cursors/magic-wand.cur" alt="">
<div id="magic-sparkle-layer"></div>
  <div class="makeup-page">

    <button id="close-makeup-window" class="makeup-close">
      ✕ close
    </button>

    <header class="makeup-header">
      <h1>LYSE MAKEUP ROOM</h1>
      <p>looks / characters / costumes / shootings / strange faces</p>
    </header>

    <nav class="makeup-nav">
    <button data-section="looks">looks</button>
    <button data-section="cosplay">cosplay</button>
    <button data-section="drag">drag</button>
    <button data-section="sfx">sfx</button>
    </nav>

    <main class="makeup-content">
      <section class="makeup-card">
        <h2>makeup archive</h2>
        <p>
          questa sezione raccoglierà trucchi, shooting, costumi,
          character design e performance.
        </p>
      </section>

      <section id="makeup-gallery" class="makeup-gallery">
        <div class="empty-makeup">
          folder /public/makeup is still empty...
          <br>
          waiting for strange faces ♡
        </div>
      </section>
    </main>

    <aside class="makeup-player">
      <div class="makeup-player-title">tiny player</div>
      <div class="makeup-player-screen">
        mixtape coming soon...
      </div>
      <div class="makeup-player-buttons">
        <button>◀</button>
        <button>▶</button>
        <button>■</button>
      </div>
    </aside>

  </div>
</div>
`