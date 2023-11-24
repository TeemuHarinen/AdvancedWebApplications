
document.addEventListener("DOMContentLoaded", function () {
  getFoodCategories()
})

let ingredients = []
let instructions = []

document.getElementById('add-ingredient').addEventListener('click', () => {
  let text = document.getElementById('ingredients-text').value
  ingredients.push(text)
  document.getElementById('ingredients-text').value = ''
  console.log(ingredients)
})

document.getElementById('add-instruction').addEventListener('click', () => {
  const text = document.getElementById('instructions-text').value
  instructions.push(text)
  document.getElementById('instructions-text').value = ''
  console.log(instructions)
})

document.getElementById('search-bar').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
  const searchName = document.getElementById('search-bar').value
  if (searchName === '') return
  const recipeDisplay = document.getElementById("recipe-display")
  while (recipeDisplay.firstChild) {
    recipeDisplay.removeChild(recipeDisplay.firstChild)
  }
  fetch(`/recipe/${searchName}`)
  .then(response => response.json())
  .then(recipe => {
    if (recipe) { 
      console.log("Fetched recipe:", recipe)
      const recipeName = document.createElement('h3')
      const ingredientsHeader = document.createElement('h5')
      ingredientsHeader.innerHTML = 'Ingredients'
      // Creates unordered list of ingredients
      const ingredients = document.createElement('ul')
      for (let i = 0; i < recipe[0].ingredients.length; i++) {
        const element = document.createElement('li')
        element.innerHTML = recipe[0].ingredients[i].toString()
        ingredients.appendChild(element)
      }

      // Creates unordered list of instructions
      const instructionsHeader = document.createElement('h5')
      instructionsHeader.innerHTML = 'Instructions'
      const instructions = document.createElement('ul')
      for (let i = 0; i < recipe[0].instructions.length; i++) {
        const element = document.createElement('li')
        element.innerHTML = recipe[0].instructions[i].toString()
        instructions.appendChild(element)
      }

      recipeName.innerHTML = recipe[0].name
      recipeDisplay.appendChild(recipeName)
      recipeDisplay.appendChild(ingredientsHeader)
      recipeDisplay.appendChild(ingredients)
      recipeDisplay.appendChild(instructionsHeader)
      recipeDisplay.appendChild(instructions)
}
  })
  .catch(err => console.log(err))
  console.log(searchName)
  }
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
  document.getElementById('name-text').value = ''

});

const getFoodCategories = () => {

  fetch('/categories')
  .then(response => response.json())
  .then(data => {
    const categoryDisplay = document.getElementById('category-list')

    for(let i = 0; i < data.length; i++) {
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.value = data[i].name
      checkbox.id = data[i].name
      const label = document.createElement('label')
      label.htmlFor = data[i].name
      
      label.appendChild(document.createTextNode(data[i].name));
      categoryDisplay.appendChild(checkbox);
      categoryDisplay.appendChild(label);

      categoryDisplay.appendChild(document.createElement('br'))
    }
  })
}
