import * as THREE from 'three'

export function setupInteractions({
  camera,
  pcWindowLayer,
  ps2Window,
  makeupWindow,
  outlinePass,
  clickableGroups,
  openPcWindow,
  openPs2Window,
  openMakeupWindow
}) {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const hint = document.createElement('div')

  let hoveredGroup = null
  let hoveredHint = null

  hint.className = 'room-hover-hint'
  document.body.appendChild(hint)

  function getGroupFromObject(object) {
    if (clickableGroups.pc.includes(object)) return 'pc'
    if (clickableGroups.crt.includes(object)) return 'crt'
    if (clickableGroups.makeup.includes(object)) return 'makeup'
    if (clickableGroups.daily.includes(object)) return 'daily'
    return null
  }

  function moveHint(event) {
    hint.style.left = `${event.clientX}px`
    hint.style.top = `${event.clientY}px`
  }

  function showHint(message, event) {
    if (hoveredHint !== message) {
      hint.textContent = message
      hoveredHint = message
    }

    moveHint(event)
    hint.classList.add('visible')
  }

  function hideHint() {
    hoveredHint = null
    hint.classList.remove('visible')
  }

  function clearHover() {
    hoveredGroup = null
    outlinePass.selectedObjects = []
    document.body.style.cursor = 'default'
    hideHint()
  }

  function setHover(groupName, event) {
    hoveredGroup = groupName

    if (groupName === 'daily') {
      outlinePass.selectedObjects = []
      document.body.style.cursor = 'help'
      showHint("I wonder what I'll eat tomorrow...", event)
      return
    }

    if (groupName === 'pc') {
      outlinePass.selectedObjects = clickableGroups.pc
      outlinePass.visibleEdgeColor.set('#00ff66')
    }

    if (groupName === 'crt') {
      outlinePass.selectedObjects = clickableGroups.crt
      outlinePass.visibleEdgeColor.set('#00e5ff')
    }

    if (groupName === 'makeup') {
      outlinePass.selectedObjects = clickableGroups.makeup
      outlinePass.visibleEdgeColor.set('#ff3ccf')
    }

    outlinePass.hiddenEdgeColor.set('#05050a')
    document.body.style.cursor = 'pointer'
    showHint('double click here!', event)
  }

  window.addEventListener('mousemove', (event) => {
    if (!pcWindowLayer.classList.contains('hidden')) {
      clearHover()
      return
    }

    if (ps2Window.isOpen()) {
      clearHover()
      return
    }

    if (makeupWindow.isOpen()) {
      clearHover()
      return
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    const allClickable = [
      ...clickableGroups.pc,
      ...clickableGroups.crt,
      ...clickableGroups.makeup,
      ...clickableGroups.daily
    ].filter((object) => object.visible)

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(allClickable, true)

    if (intersects.length === 0) {
      clearHover()
      return
    }

    const groupName = getGroupFromObject(intersects[0].object)

    if (!groupName) {
      clearHover()
      return
    }

    setHover(groupName, event)
  })

  window.addEventListener('dblclick', () => {
    console.log('doppio click su:', hoveredGroup)

    if (hoveredGroup === 'pc') {
      openPcWindow()
    }

    if (hoveredGroup === 'crt') {
      openPs2Window()
    }

    if (hoveredGroup === 'makeup') {
      openMakeupWindow()
    }
  })
}
