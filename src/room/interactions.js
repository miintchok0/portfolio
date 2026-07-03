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

  let hoveredGroup = null

  function getGroupFromObject(object) {
    if (clickableGroups.pc.includes(object)) return 'pc'
    if (clickableGroups.crt.includes(object)) return 'crt'
    if (clickableGroups.makeup.includes(object)) return 'makeup'
    return null
  }

  function clearHover() {
    hoveredGroup = null
    outlinePass.selectedObjects = []
    document.body.style.cursor = 'default'
  }

  function setHover(groupName) {
    hoveredGroup = groupName

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
  }

  window.addEventListener('mousemove', (event) => {
    if (!pcWindowLayer.classList.contains('hidden')) return
    if (ps2Window.isOpen()) return
    if (makeupWindow.isOpen()) return

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    const allClickable = [
      ...clickableGroups.pc,
      ...clickableGroups.crt,
      ...clickableGroups.makeup
    ]

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

    setHover(groupName)
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