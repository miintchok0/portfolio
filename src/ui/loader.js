export function setupLoader() {
  const loader = document.querySelector('#site-loader')
  const bar = document.querySelector('#loader-progress')
  const percent = document.querySelector('#loader-percent')
  const text = document.querySelector('#loader-text')

  let current = 0

  function setProgress(value) {
    current = Math.max(current, Math.min(value, 100))

    if (bar) bar.style.width = `${current}%`
    if (percent) percent.textContent = `${Math.round(current)}%`

    if (text) {
      if (current < 30) text.textContent = 'loading textures...'
      else if (current < 65) text.textContent = 'placing snacks...'
      else if (current < 90) text.textContent = 'turning on the CRT...'
      else text.textContent = 'almost there...'
    }
  }

  function complete() {
    setProgress(100)

    setTimeout(() => {
  loader?.classList.add('loaded')
}, 5000)

setTimeout(() => {
  loader?.remove()
}, 6000)
  }

  return {
    setProgress,
    complete
  }
}