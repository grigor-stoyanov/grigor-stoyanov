/*Asynchronous Programming
it allows us to make requests that don't block the app
while the processor loads other data and functions
AJAX - Asynchronous Javascript and XML
background loading of dynamic content/data and rendering
partial page rendering - html fragment  in <div>
JSON service - JSON object display
*/
let button = document.querySelector('#load')
button.addEventListener('click', function loadRepos() {
    let url = ''
    const httpRequest = new XMLHttpRequest()
    httpRequest.addEventListener('readystatechange', function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            document.getElementById('res').textContent = httpRequest.responseText
        }
    })

    httpRequest.open("GET", url)
    httpRequest.send()
})
// promises object holding asynchronous operations
// using fetch api we engage browsers multithread to allow us to free our call stack and allow for user interaction
// Promise is an asynchronous action that may complete at any point and produce a value
// it has 3 states pending,fullfilled,failed
promise = new Promise(function callback(function onResolve() { }, function onReject() { }){ })
// Promise methods
Promise.reject(reason) // returns object rejected with given reason
Promise.resolve(value) // returns object that is resolved with the given value
Promise.resolve(all) // returnrs an array promise(fullfiled when all promises are fullfilled
// rejects when one promise is rejected
