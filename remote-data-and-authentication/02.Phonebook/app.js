function attachEvents() {
    const [load, create] = document.querySelectorAll('button')
    const [person, phone] = document.querySelectorAll('input')
    const ul = document.getElementById('phonebook')
    const url = 'http://localhost:3030/jsonstore/phonebook/'
    load.addEventListener('click', getEntries)
    create.addEventListener('click', createEntry)
    async function createEntry() {
        try {
            res = await fetch(url,
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ "person": person.value, "phone": phone.value })
                }
            )
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
            // can use list.replaceChildren(...Object.values(data).map(ul))
            getEntries()
        } catch (err) {
            alert(err.message)
        }
    }


    async function getEntries() {
        try {
            res = await fetch(url)
            if (res.ok == false) {
                const error = res.json()
                throw Error(error.message)
            }
            data = await res.json()
            ul.innerHTML = ''
            for (const entry in data) {
                const deleteBtn = e('button', { id: 'deleteBtn' }, 'Delete')
                deleteBtn.addEventListener('click', deleteEntry)
                ul.appendChild(
                    e('li', {}, [
                        `${data[entry].person}: ${data[entry].phone} `,
                        deleteBtn
                    ])
                )
            }
        } catch (error) {
            alert(error.message)
        }
        async function deleteEntry(ev) {
            [personName, phoneNumber] = ev.target.parentElement.textContent.split(': ')
            phoneNumber = phoneNumber.split(' ')[0]
            const id = Object.entries(data).filter(e => e[1].person && e[1].phone == phoneNumber)[0][0]
            try {
                res = await fetch(url + id, { method: 'delete' })
                if (res.ok == false) {
                    const error = await res.json()
                    throw Error(error.message)
                }
                getEntries()
            }
            catch (err) {
                alert(err.message)
            }
        }
    }
    function e(type, attr, content) {
        const element = document.createElement(type)
        for (let prop in attr) {
            element[prop] = attr[prop]
        }
        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item)
            }
            element.appendChild(item)
        }
        return element
    }
}

attachEvents();