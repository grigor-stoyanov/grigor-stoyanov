import { createPost } from './dom.js'
import { postView } from './app.js'
export const postForm = document.querySelector('form')
export const cancel = document.querySelector('.cancel')
const topics = document.querySelector('.topic-title')
const url = 'http://localhost:3030/jsonstore/collections/myboard/posts'

// clear form on cancel and on proper submission
export function clearFields(ev) {
    ev.preventDefault()
    ev.stopImmediatePropagation()
    postForm.reset()
}


// load all posts on page re-load
export async function loadPosts() {
    try {
        const res = await fetch(url)
        if (res.ok == false) {
            const error = res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        topics.replaceChildren(...Object.values(data).map(createPost))

    } catch (err) {
        alert(err.message)
    }
}   
// add new post trough form
export async function postPost(ev) {
    ev.preventDefault()
    const formData = new FormData(postForm)
    const [topicName, userName, postText] = [...formData.values()]
    try {
        if (!topicName || !userName || !postText) {
            throw Error('Fill all fields!')
        }
        const res = await fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
                    topicName,
                    userName,
                    postText,
                    date: Date()
                }
            )
        })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        postForm.reset()
        const data = await res.json()
        const post = createPost(data)
        post.addEventListener('click',postView)
        topics.appendChild(createPost(data))

    } catch (err) {
        alert(err.message)
    }
}