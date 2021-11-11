form = document.getElementById('form')
form.addEventListener('submit', createStudent)
url = 'http://localhost:3030/jsonstore/collections/students'
tbody = document.querySelector('#results tbody')
fillTable()
async function fillTable() {
    try {
        res = await fetch(url)
        if (res.ok == false) {
            const error = res.json()
            throw Error(error.message)
        }
        data = await res.json()
        tbody.replaceChildren()
        for (let entry in data) {
            tbody.appendChild(
                e('tr', {}, [
                    e('td', {}, [data[entry].firstName]),
                    e('td', {}, [data[entry].lastName]),
                    e('td', {}, [data[entry].facultyNumber]),
                    e('td', {}, [data[entry].grade])
                ])
            )
        }
    } catch (err) {
        alert(err.message)
    }
}

async function createStudent(ev) {
    ev.preventDefault()
    formData = new FormData(form)
    const [firstName, lastName, facultyNumber, grade] = [...formData.values()]
    if (firstName && lastName && facultyNumber && grade) {
        try {
            if(isNaN(grade)){
                throw Error('Grade must be number')
            }
            res = await fetch(url,
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body:
                        JSON.stringify(
                            {
                                "firstName": firstName,
                                "lastName": lastName,
                                "facultyNumber": facultyNumber,
                                "grade": grade
                            }
                        )
                }
            )
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
            form.reset()
            fillTable()
        }
        catch (err) {
            alert(err.message)
        }
    } else {
        alert('Please fill all fields')
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