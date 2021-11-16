import { createComment, createThread } from "./dom.js"

export const commentForm = document.querySelector('form')
const comments = document.querySelector('.comment')

// create post element for post view with data of selected post
export async function getPost(id) {

    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts/' + id
    try {
        const res = await fetch(url)
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        const post = createThread(data)
        return post
    } catch (err) {
        alert(err.message)
    }
}
// attach post to dom after page has loaded
export function viewPost(post) {
    const thread = document.querySelector('.comment')
    thread.innerHTML = post
}

// load all comments on page load
export async function loadComments() {
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments/`
    try {
        const res = await fetch(url)
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        for (const ele in data){
            if(data[ele].postId == sessionStorage.getItem('id')){
                comments.appendChild(createComment(data[ele]))
            }
        }
        
    } catch (err) {
    alert(err.message)
}
}

// add new comment trough post form
export async function leaveComment(ev) {
    ev.preventDefault()
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments'
    const formData = new FormData(commentForm)
    const [commentText, userName] = [...formData.values()]
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: { 'content-type': 'json/application' },
            body: JSON.stringify(
                {
                    commentText,
                    userName,
                    date: Date(),
                    postId: sessionStorage.getItem('id')
                })
        })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        comments.appendChild(createComment(data))
    }
    catch (err) {
        alert(err.message)
    }
}