// lESSON 10

$(function() {

  $('#search').submit((event) => {
    event.preventDefault()
    console.log('form being submitted')

    const query = $('#query').val()
    console.log(query)

    $('#results-table tbody').html('')
    $('#query').val('')

    search(query)
  })

  //fix this
  function displayResults(gifs, weather, gifsagain) {
    // use index of gifs to increment counter for gifsagain
    gifs.forEach((gif, index) => {
      $('#results-table tbody').append(
        `<tr>
          <td>${weather.name}</td>
          <td>${weather.main.temp}</td>
          <td>${weather.weather[0].description}</td>
          <td>${weather.main.temp_max}</td>
          <td>${weather.main.temp_min}</td>
          <td><img src="${gif.images.fixed_height.url}"></td>
          <td><img src="${gifsagain[index].images.fixed_height.url}"></td>
        </tr>`
      )
    })
  }

  //note added async to function
  async function search(searchTerm) {

    try {
      const giphyURL = 'https://api.giphy.com/v1/gifs/search' //api endpoint at Giphy
      const giphyKey = '2qqBvRkz56JiTUcMbOJbak5VRRLEbV84'

      const weatherURL = 'https://api.openweathermap.org/data/2.5/weather' //api endpoint at Openweather
      const weatherKey = 'eb032ac2fb9ecc32480a3550a7a97189'

      // giphy
      const responseGiphy = await axios.get(
        giphyURL, {
          params: {
            q: searchTerm,
            api_key: giphyKey,
            limit: 5
          }
        })

      // openweather
      const responseWeather = await axios.get(
        weatherURL, {
          params: {
            q: searchTerm,
            appid: weatherKey
          }
        })

      //get data from giphy again using the open weather api's description
      const responseGiphyAgain = await axios.get(
        giphyURL, {
          params: {
            q: responseWeather.data.weather[0].description,
            api_key: giphyKey,
            limit: 5
          }
        })

      console.log((responseGiphy.data.data)) //axio also returns a data object and giphy too
      console.log((responseWeather.data))
      console.log((responseGiphyAgain.data.data))

      // pass array as function params
      displayResults(responseGiphy.data.data, responseWeather.data, responseGiphyAgain.data.data)

    } catch (error) {
      console.log(error)
      alert("Oh oh, something went wrong!")
    }
  }
})
