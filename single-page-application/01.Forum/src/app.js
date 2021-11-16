import { cancel, clearFields, postForm, loadPosts, postPost } from './homeView.js'
import { attachNavbarEvents } from './navbar.js'
import { commentForm, getPost, leaveComment, loadComments, viewPost } from './postView.js'
const renderView = {
    // display home view and attach listeners
    'home':
        function homeView() {
            cancel.addEventListener('click', clearFields)
            postForm.addEventListener('submit', postPost)
            attachNavbarEvents()
            loadPosts()

        },
    'posts':
    // display post view with comment thread and attach listeners
        function navigatePostView() {
            if (sessionStorage.getItem('post') != null) {
                attachNavbarEvents()
                commentForm.addEventListener('submit',leaveComment)
                viewPost(sessionStorage.getItem('post'))
                loadComments()
            }
            else {
                renderView.home()
            }
        }

}
// reloads page and stores post id of clicked post
export async function postView(ev) {
    sessionStorage.clear()
    const id = ev.target.parentElement.parentElement.parentElement.parentElement.id
    let post = await getPost(id)
    sessionStorage.setItem('post', post.innerHTML)
    sessionStorage.setItem('id',id)
    window.location = './theme-content.html'
}


// fires on page reload
switch (document.body.id) {
    case 'home': renderView.home()
        break
    case 'posts': renderView.posts()
        break
}