import { html, render } from './lib.js'


const url = 'http://localhost:3030/jsonstore/advanced/table'
const rowTemplate = (e, match) => html`
   <tr class="${(match) ? 'select' : ''}">
      <td>${e.firstName} ${e.lastName}</td>
      <td>${e.email}</td>
      <td>${e.course}</td>
   </tr>`
let students = null
async function getData() {
   const res = await fetch(url)
   if (res.ok == true) {
      const data = await res.json()
      students = Object.values(data)
      students.forEach(s => s.match = false)
      update(students)
   }
}
function update(data) {
   render(data.map(e => rowTemplate(e, e.match)), document.querySelector('tbody'))
}

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   getData()
   function onClick() {
      const search = document.getElementById('searchField').value
      for (let s of students) {
         s.match = Object.values(s).slice(0,3).some(v => v.includes(search))
      }
      update(students)
      search.value = ''
   }
}
solve()