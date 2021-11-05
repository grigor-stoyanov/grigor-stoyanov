function lockedProfile() {
    profileCard = document.querySelector('.profile')
    main = document.getElementById('main')
    profileCard.remove()
    function onClick(ev){
        if (ev.target.parentElement.children[4].checked){
            ev.target.parentElement.children[9].style.display = 'block'
        }
        if(ev.target.parentElement.children[2].children.checked){
            ev.target.parentElement.children[9].style.display = 'none'
        }
    }
    async function getUsers() {
        resp = await fetch('http://localhost:3030/jsonstore/advanced/profiles')
        data = await resp.json()
        for (let user in data){
            userProfile = profileCard.cloneNode(true)
            userProfile.children[8].value = data[user].username
            userProfile.children[9].children[2].value = data[user].email
            userProfile.children[9].children[4].value = data[user].age
            userProfile.lastElementChild.addEventListener('click',onClick)
            main.appendChild(userProfile)
        }
    }
    getUsers()
}