const options = document.querySelectorAll('nav ul')
export function attachNavbarEvents(){
options[0].firstElementChild.addEventListener('click',goHome)
}
function goHome(event){
    event.preventDefault()
    window.location = './index.html'
    return;
}   