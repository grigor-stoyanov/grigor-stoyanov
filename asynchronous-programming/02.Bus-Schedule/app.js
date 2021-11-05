function solve() {
    const infoBox = document.querySelector('#info > .info')
    const arriveBtn = document.getElementById('arrive')
    const departBtn = document.getElementById('depart')
    let busStopId = 'depot'
    let busStopName = 'depot'
    async function getNextStop(){
        const resp = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStopId}`)
        const data = await resp.json()
        busStopName = data.name
        infoBox.textContent = `Next stop ${busStopName}`
        busStopId = data.next
    }

    function depart() {
        getNextStop()
        departBtn.disabled = true
        arriveBtn.disabled = false
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${busStopName}`
        departBtn.disabled = false
        arriveBtn.disabled = true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();