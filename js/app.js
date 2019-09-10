$(function () {

    $('#search').submit((event) => {
      // we need preventDefault so that submit doesn't send anything to the server which we don't have
      event.preventDefault()
      // $('#query').val() reads the value as a string of the imput aka whatever the user typed in; that string becomes the value of query(imput)
      const query = $('#query').val()
      console.log(query)
      // this will add new <tr>s into html
      $('#results-table tbody').html('')
      // we passing the value of query on search fx
      search(query)
    })

    // searching for weather data
    async function search (query) {
      try {
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        const apiKey = 'a9774b2823a4f33972a6f727864cbae9'
        const response = await axios.get(url, {
           params: {
             q: query,
             APPID: apiKey,
             units: 'metric'
          }
        })
        // response is JSON
        console.log(response)
        // we passing on JSON and city string onto another fx => this is weather data combined
        searchGiphy(response, query)
      } catch (e) {
        console.log(e)
        alert("Oh no!")
      }
     }

    // searching gifs city
    async function searchGiphy (weatherData, city) {
      try {
        const url = 'https://api.giphy.com/v1/gifs/search'
        const apiKey = 'TFRIsex5cmzXTz0VsyUyvbKgqa3FBK8P'
        // Axios is a JavaScript library you can use to perform HTTP requests
        const response = await axios.get(
          url, {
          params: {
            // find the path to description in console.log among weatherData array, [0] because gif at index 0 will be the best description
            q: weatherData.data.weather[0].description,
            api_key: apiKey,
            limit: 30
          }
        })
        console.log(response)
        // we make a request to giphy & get back a response which is a weather description gif
        searchGiphyCity(weatherData, response, city)
        } catch (e) {
        console.log(e)
        alert('oh no, something wrong happened!')
      }
    }

    async function searchGiphyCity (weatherData, weatherGifData, query) {
      try {
        const url = 'https://api.giphy.com/v1/gifs/search'
        const apiKey = 'TFRIsex5cmzXTz0VsyUyvbKgqa3FBK8P'
        // Axios is a JavaScript library you can use to perform HTTP requests
        // why we have to use axios here?
        const response = await axios.get(
          url, {
          params: {
            // weatherData.data.weather[0].description as q because we need to search a gif that is the description of current weather(find it in console.log)
            q: query,
            api_key: apiKey,
            limit: 30
          }
        })
        console.log(response)
        // 3 api calls are finished & we have 3 JSON objects
        displayResults(weatherData, weatherGifData, response)
      } catch (e) {
        console.log(e)
        alert('oh no, something wrong happened!')
      }
    }


    // we pass all JSON objects to this fx
      function displayResults (weatherData, weatherGifData, cityGifData) {
          $('#results-table tbody').append(
            `<tr>
              <td>${weatherData.data.name}</td>
              <td>${weatherData.data.main.temp}</td>
              <td>${weatherData.data.weather[0].description}</td>
              <td>${weatherData.data.main.temp_min}</td>
              <td>${weatherData.data.main.temp_max}</td>
              <td><img src="${cityGifData.data.data[0].images.fixed_height.url}"></td>
              <td><img src="${weatherGifData.data.data[3].images.fixed_height.url}"></td>
            </tr>`
          )
      }

  })
