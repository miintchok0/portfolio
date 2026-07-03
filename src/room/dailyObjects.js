export function setupDailyObjects(room) {
  const drinks = [
    'birrozza',
    'cola',
    'estathe'
  ]

  const foods = [
    'ciccia',
    'gelato',
    'pancake',
    'panino',
    'pizza',
    'ramen',
    'rustiche'
  ]

  const dayIndex = getDayOfYear()

  const activeDrink = drinks[dayIndex % drinks.length]
  const activeFood = foods[dayIndex % foods.length]

  room.traverse((child) => {
    if (!child.isObject3D) return

    if (drinks.includes(child.name)) {
      child.visible = child.name === activeDrink
    }

    if (foods.includes(child.name)) {
      child.visible = child.name === activeFood
    }
  })

  console.log('drink del giorno:', activeDrink)
  console.log('food del giorno:', activeFood)
}

function getDayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start

  return Math.floor(diff / 86400000)
}