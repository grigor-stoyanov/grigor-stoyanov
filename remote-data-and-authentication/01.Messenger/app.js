function attachEvents() {
    const controls = document.getElementById('controls')
    const [author, content, submit, refresh] = Array.from(controls.children).filter(e => e.tagName == 'INPUT')
    const textArea = controls.parentElement.children[0]
    submit.addEventListener('click', sendMessage)
    refresh.addEventListener('click',getMessages)
    async function sendMessage(ev) {
        const url = 'http://localhost:3030/jsonstore/messenger'
        try {
            res = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ author: author.value, content: content.value })
            })
            if(res.ok == false){
                const error = await res.json()
                throw Error(error.message)
            }
            data = await res.json() 
        } catch (error) {
            alert(error.message)
        }
    }
    async function getMessages(ev){
        const url = 'http://localhost:3030/jsonstore/messenger'
        try {
            res = await fetch(url)
            if(res.ok == false){
                const error = await res.json()
                throw Error(error.message)
            }
            // can improve with Object.values(data) 
            // and can create the string with messeges.map(m=>`${m.author}: ${m.content}`).join(\n)
            data = await res.json()
            let convo = ''
            for (const message in data){
                convo += `${data[message]['author']}: ${data[message]['content']}\n`
            }
            textArea.textContent = convo
        } catch (error) {
            alert(error.message)
        }
    }
}

attachEvents();