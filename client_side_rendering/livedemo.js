import { renderTemplate } from "./engine.js"

/*
rendering is dynamically generating html content can be performed on server and client
server side rendering - the generated html is sent to client on request
client side rendering - client recieves static info via request to cdn js fetches dynamic data from other servers and generates dom content
longer load , page is never reloadde, shared state between views quick view switch,only fetch dynamic data, poor performance on low machines
templating allows simular content to be replicated in a webpage and differences are put with placeholders
simular to interpolated strings with caching libraries and automatic diff checking
*/
async function start() {
    const data = await (await fetch('./data.json')).json()
    const templateAsString = await (await fetch('./article.html')).text()
    const main = document.querySelector('main')
    const template = renderTemplate(templateAsString)
    main.innerHTML = data.map(a => template).join('')
}
start()
// usually templating engines are used for templating solutions
// Frameworks Angular,React,Vue Packages Handlebars,lit-html,Web Components
// lit html templating literal partial updating of components
let sayHello = (name) => html`<h1>Hello ${name}</h1>`;
render(sayHello('world'),document.body);
// uses standard js and html
