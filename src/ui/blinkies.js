export function setupBlinkies() {

  const track1 = document.querySelector('#blinkies-track-1')
  const track2 = document.querySelector('#blinkies-track-2')

  if (!track1 || !track2) return

  const blinkies = [
    'blinkies_bat.gif',
    'blinkies_boobies.gif',
    'blinkies_cafe.gif',
    'blinkies_cherry.gif',
    'blinkies_clown.gif',
    'blinkies_hazard.gif',
    'blinkies_limit.gif',
    'blinkies_sleep.gif',
    'blinkies_spider.gif',
    'blinkies_star.gif',
    'blinkies_steal.gif',
    'blinkies_wanted.gif',
    'blinkies_wip.gif',
    'blinkies_worm.gif'
  ]

  function createTrack(track) {

    // prima sequenza
    blinkies.forEach(file => {

      const img = document.createElement('img')

      img.src = `/blinkies/${file}`

      img.alt = file

      track.appendChild(img)

    })

    // seconda sequenza (duplicata per il loop)
    blinkies.forEach(file => {

      const img = document.createElement('img')

      img.src = `/blinkies/${file}`

      img.alt = file

      track.appendChild(img)

    })

  }

  createTrack(track1)

  createTrack(track2)

}