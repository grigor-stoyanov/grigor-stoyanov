function solution() {
    const main = document.getElementById('main')
    function onClick(ev) {
        extraInfoDisplay = ev.target.parentElement.parentElement.lastElementChild.style.display
        if (extraInfoDisplay == 'none' || extraInfoDisplay == '') {
            ev.target.parentElement.parentElement.lastElementChild.style.display = 'block'
            ev.target.textContent = 'Less'
        } else {
            if (extraInfoDisplay == 'block') {
                ev.target.parentElement.parentElement.lastElementChild.style.display = 'none'
                ev.target.textContent = 'More'
            }
        }
    }
    async function getArticles() {
        resp1 = await fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        articles = await resp1.json()
        for (article of articles) {
            resp2 = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)
            extra = await resp2.json()
            accordion = document.createElement('div')
            accordion.className = "accordion"
            accordion.innerHTML =
                `<div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}">More</button>
            </div>
            <div class="extra">
                <p>${extra.content}</p>
            </div>`
            accordion.firstElementChild.lastElementChild.addEventListener('click', onClick)
            main.appendChild(accordion)
        }
    }
    getArticles()
}
solution()