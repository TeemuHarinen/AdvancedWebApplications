
document.addEventListener("DOMContentLoaded", function () {
  getFoodCategories()
})

let ingredients = []
let instructions = []

document.getElementById('add-ingredient').addEventListener('click', () => {
  let text = document.getElementById('ingredients-text').value
  ingredients.push(text)
  document.getElementById('ingredients-text').value = ''
})

document.getElementById('add-instruction').addEventListener('click', () => {
  const text = document.getElementById('instructions-text').value
  instructions.push(text)
  document.getElementById('instructions-text').value = ''
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
      const recipeName = document.createElement('h3')
      const ingredientsHeader = document.createElement('h5')
      ingredientsHeader.innerHTML = 'Ingredients'
      // Creates unordered list of ingredients
      const ingredients = document.createElement('ul')
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const element = document.createElement('li')
        element.innerHTML = recipe.ingredients[i].toString()
        ingredients.appendChild(element)
      }

      // Creates unordered list of instructions
      const instructionsHeader = document.createElement('h5')
      instructionsHeader.innerHTML = 'Instructions'
      const instructions = document.createElement('ul')
      for (let i = 0; i < recipe.instructions.length; i++) {
        const element = document.createElement('li')
        element.innerHTML = recipe.instructions[i].toString()
        instructions.appendChild(element)
      }

      // Set images div based on array of ids
      setImagesOnId(recipe.images)

      recipeName.innerHTML = recipe.name
      recipeDisplay.appendChild(recipeName)
      recipeDisplay.appendChild(ingredientsHeader)
      recipeDisplay.appendChild(ingredients)
      recipeDisplay.appendChild(instructionsHeader)
      recipeDisplay.appendChild(instructions)
}
  })
  .catch(err => console.log(err))
  }
})


document.getElementById('submit').addEventListener('click', async () => {
  const recipeName = document.getElementById('name-text').value;
  const imageInput = document.getElementById('image-input');
  const listOfCategories = [];
  const listOfImages = [];
  const checkboxes = document.getElementsByName('checkbox');

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      listOfCategories.push(checkboxes[i].id);
    }
  }

  if (imageInput.files.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < imageInput.files.length; i++) {
      formData.append('images', imageInput.files[i]);
    }

    try {
      const response = await fetch('/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from imagerouter", data);
        for(let i = 0; i < data.length; i++) {
          listOfImages.push(data[i]._id)
        }

      } else {
        console.error('Error uploading images:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }

  const recipeObj = {
    name: recipeName,
    ingredients: ingredients,
    instructions: instructions,
    categories: listOfCategories,
    images: listOfImages,
  };

  try {
    const recipeResponse = await fetch('/recipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeObj),
    });

    if (recipeResponse.ok) {
      const recipeData = await recipeResponse.json();
      console.log(recipeData);
    } else {
      console.error('Error creating recipe:', recipeResponse.statusText);
    }
  } catch (error) {
    console.error('Error creating recipe:', error);
  }
  document.getElementById('name-text').value = '';
});

const getFoodCategories = () => {
  fetch('/categories')
  .then(response => response.json())
  .then(data => {
    const categoryDisplay = document.getElementById('category-list')
    let iterator = 0
    for (let i = 0; i < data.length; i++) {
      const checkbox = document.createElement('p');
      checkbox.innerHTML = `
        <label>
          <input type="checkbox" class="filled-in" value="${data[i].name}" name="checkbox" id="${data[i]._id}"/>
          <span>${data[i].name}</span>
        </label>
      `
      categoryDisplay.appendChild(checkbox);
      iterator += 1
    }
  })
}

const setImagesOnId = (IdList) => {
  const imageDisplay = document.getElementById("images")
  while (imageDisplay.firstChild) {
    imageDisplay.removeChild(imageDisplay.firstChild)
  }

  for (let i = 0; i < IdList.length; i++) {
    fetch(`/images/${IdList[i]}`)
    .then(response => response.json())
    .then(data => {
      const base64String = btoa(String.fromCharCode.apply(null, data.buffer.data));
      const imageSrc = `data:image/jpeg;base64,${base64String}`
      const imgElement = document.createElement('img')
      imgElement.src = imageSrc

      document.getElementById('images').appendChild(imgElement)
    })
  }
}