import {html} from "./lib.js"

function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'))
}

function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
}

function clearUserData(data) {
    sessionStorage.removeItem('userData')
}

const errorTemplate = () => html`<section id="notifications">
    <div id="errorBox" class="notification">
        <span>MESSAGE</span>
    </div>
</section>`
export {
    getUserData,
    setUserData,
    clearUserData,
    errorTemplate
}