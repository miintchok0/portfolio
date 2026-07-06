export const dailyDrinkNames = [
  'birrozza',
  'cola',
  'estathe'
]

export const dailyFoodNames = [
  'ciccia',
  'gelato',
  'pancake',
  'panino',
  'pizza',
  'ramen',
  'rustiche'
]

export function setupDailyObjects(room) {
  const activeDailyObjects = []

  const dayIndex = getDayOfYear()

  const activeDrink = dailyDrinkNames[dayIndex % dailyDrinkNames.length]
  const activeFood = dailyFoodNames[dayIndex % dailyFoodNames.length]

  room.traverse((child) => {
    if (!child.isObject3D) return

    if (dailyDrinkNames.includes(child.name)) {
      child.visible = child.name === activeDrink
    }

    if (dailyFoodNames.includes(child.name)) {
      child.visible = child.name === activeFood
    }

    if (child.visible && (child.name === activeDrink || child.name === activeFood)) {
      activeDailyObjects.push(child)
    }
  })

  console.log('drink del giorno:', activeDrink)
  console.log('food del giorno:', activeFood)

  return activeDailyObjects
}

function getDayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start

  return Math.floor(diff / 86400000)
}
