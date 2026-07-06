export function setupLoader() {
  const loader = document.querySelector('#site-loader')
  const bar = document.querySelector('#loader-progress')
  const percent = document.querySelector('#loader-percent')
  const text = document.querySelector('#loader-text')

  let current = 0
  const startedAt = Date.now()
  const minimumVisibleMs = 1800
  let isComplete = false
  const fakeProgress = window.setInterval(() => {
    if (isComplete) return

    const nextTarget = current < 55
      ? current + 4 + Math.random() * 8
      : current + 0.8 + Math.random() * 3

    setProgress(Math.min(nextTarget, 92))
  }, 180)

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
    const remainingVisibleTime = Math.max(0, minimumVisibleMs - (Date.now() - startedAt))

    setTimeout(() => {
      isComplete = true
      window.clearInterval(fakeProgress)
      setProgress(100)

      setTimeout(() => {
        loader?.classList.add('loaded')
      }, 450)

      setTimeout(() => {
        loader?.remove()
      }, 1100)
    }, remainingVisibleTime)
  }

  return {
    setProgress,
    complete
  }
}
