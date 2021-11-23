//import { html, render, until } from 'https://unpkg.com/lit-html?module';
import { html, render, until, styleMap, classMap } from './lib.js'
const articleTemplate = (onSubmit, data) => html`
<article>
    <h3>${data.title}</h3>
    <div class="content-body">
        <p>${data.content}</p>
    </div>
    <footer>Author: ${data.author}${data.isOwner ? html`<button>Edit</button>` : null}</footer>
    <div class="comments">
        <form @submit=${onSubmit}>
            <textarea name="comment"></textarea>
            <button>post comment</button>
        </form>
        <p>comments</p>
        <ul>
            ${data.comments.map(c => html`<li>${c.content}</li>`)}
        </ul>
    </div>
</article>
`

const styles = {
    color:"textColor",
    backgroundColor:"black"   
}
html`<div style=${styleMap(styles)}>Hello there!</div>`

// classList add adds a list of classes to the selected element
const itemTemplate = (item) =>{
    const classes = {selected: item.selected};
    return html`<div class='menu-item ${classMap(classes)}}'>ClassyText</div>`
}
// repeat - same funct as map repeat(item,(i)=>i.id, (i,index) => html`<li>${index}: {i:i.name}</li>`)

// chaning only the 1st article of the document will be done using diff checking
// we can use data.json to modify class names/html element properties and ect...
// @click calls addEventListener
// Array.map can transform a list of data into a list of templates
// because templates are basic javascript we can use tennary exprespressions and statements 
// we have style and classmap directives to set multiple inline styles,classes
async function start() {
    const data = await (await fetch('./data.json')).json()
    const main = document.querySelector('#content')
    const renderBtn = document.getElementById('render')
    renderBtn.addEventListener('click', onRender)
    document.getElementById('untilBtn').addEventListener('click', onUntil)
    function onRender() {
        const result = data.map(a => articleTemplate(onSubmit.bind(null, a), a))
        render(result, main)
    }
    function onSubmit(article, event) {
        event.preventDefault()
        console.log(article)
        const formData = new FormData(event.target)
        const content = formData.get('comment')
        article.comments.push({ content })
    }
    const articleTemplate = async (data) => html`<article><p>${(await data).content}</p></article>`
    const asyncTemplate = (dataPromise) => html`<div>${until(articleTemplate(dataPromise), html`<span>Loading&hellip;</span>`)}</div>`
    async function getData() {
        const data = { content: 'Async Data' }
        return new Promise(res => {
            setTimeout(() => res(articleTemplate(data)), 2000)
        })
    }
    function onUntil() {

        render(asyncTemplate(getData()), main)
    }
}
start()