function getInfo() {
    stopNum = document.getElementById('stopId')
    btn = document.getElementById('submit')
    stopName = document.getElementById('stopName')
    busList = document.getElementById('buses')
    btn.addEventListener('click', onClick)
    function onClick(ev) {
        getRequest()
    }
    async function getRequest() {
        try {
            stopName.textContent = 'Loaiding...'
            busList.innerHTML = ''
            const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopNum.value}`)
            if (response.status != 200){
                throw Error('No such id')
            }
            const data = await response.json()
            stopName.textContent = data.name
            for (let [bus, time] of Object.entries(data.buses)) {
                busList.innerHTML += `<li>Bus ${bus} arrives in ${time} minutes</li>`
            }
        } catch(error) {
            stopName.textContent = 'Error'
        }
    }
}