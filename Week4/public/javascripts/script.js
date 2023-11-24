
document.addEventListener("DOMContentLoaded", function () {
  getRecipe()
})

let ingredients = []
let instructions = []

const getRecipe = async () => {
const recipeDisplay = document.getElementById("recipe-display")

await fetch('/recipe/Pizza')
  .then(response => response.json())
  .then(recipe => {
    console.log(recipe)
    if (recipe.name) {
      const recipeName = document.createElement('h3')

      // Creates unordered list of ingredients
      const ingredients = document.createElement('ul')
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const element = document.createElement('li')
        element.innerHTML = recipe.ingredients[i].toString()
        ingredients.appendChild(element)
      }

      // Creates unordered list of instructions
      const instructions = document.createElement('ul')
      for (let i = 0; i < recipe.instructions.length; i++) {
        const element = document.createElement('li')
        element.innerHTML = recipe.instructions[i].toString()
        instructions.appendChild(element)
      }

      recipeName.innerHTML = recipe.name
      recipeDisplay.appendChild(recipeName)
      recipeDisplay.appendChild(ingredients)
      recipeDisplay.appendChild(instructions)
}
}
)}

document.getElementById('add-ingredient').addEventListener('click', () => {
  const text = document.getElementById('ingredients-text').value
  ingredients.push(text)
  console.log(ingredients)
})

document.getElementById('add-instruction').addEventListener('click', () => {
  const text = document.getElementById('instructions-text').value
  instructions.push(text)
  console.log(instructions)
})

document.getElementById('submit').addEventListener('click', () => {

  const recipeName = document.getElementById('name-text').value
  const imageInput = document.getElementById('image-input')

  const recipeObj = {
    name: recipeName,
    ingredients: ingredients,
    instructions: instructions
  }

  fetch('/recipe/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
  },
  body: JSON.stringify(recipeObj),
  })
  .then(response => response.json())

  if (imageInput.files.length > 0) {
    const formData = new FormData()
    for(let i = 0; i < imageInput.files.length; i++) {
      formData.append('images', imageInput.files[i])
    }

    fetch('/images', {
      method: 'POST',
      body: formData
  })
  }

});
