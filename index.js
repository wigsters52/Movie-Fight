const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '2bc3fe43',
      s: 'avengers'
    }
  })
  console.log(response.data)
}

fetchData()
