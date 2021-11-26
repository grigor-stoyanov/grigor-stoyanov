import { html, render } from './lib.js'
import { towns } from './towns.js'

const townsTemplate = (data, searchtext) => html`
   <ul>
      ${data.map(e => html`<li class=${(searchtext && e.includes(searchtext)) ? 'active'  : ''}>${e}</li>`)}
   </ul>`

const searchText = document.getElementById('searchText')
const townsDiv = document.getElementById('towns')
const button = document.querySelector('button')
const result = document.getElementById('result')
button.addEventListener('click',onClick)
function onClick(ev){
   render(townsTemplate(towns,searchText.value.trim().toLocaleLowerCase()),townsDiv)
   result.textContent = `${document.querySelectorAll('.active').length} matches found.`
}
render(townsTemplate(towns,searchText.value),townsDiv)
