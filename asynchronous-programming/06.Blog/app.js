
function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts)
    document.getElementById('btnViewPost').addEventListener('click', display)
    function display(ev) {
        const selectedId = document.getElementById('posts').value
        // in order to start them both at the same time we need to use promise.all!
        const [post, comments] = Promise.all([
            getPostById(selectedId),
            getCommentsByPostId(selectedId)
        ])
        document.getElementById('post-title').textContent = post.title
        document.getElementById('post-body').textContent = post.body
        const ulElement = document.getElementById('post-comments')
        ulElement.replaceChildren()
        comments.forEach(c => {
            const liElement = document.createElement('li')
            liElement.textContent = c.text
            ulElement.appendChild(liElement)
        })
    }
}

attachEvents();
async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts'
    const resp = await fetch(url)
    const data = await resp.json()
    const selectElement = document.getElementById('posts')
    selectElement.replaceChildren()
    Object.values(data).forEach(p => {
        const optionElement = document.createElement('option')
        optionElement.textContent = p.title
        selectElement.appendChild(optionElement)
    })
}
async function getPostById(postId) {
    const url = `http://localhost:3030/jsonstore/blog/posts+${postId}`
    const resp = await fetch(url)
    const data = await resp.json()
    return data
}
async function getCommentsByPostId(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments'
    const resp = await fetch(url)
    const data = await resp.json()
    const comments = Object.values(data).filter(c => c.postId == postId)
    return comments
}