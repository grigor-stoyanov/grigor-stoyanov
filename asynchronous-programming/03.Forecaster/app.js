function attachEvents() {
    const location = document.getElementById('location')
    const btn = document.getElementById('submit')
    const current = document.getElementById('current')
    const upcomming = document.getElementById('upcoming')
    const forecast = document.getElementById('forecast')
    const content = document.getElementById('content')
    const errorMsg = document.createElement('div')
    const labelCurrent = current.children[0]
    const labelUpcomming = current.children[0]
    errorMsg.textContent = 'Error'
    content.appendChild(errorMsg)
    errorMsg.style.display = 'none'
    htmlCodes = {
        'Sunny': '&#x2600;', // ☀
        'Partly sunny': '&#x26C5;', // ⛅
        'Overcast': '&#x2601;', // ☁
        'Rain': '&#x2614;', // ☂
        'Degrees': '&#176;'   // °
    }
    btn.addEventListener('click', () => getWeather())
    async function getWeather() {
        try {
            errorMsg.style.display = 'none'
            current.innerHTML = ''
            current.appendChild(labelCurrent)
            upcomming.innerHTML = ''
            upcomming.appendChild(labelUpcomming)
            const resp1 = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
            const availableLocations = await resp1.json()
            let locCode = ''
            let isAvailable = false
            for (let loc of availableLocations) {
                if (location.value == loc.name) {
                    locCode = loc.code
                    isAvailable = true
                    break
                }
            }
            if(resp1.status != 200 || !isAvailable){
                throw Error('Not valid input')
            }
            const resp2 = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locCode}`)
            const currentCondition = await resp2.json()
            const resp3 = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locCode}`)
            const upcommingCondition = await resp3.json()
            const currentForcast = document.createElement('div')
            currentForcast.className = 'forecasts'
            currentForcast.innerHTML =
                `<span class="condition symbol">${htmlCodes[currentCondition.forecast.condition]}</span>
                <span class="condition">
                <span class="forecast-data">${currentCondition.name}</span>
                <span class="forecast-data">${currentCondition.forecast.high}&#176;/${currentCondition.forecast.low}&#176;</span>
                <span class="forecast-data">${currentCondition.forecast.condition}</span>
            </span>`
            current.appendChild(currentForcast)
            const upcommingForecast = document.createElement('div')
            upcommingForecast.className = "forecast-info"
            for (let day of upcommingCondition.forecast) {
                upcommingForecast.innerHTML +=
                    `<span class="upcomming">
                    <span class="symbol">${htmlCodes[day.condition]}</span>
                    <span class="forecast-data>${day.high}&#176;/${day.low}&#176;</span>
                    <span class="forecast-data>${day.condition}</span>
                </span>`
            }
            upcomming.appendChild(upcommingForecast)
            forecast.style.display = 'inline'
        }catch(error){
            forecast.style.display = 'none'
            errorMsg.style.display = 'inline'
            
        }
    }
}


attachEvents();