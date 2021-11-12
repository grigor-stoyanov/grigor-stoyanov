// navigating multiple pages makes it harder to use common logic i.e. localStorage
// single page applications allows us to have common logic and state between all views
// website is a collection of web pages
// web applications is software accessible trough web browser/interactive and functional i.e. facebook
// multi page apps reloads the page, perform well on search engine,visual map,  complex development, coupled backend and frontend
// spa - single html file ajax and html 5 make it more responsive modifying the dom after loadig the data
// mainstate across all pages, browser history, better user xp,poor search engine-ssr,single sharing link ,less secure
// Modules: set of related fuctionality {encapsulation}
//<script>src="app.js" type="module"</script>
// need to use locasl server 
// this fucntion is public and module can use it
import { sumNumbers as sum, numberProduct, myArr, printArr } from './module.js'
console.log(sum(5, 3))
console.log(numberProduct(6, 4))
// but its not in the global scope!
console.log(myArr)
myArr.push(4)
console.log(myArr)
printArr()
// 1 file can only have 1 default export/import (main data,class ect...)
// when exporting variables with default first they need to be declared
import Person, { compareTo } from './Person.js'
// import * as number operations from './module.js'
// iife modules {encapsulate everything in a fucntion} immediately invoked function expression
(function (scope) {
    const selector = 'loading'
    const loadingElement = document.querySelector(selector)
    const show = () => loadingElement.style.display = ''
    const hide = () => loadingElement.style.display = 'none'
    // only this is visible to the global scope
    scope.loading = { show, hide }
})(window)
// module best practieces split by functionality!
// export only necessery for consumers
// prefer named exports over defaults
// Don't call functions during export
// SPA approaches
// SPA have multiple views
// all views share a common state
// modular code is used
// page is not reloaded content loaded via AJAX
// content is created by JavaScript