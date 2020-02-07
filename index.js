const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '2bc3fe43',
      s: searchTerm
    }
  })

  if (response.data.Error) {
    return []
  }
  return response.data.Search
}
const root = document.querySelector('.autocomplete')

root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  
  <div class="dropdown">
  <input class="input"/>
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`

const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')
// const dropdownResults = document.querySelector('.dropdown-content')
const onInput = async event => {
  const movies = await fetchData(event.target.value)

  resultsWrapper.innerHTML = ''
  dropdown.classList.add('is-active')
  for (const movie of movies) {
    const option = document.createElement('a')
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
    option.classList.add('dropdown-item')
    option.innerHTML = `
    <img src = "${imgSrc}" />
    <p>${movie.Title}</p>
    `

    resultsWrapper.appendChild(option)
  }
}
input.addEventListener('input', debounce(onInput, 500))
