
document.addEventListener('DOMContentLoaded', () => {
  // loops through breeds list creating a new html element for each
  for (let i = 0; i < 5; i++) {
      createWikiItem(breeds[i])
  }
})

const breeds = [
  'affenpinscher',
  'basenji',
  'sharpei',
  'chow',
  'eskimo'
]

// fetch dog image from DOG API
const getDogImage = async (breed) => {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`
  try {
      const response = await fetch(url)
      if (response.ok) {
          const data = await response.json()
          return data.message
      }
  } catch (error) {
      console.log(error)
  }
}

// fetch wikipedia info based on breed
const getDogWikiContent = async (breed) => {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`
  try {
      const response = await fetch(url)
      if (response.ok) {
          const data = await response.json()
          return data.extract
      }
  } catch (error) {
      console.log(error)
  }
}

// creates the elements and their classes based on breed and fetched data
const createWikiItem = async (breed) => {
  const container = document.querySelector('.container')
  
  const wikiItem = document.createElement('div')
  wikiItem.className = 'wiki-item'

  const header = document.createElement('h1')
  header.className = 'wiki-header'

  const wikiContent = document.createElement('div')
  wikiContent.className = 'wiki-content'

  const wikiText = document.createElement('p')
  wikiText.className = 'wiki-text'

  const imageContainer = document.createElement('div')
  imageContainer.className = 'img-container'

  const image = document.createElement('img')
  image.className = 'wiki-img'

  // Uppercase the header, source: https://sentry.io/answers/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/
  const headerText = breed[0].toUpperCase() + breed.slice(1)
  header.innerText = headerText
  wikiText.innerText = await getDogWikiContent(breed)
  image.src = await getDogImage(breed)

  imageContainer.appendChild(image)
  wikiContent.appendChild(imageContainer)
  wikiContent.appendChild(wikiText)
  wikiItem.appendChild(header)
  wikiItem.appendChild(wikiContent)
  container.appendChild(wikiItem)
}



